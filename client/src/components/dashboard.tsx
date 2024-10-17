import {useNavigate} from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate()

    const goBack = () => {
        sessionStorage.clear();
        navigate(-1);
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Username: {sessionStorage.getItem('username')}</h2>
            <h2>IPv6 address: {sessionStorage.getItem('ipAddress')}</h2>
            <h2>Port: {sessionStorage.getItem('port')}</h2>
            <button onClick={goBack}>Back</button>
        </div>
    )

}
export default Dashboard;