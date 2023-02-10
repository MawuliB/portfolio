import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import React from 'react'
import Pot from "./Pot"
import { Route, Routes } from "react-router-dom"
import Home from "./Home"

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:name' element={<Pot />} />
      </Routes>
    </>
  )
}
