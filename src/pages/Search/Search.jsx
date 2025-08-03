import { useContext } from "react"
import MovieProvider from "../../context/MovieProvider"
import { Link } from "react-router-dom"
import './Search.css'

const Search = () => {

    const {searchedMovies, goToPreviousPage, page, goToNextPage, totalPage} = useContext(MovieProvider)




    return(
     

        <div className="search">
      <div className="movie-grid">
        {searchedMovies?.results?.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <p className="movie-title">{movie.title}</p>
            <p className="movie-rating">Rating: {movie?.vote_average?.toFixed(1)}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={page === 1}
          className="pagination-button"
        >
          Prev
        </button>

        <span className="page-number">Page {page}</span>

        <button
          onClick={goToNextPage}
          disabled={page === totalPage}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
    )




}

export default Search