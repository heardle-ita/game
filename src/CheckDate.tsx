import { useEffect, useState } from "react";
import App from "./App";
import Header from "./components/Header";
import AllModals from "./components/header/AllModals";
import { ModalContextProvider } from "./components/header/ModalContext";
import { checkIfSystemDateIsLessOrGreatenDataGame } from "./services/function";

function CheckDate() {

  const [errorData, setErrorData] = useState(true);

  useEffect(() => {
    setErrorData(checkIfSystemDateIsLessOrGreatenDataGame())
  }, []);

  return (
    <div className="bg-custom-bg text-custom-fg overflow-auto flex flex-col mobile-h">
      <ModalContextProvider>
        <Header />
        <AllModals/>
      </ModalContextProvider>
      {
        errorData ? (
          <div className="date-check-container">
            <div>
            <pre>
              {`🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬛⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬛⬜⬜⬜⬛⬛🟦🟦🟦⬛⬛🟦🟦🟦⬛⬛⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬜⬜⬜⬜⬜⬜⬜⬛🟦⬛🟩🟩⬛🟦⬛⬜⬜⬜⬛⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬜⬜⬛⬛⬜⬛⬛⬜⬜⬛🟩🟩🟩🟩⬛⬜⬜⬜⬜⬜⬜⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬜⬛⬛⬛⬛⬜⬜⬜⬜⬛🟩🟩🟩⬛⬜⬜⬜⬛⬛⬜⬜⬜⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬜⬜⬜⬛⬛⬜⬜⬜⬜⬛🟩🟩🟩🟩🟩⬛⬜⬜⬜⬜⬛⬛⬜⬜⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬜⬜⬛⬜⬜⬜⬜⬜⬛🟩🟩🟩🟩🟩🟩⬛⬜⬜⬜⬛⬛⬛⬛⬜⬜⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬜⬜⬜⬜⬜⬜⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜⬜⬛⬛⬜⬜⬜⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬛⬜⬜⬜⬜⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜⬜⬜⬛⬜⬜⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦🟦⬛⬛🟩🟩⬛⬜⬜⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜⬜⬜⬜⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦🟦⬛🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜⬜⬜⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬜⬜⬛⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦🟦⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛🟩🟩⬛🟦⬛🟦🟦⬛🟦🟦🟦🟦🟦
🟦🟦🟦🟦🟦🟦⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩⬛⬛🟩⬛⬛🟦🟦🟦
🟦🟦🟦🟦🟦🟦⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩⬛🟩⬛🟩⬛🟦🟦
🟦🟦🟦🟦🟦🟦⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩⬛🟩⬛🟩⬛🟦🟦
🟦🟦🟦🟦🟦🟦⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩⬛🟩⬛🟩⬛⬛🟦
🟦🟦🟦🟦🟦🟦⬛🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟩⬛🟩⬛
🟦🟦🟦🟦🟦🟦⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟩🟩⬛🟩⬛🟩⬛
🟦🟦🟦🟦🟦🟦⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩⬛🟩🟩⬛🟩⬛
🟦🟦🟦🟦🟦🟦🟦⬛🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛🟩🟩🟩🟩⬛🟩⬛🟩⬛🟩⬛🟦
🟦🟦🟦🟦🟦🟦🟦⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟩⬛🟩⬛🟦
🟦🟦🟦🟦🟦🟦⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟥🟥🟥🟥🟥🟥⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟩⬛🟩⬛🟦
🟦🟦🟦🟦⬛⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩⬛🟩🟩⬛⬛🟦🟦
🟦🟦⬛⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟩⬛🟩⬛🟦🟦
🟦⬛🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩⬛🟦🟦🟦
⬛🟩🟩⬛⬛🟩🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩⬛🟦🟦🟦
🟩⬛⬛⬛🟩🟩🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩⬛🟩🟩🟩⬛🟦🟦🟦🟦
⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛🟦🟦🟦🟦🟦
⬛🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛⬛🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩⬛⬛⬛🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
⬛⬛⬛🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟦⬛🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟦⬛🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩⬛⬛🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦
⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩🟩🟩⬛⬛⬛⬛🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦🟦
🟩🟩⬛⬛⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦
⬛⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦
🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩⬛🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟦🟦🟦🟦🟦🟦🟦
🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛🟦🟦🟦🟦
🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟦🟦🟦
🟩🟩🟩⬛⬛🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩⬛🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟦🟦
🟩🟩🟩⬛⬛🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩⬛🟩🟩⬛🟦⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟦
🟩🟩🟩⬛⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩🟩⬛🟩🟩⬛🟦🟦⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟦
🟩🟩🟩⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩🟩⬛🟩🟩⬛🟦🟦⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛
🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩⬛⬛🟩⬛🟦⬛⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛
🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩⬛⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩
🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩⬛🟩🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩
🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩
🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩
🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩
🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩
🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟦⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩
🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩⬛🟦⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩
🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩⬛⬛⬛🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩
🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩⬛⬛🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩🟩🟩🟩⬛🟩🟩🟩🟩`}
            </pre>
            <p>Oh no, hai cambiato la data del sistema!</p>
          </div>
        </div>
        ) : <App/>
      }
    </div>
  );
}

export default CheckDate;
