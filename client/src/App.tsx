import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login.tsx";
import Dashboard from "./components/dashboard.tsx";

function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
