import { useEffect, useState } from "react";
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
import { ErrorMessage } from "./ErrorMessage";
import { Loading } from "./Loading";



const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const App = () =>  {
  
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");

  const [isWatchedMoviestOpen, setIsWatchedMoviesOpen] = useState(true);
  const [isBoxListOpen, setIsBoxListOpen] = useState(true);

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const KEY = "67994b0d";

  const handleQueryMovie = (inputValue) => setQuery(inputValue); 

  useEffect( () => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response =  await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`); 
        if(!response.ok) throw new Error("Something went wrong with fetching movies");
        const data = await response.json(); 
        if(data.Response === "False") throw new Error("No movies found");
        setMovies(data.Search);
       } catch (err) {
        setError(err.message); 
        }
        finally{
          setIsLoading(false)
        }
      };
      fetchMovies(); 
  },[query])

  return (
    <>
      <Navbar>
        <UseLogo />
        <SearchMovies query={query} onHandleQuery={handleQueryMovie}/>
        <CountMovies numberMovies={movies.length} />
      </Navbar>
      <main className="main">
        <Box>
          <Button onClick={()=> setIsBoxListOpen((prevIsOpen) => !prevIsOpen)} isOpen={isBoxListOpen} />
          {!isLoading && !error && isBoxListOpen && <MoviesList>{movies?.map(movie => <Movie key={movie.imdbID} movie={movie}/>)}</MoviesList>}
          {error && <ErrorMessage message={error} /> }
          {isLoading && <Loading />}
          
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
