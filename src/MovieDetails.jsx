/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"; 
import { Loading } from "./Loading";
import { StarRating } from "./StarRating";

export const MovieDetails = ({id, onHandleAddWatchedMovie, onCloseMovie, watchedMovies}) => {
    const KEY = "67994b0d";

    const [movie, setMovie] = useState({}); 
    const [isLoading, setIsLoading] = useState(false); 
    const [userRating, setUserRating] = useState(''); 


    useEffect(() => {
      const getMovieDetails = async (id) => {
        try {
        setIsLoading(true)
         const response =  await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
         if(!response.ok) throw new Error("Something went wrong with movie fetching")
         const data = await response.json(); 
         if(data.Response === "False") throw new Error("Movie not found")
         setMovie(data)
         } 
         catch(err) {
                 console.error(err.message)
              } 
        finally {
              setIsLoading(false)
              }
        };
        getMovieDetails(id)
    }, [id]);

    const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot, 
      Released: released,
      Actors: actors, 
      Director: director, 
      Genre: genre, 
     } = movie; 

    useEffect(
      () => {
       document.title = `Movie | ${title}`
       console.log(document.title)

       /**
        * Clean up function
        */
       return () => document.title = "usepopcorn"; 
      }, [title]
    )
    
    const handleAdd = () => {
      const newMovie = {
        imdbID: id, 
        title,
        year,
        poster,
        imdbRating: +imdbRating,
        runtime: Number(runtime.split(" ").at(0)), 
        userRating
      };
      onHandleAddWatchedMovie(newMovie);
      onCloseMovie()
    }; 

    const isWatched = watchedMovies.map(movie => movie.imdbID).includes(id); 
    const watchedMovieUserRating = watchedMovies.find(movie => movie.imdbID === id)?.userRating; 
  
    return (
        <div className="details">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${movie} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDb rating
                </p>
              </div>
            </header>
            <section>
            <div className="rating">
                  {
      
                    !isWatched ? (
                    <>
                      <StarRating
                        maxRating={10}
                        size={20}
                        onRate={setUserRating}
                      />
                       {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+Add list</button> }

                   </>
                    ) : (
                      <p>
                        You rated with movie {watchedMovieUserRating}
                      </p>
                    )
                  }
               </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    )
}