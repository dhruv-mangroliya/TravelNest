import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(()=>{
        if (user){
            setName(user.name)
        }
    },[user])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        if(!user){
            setRedirect('/login');
        }else{
            const response = await axios.post('/bookings', {
                checkIn, checkOut, numberOfGuests, name, phone,
                token: localStorage.getItem('token'),
                place: place._id,
                price: numberOfNights * place.price
            });
            const bookingId = response.data._id;
            setRedirect(`/account/bookings/${bookingId}`);
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <div className="bg-white shadow px-4 py-4 rounded-2">
                <h4 className='text-center'>Price: {place.price} / per night</h4>
                <div className="border rounded-3 mt-4">
                    <div className="d-flex">
                        <div className='py-3 px-3'>
                            <label className='ps-2 mb-2'>Check in:</label>
                            <input type="date"
                                value={checkIn}
                                onChange={ev => setCheckIn(ev.target.value)}
                                className='p-2 border-0' />
                        </div>
                        <div className='py-3 px-3 border-start'>
                            <label className='ps-2 mb-2'>Check out:</label>
                            <input type="date"
                                value={checkOut}
                                onChange={ev => { setCheckOut(ev.target.value); console.log(checkOut) }}
                                className='p-2 border-0' />
                        </div>
                    </div>
                    <div className='py-3 px-3 border-top'>
                        <label className='ps-2 mb-2'>Number of guests:</label>
                        <input className='p-2'
                            value={numberOfGuests}
                            onChange={ev => setNumberOfGuests(ev.target.value)} type="number" />
                    </div>
                    {numberOfNights > 0 && (
                        <div className='py-3 px-3 border-top'>
                            <label className='ps-2 mb-2'>Your full name:</label>
                            <input className='p-2'
                                value={name}
                                onChange={ev => setName(ev.target.value)} type="text" />
                            <label className='ps-2 pt-2 mb-2'>Contact no:</label>
                            <input className='p-2'
                                value={phone}
                                onChange={ev => setPhone(ev.target.value)} type="tel" />
                        </div>
                    )}
                </div>
                <button onClick={bookThisPlace} className='btn-primary mt-4 w-100 px-3 py-2 fs-5'>
                    Book this place
                    {numberOfNights > 0 && (
                        <span>₹ {numberOfNights * place.price}</span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default BookingWidget