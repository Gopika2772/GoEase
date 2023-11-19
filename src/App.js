
import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter, Route,Router, Routes } from "react-router-dom";
// import Login from "./pages/login/Login";
// import Register from './pages/register/Register';
import Landing from './pages/landingpage/Landing'
import Flights from './pages/flights/Flights';
import Review from './pages/review/Review';
import Adminadd from './pages/admin/Adminadd';
import List from './pages/list/List';
import Home from './pages/home/Home';
import Adminregister from './pages/register/Adminregister';
import Adminlogin from './pages/login/Adminlogin';
import Login from './pages/login/Login';
import Register from './pages/register/Register';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/adminlogin" element={<Adminlogin/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/adminregister" element={<Adminregister/>} />
    <Route path="/landing" element={<Landing/>} />
    <Route path="/flights" element={<Flights/>} />
    <Route path="/review" element={<Review/>} />
    <Route path="/addflights" element={<Adminadd/>} />
    <Route path="/listflights" element={<List/>} />
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
