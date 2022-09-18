import { Routes, Route, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import './assets/App.css'


function App () {



  return (
    <div className="App">
    <Routes>
  
    <Route path="*" element={<NotFound />} />
    <Route path="/" element={<HomePage />} />
   


   
  </Routes>
    </div>
  )
}

export default App
