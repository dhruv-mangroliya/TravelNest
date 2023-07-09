import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../AddressLink';
import PlaceGallery from '../PlaceGallery';
import { differenceInCalendarDays, format } from 'date-fns';

import { IoCalendar } from "react-icons/io5";
import { BsFillMoonFill } from "react-icons/bs";


function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios.post('/bookingsList', { token: localStorage.getItem('token') }).then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            })
        }
    }, []);

    if (!booking) {
        return '';
    }
    return (
        <div className='my-5'>
            <h4>{booking.place.title}</h4>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className="bg_lgrey d-flex justify-content-between p-4 mt-4 rounded-2">
                <div className='d-flex flex-column justify-content-center gap-1'>
                    <h4>Your booking information:</h4>
                    <div className='d-flex txt_stitle flex-wrap py-2 gap-2'>
                        <span className='d-flex gap-1 align-items-center'>
                            <BsFillMoonFill />
                            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights:
                        </span>
                        <span className='d-flex gap-2 flex-wrap'>
                            <span className='d-flex gap-1 align-items-center '>
                                <IoCalendar />
                                <b>{format(new Date(booking.checkIn), 'dd-MM-yyyy')}</b>
                            </span>
                            &rarr;
                            {/* right arrow */}
                            <span className='d-flex gap-1 align-items-center '>
                                <IoCalendar />
                                <b>{format(new Date(booking.checkOut), 'dd-MM-yyyy')}</b>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='d-flex text-light bg-secondary rounded-2 p-4 flex-column justify-content-center gap-1 align-items-center'>
                    <span>Total Price:</span>
                    <span className='fs-4'><b>₹{booking.price}</b></span>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}

export default BookingPage