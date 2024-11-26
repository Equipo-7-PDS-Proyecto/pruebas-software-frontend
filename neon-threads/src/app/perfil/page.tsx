"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

export default function UserProfilePage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Controla si está en modo edición
    const userId = "6730092a1beaa61e0c40cb3f"; // Cambia esto a la ID del usuario que obtuviste al iniciar sesión

    // Carga inicial de los datos del usuario (nombre y correo)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://3.147.32.9/api/user/${userId}`);
                const data = await response.json();
                if (data.status === 200) {
                    setName(data.message.name);
                    setEmail(data.message.email);
                    setAddress(data.message.address || '');
                    setPhoneNumber(data.message.phone_number || '');
                }
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, []);

    // Función para guardar el perfil actualizado
    const handleSaveProfile = async () => {
        try {
            const response = await fetch(`https://3.147.32.9/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    address,
                    phone_number: phoneNumber,
                }),
            });

            const data = await response.json();
            if (data.status === 200) {

                setIsEditing(false); // Salir del modo edición después de guardar
            } else {
                alert('Error al guardar el perfil');
            }
        } catch (error) {
            console.error("Error al guardar el perfil:", error);
            alert('Error de conexión con el servidor');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Navbar userType={0}/>
            <main className="flex-grow container mx-auto py-12">
                <h1 className="text-4xl font-bold mb-6">Perfil de Usuario</h1>
                <div className="mb-6 max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveProfile();
                        }}
                    >
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Nombre</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={!isEditing} // Solo editable en modo edición
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Dirección</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Número de Teléfono</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Gmail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="flex justify-end">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)} // Botón para cancelar la edición
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Guardar
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)} // Botón para activar la edición
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Editar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </main>
            <footer className="bg-gray-800 text-white py-6 mt-auto">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Neon Threads. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
