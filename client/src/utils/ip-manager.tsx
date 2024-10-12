

const getIp = async () => {

    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()
    // Set the IP address to the constant `ip`
    console.log(data.ip)
    return data.ip;
}

export default {getIp};