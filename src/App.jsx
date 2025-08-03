import MovieProvider from "./context/movieProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Nav from "./component/Nav/Nav";
import { useEffect, useState } from "react";
import TopRated from "./pages/TopRated/TopRated";
import Upcoming from "./pages/Upcoming/Upcoming";
import Search from "./pages/Search/Search";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import { useLocation } from "react-router-dom";
import './App.css';

const MovieContent = () => {
  const [movies, setMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [castDetail, setCastDetail] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPage(1);
  }, [location.pathname, searchValue]);

  async function getAllMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
      );
      const data = await response.json();
      setMovies(data);
      setTotalPage(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
    }
  }

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
      );
      const data = await response.json();
      setTopRatedMovies(data);
      setTotalPage(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch top-rated movies:", error);
    }
  };

  const getUpcomingMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
      );
      const data = await response.json();
      setUpcomingMovies(data);
      setTotalPage(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    }
  };

  const getSearchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${searchValue}&page=${page}`
      );
      const data = await response.json();
      setSearchedMovies(data);
      setTotalPage(data.total_pages);
    } catch (error) {
      console.error("Failed to search movies:", error);
    }
  };

  const getMovieDetail = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
      );
      const data = await response.json();
      setMovieDetail(data);
    } catch (error) {
      console.error("Failed to fetch movie detail:", error);
    }
  };

  const getCastDetail = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
      );
      const data = await response.json();
      setCastDetail(data);
    } catch (error) {
      console.error("Failed to fetch cast detail:", error);
    }
  };

  function goToNextPage() {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  }

  function goToPreviousPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  useEffect(() => {
    if (location.pathname === "/") {
      getAllMovies();
    } else if (location.pathname === "/topRated") {
      getTopRatedMovies();
    } else if (location.pathname === "/upcoming") {
      getUpcomingMovies();
    } else if (location.pathname === "/search" && searchValue.trim()) {
      getSearchMovies();
    }
  }, [page, location.pathname, searchValue]);

  return (
    <MovieProvider.Provider
      value={{
        movies,
        goToNextPage,
        goToPreviousPage,
        page,
        totalPage,
        topRatedMovies,
        upcomingMovies,
        getSearchMovies,
        searchedMovies,
        getMovieDetail,
        getCastDetail,
        movieDetail,
        castDetail,
        searchValue,
        setSearchValue,
      }}
    >
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topRated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
      </Routes>
    </MovieProvider.Provider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <MovieContent />
    </BrowserRouter>
  );
};

export default App;
