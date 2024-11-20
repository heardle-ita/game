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

  return new Promise<SongConfig>(async (resolve, reject) => {
    try {
      // Reference to the Firebase song data based on the dayPath
      const songRef = ref(db, "songs/" + dayPath);

      // Listen to the value of the songRef in Firebase
      onValue(
        songRef,
        async (snapshot) => {
          const data = snapshot.val();

          if (data) {
            // If the song data exists in Firebase, resolve with the data
            console.debug("Song found in Firebase:", data);
            resolve(data);
          } else {
            // If no song data is found in Firebase, fetch a new song
            console.debug("Song not found in Firebase, fetching new song...");
            
            // Fetch the song from the API
            const selectedSong = await fetchSong(accessToken);

            // Format and clean the song name
            let songName = selectedSong.name.includes("-")
              ? selectedSong.name.substring(0, selectedSong.name.indexOf("-"))
              : selectedSong.name.includes("(")
              ? selectedSong.name.substring(0, selectedSong.name.indexOf("("))
              : selectedSong.name;

            // Combine artist name and song name
            let trackName = selectedSong.artists[0].name + " " + selectedSong.name;

            // Clean up track name (removes special characters)
            trackName = trackName.replaceAll("å", "a");
            trackName = trackName.replaceAll("_", "");
            trackName = trackName.replaceAll(".", "");
            trackName = trackName.replaceAll("?", "");
            trackName = trackName.replaceAll("!", "");

            // Prepare the hardcoded song data to store in Firebase
            const hardCodedSong = {
              day: dayPath,
              songLength: 30,
              breaks: [1, 2, 4, 8, 16, 30],
              trackName: trackName,
              others: [selectedSong.artists[0].name + " " + songName],
              song: songName,
              artist: selectedSong.artists[0].name,
              soundCloudLink: selectedSong.preview_url,
              showSoundCloud: false,
              showSpotify: true,
              soundSpotifyLink:
                "https://open.spotify.com/embed/track/" + selectedSong.id,
              image: selectedSong.album.images[0].url,
            };

            // Store the song data in Firebase
            await setSong(dayPath, hardCodedSong);

            // Resolve the promise with the newly fetched song data
            console.debug("Fetched and stored new song in Firebase:", hardCodedSong);
            resolve(hardCodedSong);
          }
        },
        (err) => {
          console.error("Error accessing Firebase:", err);
          reject(err); // Reject the promise if Firebase fails
        },
        {
          onlyOnce: true, // Only listen once to avoid unnecessary updates
        }
      );
    } catch (error) {
      console.error("Error fetching song:", error);
      reject(error); // Reject the promise in case of any error
    }
  });
};

