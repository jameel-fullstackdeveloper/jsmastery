
import { useEffect,useState } from 'react';
import './App.css'
import SearchIcon from './assets/search.svg';
import MovieCard from './Moviecard';
import Loading from './Loading';

export default function App () {

  const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async (title) => {
    setIsLoading(true);

    const response = await fetch(`${API_URL}&s=${title}`);
    const result = await response.json();

    setMovies(result.Search)

    setIsLoading(false)   // Hide loading screen
  }

  useEffect( () => {
    searchMovies();

  },[])

  return (
    <>
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">

      <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies"
            />

        {isLoading  ?  

          (
           <Loading/>
          )
         : ( 
          <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
        )
        }

       
      </div>

     

      {movies?.length > 0 ? (

        <div className="container">
        
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div> 
    </>
  )
}