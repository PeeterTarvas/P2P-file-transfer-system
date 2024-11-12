interface UserInterface {
    username: string,
    password: string,
    peerId: string
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