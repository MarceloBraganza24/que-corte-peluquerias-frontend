import {React, useState} from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const Payment = () => {
    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago('TEST-a786faa2-2541-48f9-b7ff-ae12a4cda1c9', {
        locale: 'es-AR'
    });

    const pagarTurno = async () => {
        try {
            const order = {
                title: document.getElementById('title').innerText,
                quantity: 1,
                unit_price: document.getElementById('price').innerText,
            }
            const preference = await fetch('http://localhost:8081/api/payments/create-preference', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            const response = await preference.json();
            const id = response.id;
            return id;
        } catch (error) {
            console.log(error)
        }
    };
    const handleBuy = async () => {
        const id = await pagarTurno();
        if(id) setPreferenceId(id);
    };

  return (
    <>
        <h3 id='title'>Turno caballero</h3>
        <h3 id='price'>3000</h3>
        <button onClick={handleBuy}>Pagar turno</button>
        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
    </>
  )
}

export default Payment