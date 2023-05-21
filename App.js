import React from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { useState } from 'react';

function App() {
  const [movies,setMovies]=useState([]);
  const [isLoading,setLoading]=useState(false);
  const [error,seterror]=useState(null);

async function fetchMoviesHandler(){
  setLoading(true);
  seterror(null)
  try {
const response = await fetch('https://swapi.dev/api/films')
if(!response.ok){
  throw new Error("Something went wrong!!")
}
const data = await response.json();

   const transformeMovies=data.results.map((movieData)=>{
    return{
      id:movieData.episode_id,
      title:movieData.title,
      openingText:movieData.openingText_crawl,
      releaseDate:movieData.release_date
    }
  })
     setMovies(transformeMovies)
}catch(error){
  seterror(error.message);
}
setLoading(false)

}
let content=<p>Movies not found.</p>
if(movies.length>0){
  content= <MoviesList movies={movies} />
}
if(error){
  content= <p>{error}</p>;
}

if(isLoading){
  content = <p>Loading...</p>;
}
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}

      </section>
    </React.Fragment>
  );
}

export default App;
