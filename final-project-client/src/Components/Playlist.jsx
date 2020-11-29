import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const Playlist = (props) => {
  const [state, setstate] = useState([]);

  useEffect(() => {
    if (props.count) {
      getTracks();
    }
  }, [props.count]);

  useEffect(() => getTracks(), []);

  const getTracks = () => {
    axios
      .get(`http://localhost:3001/tracks`)
      .then((res) => {
        const { data } = res;
        setstate({ tracks: data.tracks });
      })
      .catch((error) => {
        setstate({ tracks: [] });
      });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3001/tracks/${id}`).then((res) => {
      if (res.data) {
        getTracks();
      }
    });
  };
  return (
    <div className="container">
      <h2>Playlist</h2>
      {state.tracks && state.tracks.length
        ? state.tracks.map((track) => (
            <div key={track.id} className="row">
              <div
                className="col card"
                style={{ width: "20rem", margin: "10px" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{track.title}</h5>
                  <h6>{track.type}</h6>
                  <a
                    target="_blank"
                    href={`http://${track.uri}`}
                    className="card-text"
                  >
                    More Details
                  </a>
                  <div>
                    <button
                      onClick={() => onDelete(track.id)}
                      className="btn btn-primary"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Playlist;
