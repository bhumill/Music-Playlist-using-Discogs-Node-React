import React, { useReducer, useState } from "react";
import "./App.css";
import Discogs from "./Components/Discogs";
import Playlist from "./Components/Playlist";

function App() {
  const [count, forceUpdate] = useState(0);

  function handleClick() {
    forceUpdate((pre) => pre + 1);
  }

  return (
    <div className="App">
      <div>
        <div className="row">
          <div className="col">
            <Playlist count={count} />
          </div>
          <div className="col">
            <Discogs handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
