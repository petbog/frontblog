import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
