import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login.tsx";
import Dashboard from "./components/dashboard.tsx";
import PeerComponent from './components/PeerComponent';
import React from 'react';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="dashboard" element={
                    <div>
                        <h1>Welcome to PeerJS Test (with TypeScript)</h1>
                        <PeerComponent />
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
