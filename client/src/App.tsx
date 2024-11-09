import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/login.page.tsx";
import GroupPage from "./components/group/group.page.tsx";
import MainPage from "./components/main.page.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/groups/:groupId" element={<GroupPage />} />
        <Route
          path="dashboard"
          element={
            <div>
              {/* <h1>Welcome to PeerJS Test (with TypeScript)</h1>
                        <PeerComponent /> */}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
