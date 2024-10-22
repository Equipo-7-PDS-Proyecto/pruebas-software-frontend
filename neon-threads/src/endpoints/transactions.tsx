import { BASE_URL } from "@/config";

interface Transaction {
    user_id: number,
    cart: {
        clothe_id: number,
        quantity: number,
        amount: number
    }
}

export async function transaction(transaction: Transaction) {
    const response = await fetch(`${BASE_URL}/transaction/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    });
    
    if (!response.ok) {
        throw new Error('Error al realizar la transacción');
    }
    
    return response;
}