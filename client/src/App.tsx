import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/login/login.page.tsx";
import GroupPage from "./components/group/group.page.tsx";
import MainPage from "./components/main.page.tsx";
import {FileNotificationProvider} from "./components/notification.context.tsx";
import GlobalNotifications from "./components/notification-display.tsx";

function App() {

    return (
        <FileNotificationProvider>
            <BrowserRouter>
                <GlobalNotifications/>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/groups/:groupId" element={<GroupPage/>}/>
                </Routes>
            </BrowserRouter>
        </FileNotificationProvider>
    );
}

export default App;
