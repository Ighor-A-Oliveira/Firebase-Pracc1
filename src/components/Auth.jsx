import { useState } from 'react'
import {auth, googleProvider} from '../config/firebase-config'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  async function signIn(){
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }

  async function googleSignIn(){
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User signed up wiith Google successfully!");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }

  //shows info about the current user
  //console.log(auth?.currentUser)

  return (
    <div className='flex flex-col items-start'>
        <input type="text" placeholder='Username' value={email} onChange={(e)=> setEmail(e.target.value)} className="border px-2 mb-3 mt-2 rounded-lg"/>
        <input type="password" placeholder='Password' value={password} onChange={(e)=> {setPassword(e.target.value)}} className="border px-2 mb-2 rounded-lg"/>
        <button className="bg-gray-400 p-2 active:bg-gray-900 active:text-white rounded-lg hover:cursor-pointer"
          onClick={signIn}
        >Sign In</button>
        <button className="bg-gray-400 p-2 active:bg-gray-900 active:text-white rounded-lg hover:cursor-pointer"
          onClick={googleSignIn}
        >Sign In w/ Google Account
        </button>

        <button className="bg-gray-400 p-2 active:bg-gray-900 active:text-white rounded-lg hover:cursor-pointer"
          onClick={logout}
        >Logout</button>
    </div>
  )
}
