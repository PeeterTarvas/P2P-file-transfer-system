import {useEffect, useState} from 'react'


const ipManager = () => {


    const [ip, setIp] = useState('');

    const getIp = async () => {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        // Set the IP address to the constant `ip`
        console.log(data.ip)
        setIp(data.ip)
    }

    useEffect(() => {
        getIp();
        sessionStorage.setItem('ip', ip)

    }, [])

    return ip;
}

export default {ipManager};