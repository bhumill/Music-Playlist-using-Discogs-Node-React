import Axios from "axios";
import React, { useState } from "react";

const Discogs = (props) => {
  const [artist, setArtist] = useState("");
  const [results, setResult] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (artist) {
      Axios.get(
        `https://api.discogs.com/database/search?key=JRAKKvJlbsqshNNwkaJx&secret=WQIXIsQhXFqfYCFHnJDhcrxKomOUwAzE&artist=${artist}&country=canada`
      ).then((res) => {
        const { data } = res;
        setResult(data.results);
      });
    }
  };

  const onAdd = (userId) => {
    let { id, master_id, title, uri } = results.find(
      (result) => result.id === userId
    );
    let dataToSave = {
      id,
      master_id,
      title,
      uri: `www.discogs.com${uri}`,
      playlist_id: 8,
    };
    Axios.post(`http://localhost:3001/tracks`, dataToSave).then((res) => {
      console.log(res);
      props.handleClick();
      //   props.onAlbumAdd(res.data);
    });
  };
  return (
    <div>
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <h3>Search by Artist name:</h3>
          <label htmlFor="inputPassword2" className="sr-only">
            Artist Name
          </label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="form-control"
            id="inputPassword2"
            placeholder="Artist Name"
          />
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-primary mb-2"
        >
          Search
        </button>
        <p>Canadian releases only.</p>
      </form>

      <hr />
      {Array.isArray(results) && results.length
        ? results.map((result) => (
            <div key={result.id} className="row">
              <div
                className="col card"
                style={{ width: "20rem", margin: "10px" }}
              >
                <div className="card-body">
                  <img src={result.thumb} alt="cover" />
                  <h5 className="card-title">{result.title}</h5>
                  <p>genre : {result.genre[0]}</p>

                  <p>label :{result.label[0]}</p>

                  <p>country: {result.country}</p>

                  <p>master_id : {result.master_id}</p>

                  <a
                    target="_blank"
                    href={`https://www.discogs.com${result.uri}`}
                    className="card-text"
                  >
                    More Information
                  </a>
                  <div>
                    <button
                      onClick={() => onAdd(result.id)}
                      className="btn btn-primary"
                    >
                      Add to Favorite
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

export default Discogs;
