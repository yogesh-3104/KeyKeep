import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Manage from './component/Manage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar/>
        <Manage/>
        <Footer/>
      </div>
    </>
  )
}

export default App
