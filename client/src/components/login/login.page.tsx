import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Peer from 'peerjs';
import {LoginRequestInterface, LoginResponseInterface, UserInterface} from "../../interfaces/user.interface.tsx";
import ApiManager from "../../services/api-manager.tsx";
import ipManager from "../../services/ip-manager.tsx";
import {getUsernameFromSession} from "../../utils/session-storage.tsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    var isOnline = true;
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const sessionUsername = getUsernameFromSession()


    useEffect(() => {
        if (sessionUsername) {
            return navigate('/main')
        }
    }, [sessionUsername, navigate])

    const register = async () => {

        if (username === '' || password === '') {
            setError('Please fill in all fields')
            return
        }
        const peer = new Peer();

        peer.on('open', async (peerId) => {
            console.log('Generated Peer ID:', peerId);

            const registerDto: UserInterface = {
                username: username,
                password: password,
                peerId: peerId,
                isOnline: true,
            };

            try {
                await ApiManager.register(registerDto);
                console.log(`User registered with peerId: ${peerId}, isOnline: ${isOnline}`);
            } catch (error) {
                setError('That username is already taken')
                console.log(error);
            } finally {
                peer.disconnect();
            }
        });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const login = async () => {
        if (username === '' || password === '') {
            setError('Please fill in all fields')
            return
        }

        const ip = await ipManager.getIp();
        const port = window.location.port;
        const loginDto: LoginRequestInterface = {
            username: username,
            password: password,
            isOnline: true,
            ipAddress: ip,
            port: port
        };

        try {
            const response: LoginResponseInterface = await ApiManager.login(loginDto);
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('username', response.username);
            if (response.peerId) sessionStorage.setItem('peerId', response.peerId);
            sessionStorage.setItem('isOnline', "true");
            navigate('main');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <br/>
            <div className={'inputContainer'}>
                <input
                    value={username}
                    placeholder="Username"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br/>
            <div className={'inputContainer'}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="Password"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <div className={'checkboxContainer'}>
                <input type="checkbox" onClick={toggleShowPassword}/>
                <label>Show password</label>
            </div>
            <br/>

            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={login} value={'Log in'}/>
            </div>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={register} value={'Register'}/>
            </div>
            <div className={'errorContainer'}>
                {error}
            </div>
        </div>
    );
};

export default LoginPage;
