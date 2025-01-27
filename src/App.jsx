/* eslint-disable no-unused-vars */
import Auth from './components/auth'
import './index.css'
import {db} from './config/firebase-config'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = useState([])
  //getting a reference to our collection
  const moviesCollectionRef = collection(db, "movies")

  useEffect(() => {
    async function getMovieList(){
      try {
        //after getting the ref, the getDocs will get all items inside the collectioon
        const data  = await getDocs(moviesCollectionRef)
        //filtering the data
        const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        console.log(filteredData)
        setMovieList(filteredData)
      } catch (error) {
        console.error(error)
      }
    }
    getMovieList();
  }  
  , [])

  

  return (
    <div className="p-4">
      Firebase Course
      <div>
        <Auth/>
      </div>

      <div>
        <input type="text" placeholder='Movie Title'/>
        <input type="number" placeholder='Release Date'/>
        <input type="text" placeholder='Movie Title'/>
      </div>


      <div className='mt-5 border w-[250px] text-center'>
        <h1 className='text-3xl'>Movie List</h1>
        {movieList.map(movie => (
          <div className='my-3' key={movie.id}>
            <h1>{movie.title}</h1>
            <h1>Date: {movie.releaseDate}</h1>
            <h1>{movie.gotOscar ? "Got an Oscar":"Did not get an Oscar"}</h1>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
