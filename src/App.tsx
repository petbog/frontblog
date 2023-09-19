import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';
import { useEffect } from "react";
import { useAppDispatch } from './redux/store';
import { fetchMe } from './redux/Slice/authSlise';
import AddPost from './components/AddPost/AddPost';


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => { 
    dispatch(fetchMe())
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addPost' element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
