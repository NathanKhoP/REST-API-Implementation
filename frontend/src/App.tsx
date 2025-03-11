import './App.css'
import Home from './components/Home'
import Login from './components/Login/LoginPage'
import Register from './components/Register/RegisterPage'
import AddFood from './components/AddFood'
import ModifyFood from './components/ModifyFood'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/edit-food/:id" element={<ModifyFood />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
