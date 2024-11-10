import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {LoginRequestInterface, LoginResponseInterface, UserInterface} from "../../interfaces/user.interface.tsx";
import ApiManager from "../../services/api-manager.tsx";
import ipManager from "../../services/ip-manager.tsx";


const LoginPage = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const register = async () => {

        const registerDto: UserInterface = {
            username: username,
            password: password,
        }
        try {
            await ApiManager.register(registerDto);
        } catch (error) {
            console.log(error);
        }
    }

    const login = async () => {
        const ip = await ipManager.getIp();
        const port = window.location.port;
        const loginDto: LoginRequestInterface = {
            username: username,
            password: password,
            ipAddress: ip,
            port: port
        }
        try {
            const response: LoginResponseInterface = await ApiManager.login(loginDto);
            sessionStorage.setItem('token', response.token)
            sessionStorage.setItem('username', response.username)
            sessionStorage.setItem('ipAddress', response.ip)
            sessionStorage.setItem('port', response.port)
            navigate('main')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <br/>
            <div className={'inputContainer'}>
                <input
                    value={username}
                    placeholder="Enter your email here"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br/>
            <div className={'inputContainer'}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br/>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={login} value={'Log in'}/>
            </div>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={register} value={'Register'}/>
            </div>
        </div>
    )
}

export default LoginPage