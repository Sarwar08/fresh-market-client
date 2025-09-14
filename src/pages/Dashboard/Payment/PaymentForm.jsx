import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const { cartId } = useParams();
    console.log(cartId);

    const { user } = useAuth();

    const [error, setError] = useState('');

    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();

    const { data: cartInfo, isPending } = useQuery({
        queryKey: ['carts', cartId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${cartId}`);
            return res.data;
        }
    })

    if (isPending) {
        return <Loading />;
    }

    const amount = cartInfo.totalPrice;
    const amountInCents = amount * 100;
    console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            console.log('payment method', paymentMethod);
        }

        // step-2: create payment intent
        const res = await axiosSecure.post(`/create-payment-intent`, {
            amountInCents,
            cartId,
        })

        const clientSecret = res.data.clientSecret;
        console.log(clientSecret);

        // step-3: confirm payment 
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                }
            }
        })

        if (result.error) {
            console.log(result.error.message);
            setError(result.error.message);
        }
        else {
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment Succeeded.');
                console.log(result);

                // step-4: mark paid also create payment history
                const paymentData = {
                    cartId,
                    email: user.email,
                    amount,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    transactionId: result.paymentIntent.id,
                }

                console.log(paymentData);

                const paymentRes = await axiosSecure.post('/payments', paymentData);

                if (paymentRes.data.insertedId) {
                    console.log('Payment successfull');
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your payment has been Successfully completed.",
                        color: "#fff",
                        background: "#006600",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/myOrders');
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-orange-200 rounded-xl max-w-md w-full shadow-md mx-auto p-6'>
                <CardElement className='p-2 border border-rose-600 rounded'>

                </CardElement>
                <button type='submit' disabled={!stripe} className='btn btn-primary w-full'>
                    Pay {amount} BDT
                </button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
    )
}

export default PaymentForm