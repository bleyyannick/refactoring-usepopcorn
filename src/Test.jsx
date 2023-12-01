import { useState } from "react"
import { StarRating } from "./StarRating"

export const Test = () => {
  const [movieRating, setMovieRating] = useState(0); 

  const handleRatingmovie = (movieRate) => {
    setMovieRating(Number(movieRate))
  }
    return(
        <div>
            <h1>This movie was rated{movieRating} stars </h1>
            <StarRating color="green" maxRating={8} onRate={handleRatingmovie} />
        </div>
    )
}