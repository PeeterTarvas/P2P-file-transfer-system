import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [emailError, setEmailError] = useState('')
    //const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

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
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'}/>
            </div>
        </div>
    )
}

export default Login