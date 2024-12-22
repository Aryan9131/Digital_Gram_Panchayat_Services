import { useState } from 'react'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { HomePage } from './components/HomePage'
import './App.css'
import {Route, Router, Routes} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
            </Routes>
    </>
  )
}

export default App
