import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bf4-dark text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:platform/:name" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
