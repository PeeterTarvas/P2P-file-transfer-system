import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login.tsx";
import Dashboard from "./components/dashboard.tsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path={"/"}>
              <Route index element={<Login />} />
              <Route path={'dashboard'} element={<Dashboard />} />
              <Route element={<Login />} />
            </Route>
          </Routes>
      </BrowserRouter>

  )
}

export default App
