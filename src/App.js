import React, { useState, useEffect } from "react";
import { ShowMovies } from "./components/ShowMovies";
import "./App.scss";

function App() {
  //! state hook ----------------------------------------
  const [searchText, setSearchText] = useState("");
  const [urlLink, setUrlLink] = useState([]);
  const [movies, setMovies] = useState([]);

  const textUrl = `http://www.omdbapi.com/?apikey=6de66d6f&s=${searchText}`;

  //! function ----------------------------------------
  // fetchMovie()
  async function fetchMovie() {
    setUrlLink([]);
    setMovies([]);
    const response = await fetch(textUrl);
    const data = (await response.json()).Search;

    data.map((item) =>
      setUrlLink((url) => [
        ...url,
        `http://www.omdbapi.com/?apikey=6de66d6f&i=${item.imdbID}`,
      ])
    );
  }

  // fetchInfo()
  async function fetchInfo() {
    let infoArray = await Promise.all(urlLink.map((url) => fetch(url))).then(
      async (res) => {
        return Promise.all(res.map(async (data) => await data.json()));
      }
    );
    setMovies(infoArray);
  }

  // inputText()
  const inputText = (e) => {
    setSearchText(e.target.value);
  };

  // searchMovie()
  const searchMovie = (e) => {
    e.preventDefault();
    fetchMovie().catch((error) =>
      alert(`No such movie or series. Please search again.`)
    );
  };

  //! useEffect hook ---------------------------------------
  useEffect(() => {
    fetchInfo();
  }, [urlLink]);

  //! rendering --------------------------------------------
  return (
    <div className="App">
      <h1>Movie Search</h1>

      <div className="searchArea">
        <input className="searchBox" type="text" onChange={inputText} />
        <button className="searchBtn" type="submit" onClick={searchMovie}>
          Search
        </button>
      </div>

      <div className="allMovies">
        {movies.map((item, index) => (
          <ShowMovies
            key={index}
            poster={item.Poster}
            title={item.Title}
            released={item.Released}
            rating={item.Ratings[0].Value}
            plot={item.Plot}
            genre={item.Genre}
          />
        ))}
      </div>
    </div>
  );
}

App.defaultProps = {
  rating: "No rating",
};

export default App;
