// src/pages/DiscoverMoviesPage.tsx
import React, { useState } from "react";

type Movie = {
    Title: string;
    Poster: string; // a url
    Type: string; // e.g. "movie"
    Year: string; // yep, a string instead of a number :|
    imdbID: string;
  };
  
  type ApiResult = {
    Response: "true";
    Search: Movie[];
    totalResults: string; // yeah, that's weird indeed
  };

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ApiResult }
  | { status: "error"; error: any };

  export default function DiscoverMoviesPage() {
  const [searchText, setSearchText] = useState("");
  const [state, setState] = useState<SearchState>({ status: "idle" });


  const search = async () => {
    console.log("Start searching for:", searchText);
  
    // Best practice: encode the string so that special characters like '&' and '?' don't accidentally mess up the URL
    const queryParam = encodeURIComponent(searchText);
  
    // Option A: use the browser-native fetch function (from exmpl: 6a06f383)
    const data = await fetch(
      `https://omdbapi.com/?apikey=7ee91e8d&s=${queryParam}`
    ).then((r) => r.json());
  /*
[
    {
        "Title":"The Matrix",
        "Year":"1999",
        "imdbID":"tt0133093",
        "Type":"movie",
        "Poster":"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    }
]
  */

    setState({ status: "success", data });

    console.log("Success!", data);
};


  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </p>

      {state.status === "loading" && <p>Searching...</p>}
      {state.status === "success" && (
        <div>
          <h2>Search results</h2>
          {state.data.Search.slice(0, 10).map(movie => {
            return <div>{movie.Title} ({movie.Year})</div>;
          })}
        </div>
      )}
      
    </div>
  );
}