import { BASE_URL } from "@/config";

enum UserType {
    Admin = 0,
    Regular = 1,
    Guest = 2,
}

interface User {
    name: string,
    pass: string
    email: string,
    user_type: UserType
}

export async function fetchAllUsers() {
    const response = await fetch(`${BASE_URL}/user/all`);
    
    if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
    }
    
    return response;
}

export async function getUser(id: number) {
    const response = await fetch(`${BASE_URL}/user/${id}`);
    
    if (!response.ok) {
        throw new Error('Error al obtener el usuario');
    }
    
    return response;
}

export async function addUser(user: User) {
    const response = await fetch(`${BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    
    if (!response.ok) {
        throw new Error('Error al agregar el usuario');
    }
    
    return response;
}

export async function loginUser(user: User) {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    
    if (!response.ok) {
        throw new Error('Error al iniciar sesión');
    }
    
    return response;
}