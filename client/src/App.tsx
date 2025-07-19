import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup"/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
