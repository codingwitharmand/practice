import "./DrumMachine.css";
import Q from "./audios/Q.mp3";
import W from "./audios/W.mp3";
import E from "./audios/E.mp3";
import A from "./audios/A.mp3";
import S from "./audios/S.mp3";
import D from "./audios/D.mp3";
import Z from "./audios/Z.mp3";
import X from "./audios/X.mp3";
import C from "./audios/C.mp3";
import { useState } from "react";

const DrumMachine = () => {
  const [audioDescription, setAudioDescription] = useState("");
  const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
  const audios = {
    Q: "Woosh",
    W: "Deep Woosh",
    E: "Swish",
    A: "Deep Swish",
    S: "Light Woosh",
    D: "Crash",
    Z: "Sci-Fi Woosh",
    X: "Whip",
    C: "Cinematic",
  };
  const handleClick = (e) => {
    const audio = e.target.children[0];
    setAudioDescription(audios[audio.id]);
    audio.play();
  };

  const handleKeyDown = (e) => {
    const key = String(e.key).toUpperCase();
    if (keys.includes(key)) {
      document.getElementById(`${key}`).play();
        }
  };

  return (
    <div className="drum-machine-container">
      <div id="drum-machine">
        <div className="drum-pads" onKeyDown={handleKeyDown} tabIndex={0}>
          <button id="drum-padQ" className="drum-pad" onClick={handleClick}>
            <audio id="Q" src={Q} />Q
          </button>
          <button id="drum-padW" className="drum-pad" onClick={handleClick}>
            <audio id="W" src={W} />W
          </button>
          <button id="drum-padE" className="drum-pad" onClick={handleClick}>
            <audio id="E" src={E} />E
          </button>
          <button id="drum-padA" className="drum-pad" onClick={handleClick}>
            <audio id="A" src={A} />A
          </button>
          <button id="drum-padS" className="drum-pad" onClick={handleClick}>
            <audio id="S" src={S} />S
          </button>
          <button id="drum-padD" className="drum-pad" onClick={handleClick}>
            <audio id="D" src={D} />D
          </button>
          <button id="drum-padZ" className="drum-pad" onClick={handleClick}>
            <audio id="Z" src={Z} />Z
          </button>
          <button id="drum-padX" className="drum-pad" onClick={handleClick}>
            <audio id="X" src={X} />X
          </button>
          <button id="drum-padC" className="drum-pad" onClick={handleClick}>
            <audio id="C" src={C} />C
          </button>
        </div>
        <div id="display">{audioDescription}</div>
      </div>
    </div>
  );
};

export default DrumMachine;
