import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Read from './Pages/Read'
import Update from './Pages/Update'
import Delete from './Pages/Delete'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<Create />} />
      <Route path='/read' element={<Read />} />
      <Route path='/update' element={<Update />} />
      <Route path='/delete' element={<Delete />} />
    </Routes>
  )
}
