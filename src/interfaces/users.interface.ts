export interface User {
    user_id: string;
    name: string;
    email: string;
    phones: Phones[];
    created: string;
    modified: string;
    last_login: string;
    token: string;
    isActive: boolean;
}

export interface Phones {
    number: number;
    citycode: number;
    countrycode: number;
}

export interface RegisterUsers {
    name: string;
    email: string;
    password: string;
    phones: Phones[];
}

export interface UserResponse {
    user_id: string;
    created: string;
    isActive: boolean;
    last_login: string;
    modified: string;
    token: string;
}
