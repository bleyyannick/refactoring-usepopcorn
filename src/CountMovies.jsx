/* eslint-disable react/prop-types */
export const CountMovies = ({numberMovies}) => {
    return (
        <p className="num-results">
          Found <strong>{numberMovies}</strong> results
        </p>
    )
}