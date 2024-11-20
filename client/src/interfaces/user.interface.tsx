interface UserInterface {
    username: string,
    password: string,
    peerId: string,
    isOnline: boolean
}

interface LoginRequestInterface extends UserInterface {
    ipAddress: string,
    port: string,
}

interface LoginResponseInterface extends UserInterface {
    ip: string,
    port: string,
    token: string
}

export type {UserInterface, LoginRequestInterface, LoginResponseInterface};