import Header from "./components/Header";
import PlayerContainer from "./components/player/PlayerContainer";
import AllModals from "./components/header/AllModals";
import { ModalContextProvider } from "./components/header/ModalContext";
import { GameContextProvider } from "./components/player/GameContext";
import { useEffect, useState } from "react";
import { getDailySong } from "./services/dataService";
import { getAccessToken } from "./services/spotifyService";
import { SongConfig } from "./types/interfaces/song";
import LoadingSpinner from "./components/LoadingSpinner";
import { EMPTY_SONG_CONFIG } from "./components/utils/constants";


const APP_VERSION = process.env.REACT_APP_VERSION || "0";
console.debug("v" + APP_VERSION);

const currentVersion = localStorage.getItem("version");
if (currentVersion !== APP_VERSION) {
  console.log(`version upgrated from ${currentVersion} to ${APP_VERSION}`);
  localStorage.setItem("version", APP_VERSION);
}

function App() {
  const [loading, setLoading] = useState(true);
  const [currentSongConfig, setCurrentSongConfig] =
    useState<SongConfig>(EMPTY_SONG_CONFIG);

  const [accessToken, setAccessToken] = useState("");

  const [serverDate, setServerDate] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      let accessKey = null;
      let responseDay = null;
      while (isMounted && responseDay === null) {
        try {
          accessKey = await getAccessToken();
          responseDay = await fetch(
            "https://worldtimeapi.org/api/timezone/Europe/Rome"
          );
        } catch (error) {
          console.error("Errore CORS:", error);
        }
        if (responseDay !== null && responseDay.ok) {
          setAccessToken(accessKey);
          const dataResponse = await responseDay.json();
          const day = dataResponse.datetime.replaceAll("-", "/").substring(0, 10);
          setServerDate(day);

          console.debug(" - Server: " + day);

          getDailySong(accessKey, day).then((songConfig: SongConfig) => {
            setCurrentSongConfig(songConfig);
            setLoading(false);
          });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1200));
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const startGame = () => {
    setLoading(false)
  };

  return (
    <div className="bg-custom-bg text-custom-fg overflow-auto flex flex-col mobile-h">
      <ModalContextProvider>
        <Header />
        <AllModals/>
      </ModalContextProvider>
      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <GameContextProvider date={serverDate}>
          <PlayerContainer
            songConfig={currentSongConfig}
            accessToken={accessToken}
            date={serverDate}
          />
        </GameContextProvider>
      )}
    </div>
  );
}

export default App;
