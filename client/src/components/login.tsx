import {useState} from 'react'
//import {useNavigate} from 'react-router-dom'
import ApiManager from '../utils/api-manager.tsx'
import {UserInterface} from "../interfaces/user.interface.tsx";





const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const register = () => {

        const registerDto: UserInterface = {
            username: username,
            password: password,
        }
        try {
            ApiManager.register(registerDto).then(res => console.log(res));
        } catch (error) {
            console.log(error);
        }
    }
    //const navigate = useNavigate()

    const onButtonClick = () => {
        // You'll update this function later...
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
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'}/>
            </div>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={register} value={'Register'}/>
            </div>
        </div>
    )
}

export default Login