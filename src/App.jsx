import { useState } from "react";
import Navbar from "./Navbar";
import { UseLogo } from "./UseLogo";
import { SearchMovies } from "./SearchMovies";
import { CountMovies } from "./CountMovies";
import { Button } from "./Button";
import { Box } from "./Box";
import { MoviesList } from "./MoviesList";
import { Movie } from "./Movie";
import { Summary } from "./Summary";
import { BannerWatchedMovies } from "./BannerWatchedMovies";
import { WatchedMovie } from "./WatchedMovie";
import { StarRating } from "./StarRating";
import { Test } from "./Test";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const App = () =>  {
  
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isBoxListOpen, setIsBoxListOpen] = useState(true);
  const [isWatchedMoviestOpen, setIsWatchedMoviesOpen] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <Navbar>
        <UseLogo />
        <SearchMovies />
        <CountMovies numberMovies={movies.length} />
      </Navbar>
      <main className="main">
        <Box>
          <Button onClick={()=> setIsBoxListOpen((prevIsOpen) => !prevIsOpen)} isOpen={isBoxListOpen} />
          {isBoxListOpen && <MoviesList>{movies?.map(movie => <Movie key={movie.imdbID} movie={movie}/>)}</MoviesList>}
        </Box>
        <Box>
          <Button onClick={()=> setIsWatchedMoviesOpen((prevIsOpen) => !prevIsOpen)} isOpen={isWatchedMoviestOpen} />
            {isWatchedMoviestOpen && 
              <>
              <Summary>
                <h2>Movies you watched</h2>
                <BannerWatchedMovies 
                  numberWatchedMovies={watched.length}
                  avgImdbRating={avgImdbRating}
                  avgRuntime={avgRuntime}
                  avgUserRating={avgUserRating} />  
               </Summary>
               <MoviesList>
                {watched.map(watchedMovie => <WatchedMovie key={watchedMovie.imdbID} movie={watchedMovie}/>)}
               </MoviesList>
            </>}
            <StarRating maxRating={10} defaultRating={0} messages={["Terrible", "Bad", "Normal","Good","Awesome movie"]}/>
            <StarRating size={10} color="maroon"/>
            <Test />
        </Box>
        
      </main>
    </>
  );
}

export default App; 
