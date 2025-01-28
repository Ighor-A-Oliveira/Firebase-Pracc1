/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Auth from './components/auth'
import './index.css'
import {db, auth} from './config/firebase-config'
import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

function App() {
  //movie list from the db
  const [movieList, setMovieList] = useState([])
  //getting a reference to our collection
  const moviesCollectionRef = collection(db, "movies")

  //New movie state
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [newGotOscar, setNewGotOscar] = useState(false)

  //update title state
  const [updateTitle, setUpdateTitle] = useState("")

  //gets the current movie list
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

  useEffect(() => {
    getMovieList();
  }, [])


  //adds a movie to the db
  async function onSubmitMovie(){
    try {
      await addDoc(moviesCollectionRef, {title: newMovieTitle, releaseDate: newReleaseDate, gotOscar: newGotOscar, userId: auth?.currentUser.uid});
      getMovieList();
    } catch (error) {
      console.log(error)
    }
  }

  //deletes an entry from the db
  async function deleteMovie(id){
    try {
      //in order to delete an entry we need to identify it as a doc
      const movieDoc =  doc(db, "movies",id)
      //then we send the doc reference to the api and it deletes the movie
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.log(error)
    }
  }

  async function updateMovieTitle(id){
    try {
      //in order to update an entry we need to identify it as a doc
      const movieDoc =  doc(db, "movies",id)
      //here we pass the reference of the movie doc and the field we want to edit along with the new value of the field
      await updateDoc(movieDoc, {title: updateTitle});
      getMovieList();
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="p-4">
      Firebase Course
      <div>
        <Auth/>
      </div>

      <div className='flex flex-col w-[250px] mt-10'>
        <input type="text" placeholder='Movie Title' onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input type="number" placeholder='Release Date' min={1880} onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
        <div className='flex items-center'>
          <label htmlFor="gotOscar">
            Got an Oscar:
          </label>
          <input type="checkbox" className='ml-2' placeholder='Got an Oscar' id='gotOscar' checked={newGotOscar} onChange={(e) => setNewGotOscar(Boolean(e.target.checked))}/>
        </div>
        <button className="bg-gray-400 p-2 active:bg-gray-900 active:text-white rounded-lg hover:cursor-pointer" onClick={onSubmitMovie}>Add Movie</button>
      </div>


      <div className='mt-5 border w-[250px] text-center'>
        <h1 className='text-3xl'>Movie List</h1>
        {movieList.map(movie => (
          <div className='my-3' key={movie.id}>
            <h1 className='font-bold'>{movie.title}</h1>
            <h1>Date: {movie.releaseDate}</h1>
            <h1>{movie.gotOscar ? "Got an Oscar":"Did not get an Oscar"}</h1>
            <button className='bg-gray-400 p-2 active:bg-gray-900 active:text-white rounded-lg hover:cursor-pointer' onClick={() => deleteMovie(movie.id)}>Delete</button>
            <div className='flex flex-col items-center mt-2'>
              <input type="text" className='my-2 border rounded-lg px-2' placeholder='Update Title..' onChange={(e) => setUpdateTitle(e.target.value)} />
              <button className='bg-gray-400 p-2 active:bg-gray-900 active:text-white rounded-lg hover:cursor-pointer' onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
