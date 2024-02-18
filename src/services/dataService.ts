import { getDayStr, getDayStrAsPath } from "./function";
import { SongConfig } from "../types/interfaces/song";
import { artists } from "../components/utils/artists";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { db } from "./firebase";
import { banWords } from "../components/utils/constants";
import { of } from "rxjs";

interface Map {
  [key: string]: any;
}

const DEFAULT_SONG = {
  day: "",
  songLength: 30,
  breaks: [1, 2, 4, 8, 16, 30],
  trackName: "Elisa Litoranea-",
  others: ["Elisa Litoranea (con Matilda De Angelis)"],
  song: "Litoranea",
  artist: "Elisa",
  soundCloudLink: "https://soundcloud.com/elisa-official/litoranea-1",
  showSoundCloud: true,
  image: "https://i1.sndcdn.com/artworks-dr78ZwUE9K3r-0-t500x500.jpg",
};

const SONG_DATABASE: Map = {};

const setSong = (day: string, selectedSong: any) => {
  //const database = getDatabase();

  let hardCodedSong = selectedSong;

  set(ref(db, "songs/" + day), hardCodedSong);
};

async function fetchSong(accessToken: string): Promise<any> {

  var finded: boolean = false;
  let song;
  let offset = 0;

  let artist = artists[Math.floor(Math.random() * artists.length)];
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken);
  myHeaders.append("Content-Type", "application/json");

  do {

    console.log(artist)

    song = await fetch(
      `https://api.spotify.com/v1/search?q=artist:${artist}&type=track&market=IT&limit=40&offset=${offset * 40}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
    .then((response) => response.json())
    .then(
      (response) => {
        let artistsSongs = response.tracks.items.filter((v: any) => (v.artists[0].name.toLowerCase() === artist) && (v.preview_url != null))
        console.log(artistsSongs)
        if(artistsSongs.length != 0) {
          return artistsSongs[
            Math.floor(Math.random() * artistsSongs.length)
          ]
        }
      }
    )
    .catch((error) => {
      // reset search
      artist = artists[Math.floor(Math.random() * artists.length)]
      offset = 0
      return undefined
    });

    if(song && !(new RegExp(banWords.join("|")).test(song.name.toLowerCase()))) 
      finded = true;
    
    offset++;
  
  } while(!finded)

  return song;
}

export const getDailySong = (
  accessToken: string,
  dayPath: string
): Promise<any> => {

  let day = dayPath.replaceAll("/", "");

  let hardCodedSong: any;

  if (SONG_DATABASE[day]) {
    hardCodedSong = SONG_DATABASE[day];
  }

  return new Promise<SongConfig>(async (resolve, reject) => {

    //const database = getDatabase();

    let selectedSong: any;

    //do {
      //do {
        //selectedSong = await fetchSong(accessToken)
        /* .then((song) => {
          value = new RegExp(banWords.join("|")).test(song.name.toLowerCase());
          value ? console.debug("rejected: " + value) : null;
          return song;
        });
      } while(value); */

    /* } while (
      selectedSong.artists[0].name.toLowerCase() != artist
    ); */
    selectedSong = await fetchSong(accessToken)

    let song = selectedSong.name.includes("-")
      ? selectedSong.name.substring(0, selectedSong.name.indexOf("-"))
      : selectedSong.name.includes("(")
      ? selectedSong.name.substring(0, selectedSong.name.indexOf("("))
      : selectedSong.name;

    let trackname = selectedSong.artists[0].name + " " + selectedSong.name;

    trackname = trackname.replaceAll("å", "a");
    trackname = trackname.replaceAll("_", "");
    trackname = trackname.replaceAll(".", "");
    trackname = trackname.replaceAll("?", "");
    trackname = trackname.replaceAll("!", "");

    hardCodedSong = {
      day: dayPath,
      songLength: 30,
      breaks: [1, 2, 4, 8, 16, 30],
      trackName: trackname,
      others: [selectedSong.artists[0].name + " " + song],
      song:
        selectedSong.name.indexOf("-") !== -1
          ? selectedSong.name.substring(0, selectedSong.name.indexOf("-"))
          : selectedSong.name,
      artist: selectedSong.artists[0].name,
      soundCloudLink: selectedSong.preview_url,
      showSoundCloud: false,
      showSpotify: true,
      soundSpotifyLink:
        "https://open.spotify.com/embed/track/" + selectedSong.id,
      image: selectedSong.album.images[0].url,
    };

    const songRef = ref(db, "songs/" + dayPath);

    onValue(
      songRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(data);
        } else {
          setSong(dayPath, hardCodedSong);
          resolve(hardCodedSong);
        }
      },
      (err) => {
        console.error(err);
        resolve(hardCodedSong);
      },
      {
        onlyOnce: true,
      }
    );
  });
};
