import { RegisterUsers } from "../interfaces/users.interface";

const BASE_URL = 'http://localhost:3000/server.api/'

export const AuthService = {
    logIn: async (email: string, password: string): Promise<boolean> => {
        const response = await fetch(BASE_URL + 'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if (!response.ok) throw new Error('Error al intentar login');
        const { access_token } = await response.json();
        sessionStorage.setItem('access_token', access_token);
        return true;
    },

    registerUser: async (newUser: RegisterUsers): Promise<void> => {
        const {name,email,password,phones} = newUser;
        const response = await fetch(BASE_URL + 'user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name, email, password, phones
            }),
        });
        const { token } = await response.json();
        sessionStorage.setItem('access_token', token);
        if (!response.ok) throw new Error('Error al registrar nuevo usuario');

    },
};