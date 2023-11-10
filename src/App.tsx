import './App.css';
import { Routes, Route, useParams } from "react-router-dom"
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';
import { useEffect } from "react";
import { useAppDispatch } from './redux/store';
import { fetchMe } from './redux/Slice/authSlise';
import AddPost from './components/AddPost/AddPost';
import { Path } from './Path/Patch';
import OnePost from './components/OnePost/OnePost';
import WelcomPage from './components/WelcomPage/WelcomPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch, fetchMe])


  return (
    <div className="App">
      <Routes>
        <Route path={Path.Home} element={<Home />} />
        <Route path={Path.Auth} element={<Auth />} />
        <Route path={Path.Register} element={<Register />} />
        <Route path={Path.AddPost} element={<AddPost />} />
        <Route path={Path.removePost} element={<AddPost />} />
        <Route path={Path.OnePost} element={<OnePost />} />
        <Route path={Path.WelcomPage} element={<WelcomPage />} />
        <Route path={Path.Error} element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
