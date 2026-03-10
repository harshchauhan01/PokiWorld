import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PokeDetails from './pages/PokeDetails';
import Navbar from './components/Navbar';
import Challenge from './pages/Challenge';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pokemon/:name' element={<PokeDetails/>} />
        <Route path='/challenge' element={<Challenge/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
