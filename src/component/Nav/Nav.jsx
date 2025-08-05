// import { useContext} from "react"
// import { NavLink, useNavigate } from "react-router-dom"
// import MovieProvider from "../../context/MovieProvider"
// import './Nav.css'

// const Nav = () => {

//     const {getSearchMovies, searchValue, setSearchValue, setPage} = useContext(MovieProvider)

    

//     const navigate = useNavigate()


//     function searchHandler(){

//         if(searchValue.trim()){
//             setPage(1)
//             getSearchMovies(searchValue)
//             navigate('/search')
//         }

           
//     }

    
    
//     return(

    
//     <nav className="navbar">
//   <NavLink className="navbar-logo" to="/">MovieDB</NavLink>

//   <ul className="navbar-links">
//     <li><NavLink to="/" className="nav-link">Popular</NavLink></li>
//     <li><NavLink to="/topRated" className="nav-link">Top Rated</NavLink></li>
//     <li><NavLink to="/upcoming" className="nav-link">Upcoming</NavLink></li>
//     <li>
//       <div className="search-container">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Movie Name"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//         />
//         <button onClick={() => searchHandler()} className="search-button">Search</button>
//       </div>
//     </li>
//   </ul>
// </nav>

//     )
// }

// export default Nav



import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MovieProvider from "../../context/MovieProvider";
import "./Nav.css";

const Nav = () => {
  const { getSearchMovies, searchValue, setSearchValue, setPage } =
    useContext(MovieProvider);
  const navigate = useNavigate();

  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false);

  function searchHandler() {
    if (searchValue.trim()) {
      setPage(1);
      getSearchMovies(searchValue)

      if (location.pathname !== "/search") {
        navigate("/search");
      }
      setMenuOpen(false); 
    }
  }



  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink className="navbar-logo" to="/">
        MovieDB
      </NavLink>

      {/* Hamburger icon for mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation links */}
      <ul className={`navbar-links ${menuOpen ? "show" : ""}`}>
        <li>
          <NavLink
            to="/"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/topRated"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/upcoming"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Upcoming
          </NavLink>
        </li>
        <li>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Movie Name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={searchHandler} className="search-button">
              Search
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
