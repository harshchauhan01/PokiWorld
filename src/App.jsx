import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PokeDetails from './pages/PokeDetails';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pokemon/:name' element={<PokeDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
