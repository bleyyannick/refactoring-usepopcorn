/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export const MovieDetails = ({id}, onHandleAddWatchedMovie) => {
    const KEY = "67994b0d";

    const [movie, setMovie] = useState({}); 

    useEffect(() => {
      const getMovieDetails = async (id) => {
        try {
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
              console.log()
              }
        };
        getMovieDetails(id)
    }, [id])
    return (
    // Need to destructure movie object for using it.
       <div>
           <p>{id}</p>
           <button className="btn-list" onClick={() => onHandleAddWatchedMovie(movie)}>+Add list</button>
       </div>
    )
}