import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import {
  BrowserRouter as Router,Routes,Route,
} from "react-router-dom";
import Home from './components/Home';
import Notestate from './context/Notes/Notestate';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    // setTimeout(() => {
    //   showAlert(null)
    // }, 1500);
  }
  return (
    <>
    <Notestate>
      <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <Routes>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
      <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
      <Route path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
      </Routes>
      </Router>
    </Notestate>
    </>
  )
}

export default App;
