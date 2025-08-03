import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import MovieProvider from "../../context/MovieProvider"
import './Nav.css'

const Nav = () => {

    const {getSearchMovies, searchValue, setSearchValue} = useContext(MovieProvider)

    

    const navigate = useNavigate()


    function searchHandler(){

        if(searchValue.trim()){

             getSearchMovies(searchValue)
            navigate('/search')

        }

           
    }
    





    return(

    
    <nav className="navbar">
  <NavLink className="navbar-logo" to="/">MovieDb</NavLink>

  <ul className="navbar-links">
    <li><NavLink to="/" className="nav-link">Popular</NavLink></li>
    <li><NavLink to="/topRated" className="nav-link">Top Rated</NavLink></li>
    <li><NavLink to="/upcoming" className="nav-link">Upcoming</NavLink></li>
    <li>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Movie Name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={searchHandler} className="search-button">Search</button>
      </div>
    </li>
  </ul>
</nav>

    )
}

export default Nav