/* eslint-disable react/prop-types */


export const BannerWatchedMovies = ({numberWatchedMovies, avgImdbRating, avgUserRating, avgRuntime }) => {
    return (
        <div>
                    <p>
                      <span>#️⃣</span>
                      <span>{numberWatchedMovies} movies</span>
                    </p>
                    <p>
                      <span>⭐️</span>
                      <span>{avgImdbRating}</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>{avgUserRating}</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>{avgRuntime} min</span>
                    </p>
                  </div>
    )
}