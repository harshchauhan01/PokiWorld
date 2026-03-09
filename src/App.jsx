import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PokeDetails from './pages/PokeDetails';
import Tmp from './pages/tmp';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pokemon/:name' element={<PokeDetails/>} />
        <Route path='/tmp' element={<Tmp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
