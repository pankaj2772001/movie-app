import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieProvider from "../../context/MovieProvider"
import './MovieDetail.css'

const MovieDetail = () => {

    const {movieId} = useParams()
    const {getMovieDetail, getCastDetail, movieDetail, castDetail} = useContext(MovieProvider)

    

    useEffect(()=> {

        getCastDetail(movieId)
        getMovieDetail(movieId)
    }, [movieId])

    if (!movieDetail) return <p style={{ color: "white" }}>Loading...</p>;


    return(


    <div className="movie-detail">

      <div
        className="banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path})`,
        }}
      >
        <div className="banner-overlay">
          <div className="left">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
              alt={movieDetail.title}
            />
          </div>
          <div className="right">
            <h2>{movieDetail.title}</h2>
            <p className="rating">⭐ {movieDetail.vote_average.toFixed(1)}</p>
            <p>{movieDetail.runtime} min</p>
            <p>{movieDetail.genres.map(g => g.name).join(", ")}</p>
            <p><strong>Release Date:</strong> {movieDetail.release_date}</p>
            <h3>Overview</h3>
            <p>{movieDetail.overview}</p>
          </div>
        </div>
      </div>

      {castDetail?.cast?.length > 0 && (
        <div className="cast-section">
          <h3>Cast</h3>
          <div className="cast-list">
            {castDetail.cast.slice(0, 7).map((cast) => (
              <div key={cast.id} className="cast-card">
                <img
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${cast.profile_path}`
                      : "https://placehold.co/100x150?text=No+Image"
                  }
                  alt={cast.name}
                />
                <p className="cast-name">{cast.name}</p>
                <p className="cast-role">{cast.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    )
}

export default MovieDetail