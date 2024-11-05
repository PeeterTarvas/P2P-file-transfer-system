import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login.tsx";
import Dashboard from "./components/dashboard.tsx";
import PeerComponent from "./components/PeerComponent";
import React from "react";
import GroupsList from "./components/GroupListComponent.tsx";
import GroupDetails from "./components/GroupDetailsComponent.tsx";
import GroupPage from "./components/GroupPage.tsx";
import MainPage from "./components/MainPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import GroupPage from "./components/groupPage.tsx";
// import MainPage from "./components/mainPage.tsx";
// import Login from "./components/login.tsx";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/main" element={<MainPage />} />
//         <Route path="/groups/:groupId" element={<GroupPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
