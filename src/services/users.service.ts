import { User } from "../interfaces/users.interface";

const BASE_URL = 'http://localhost:3000/server.api/user'

export const UserService = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) throw new Error('Error al obtener los usuarios');
        return await response.json();
    },

    deleteUserById: async (user_id: string): Promise<void> => {
        const token = sessionStorage.getItem('access_token');
        const response = await fetch(BASE_URL + `/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
        });
        if (!response.ok) throw new Error();
        const user_token = await response.json();
        if (token === user_token.token) {
            sessionStorage.removeItem('access_token');
        } 

    }
}