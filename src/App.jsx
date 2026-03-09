import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PokeDetails from './pages/PokeDetails';
import Navbar from './components/Navbar';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pokemon/:name' element={<PokeDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
