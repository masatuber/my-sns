import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Setting from "./pages/setting/Setting";
import { BrowserRouter as Router, Route, Routes, Navigate,  } from 'react-router-dom'; //画面遷移用ライブラリ
import { AuthContext } from './state/AuthContext';
import { useContext } from 'react';

function App() {
  //useContextでグローバルにユーザー状態を把握する
  const { user } = useContext(AuthContext);


  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Register />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />
            <Route path="/profile/:username" element={<Profile />} />
            <Route
              path="/Setting"
              element={<Setting />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App
