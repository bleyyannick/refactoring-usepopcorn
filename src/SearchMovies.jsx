/* eslint-disable react/prop-types */



export const SearchMovies = ({query, onHandleQuery}) => {
    console.log(query)
    return ( <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => onHandleQuery(e.target.value)}/>
   )
}; 

