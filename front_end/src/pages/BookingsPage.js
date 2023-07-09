import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav';
import PlaceImg from '../PlaceImg';
import { IoCalendar } from "react-icons/io5";
import { BsFillMoonFill } from "react-icons/bs";
import { BsCreditCardFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.post('/bookingsList', { token: localStorage.getItem('token') })
            .then(response => {
                setBookings(response.data);
            });
    }, []);
    return (
        <div className='container-fluid'>
            <AccountNav />
            <div className='row g-3'>
                {bookings?.length > 0 && (bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} className=' d-flex text-decoration-none' >
                        <div className="text-decoration-none col-12 col-md-6 d-flex gap-3 rounded-2 overflow-hidden bg_lgrey ">
                            <div className='w-50 rounded-1 overflow-hidden'>
                                <PlaceImg className={'object-fit-fill w-100 h-100'} place={booking.place} />
                            </div>
                            <div className='p-3 d-flex flex-column justify-content-between'>
                                <h4 className='txt_title'>{booking.place.title}</h4>
                                <div className='d-flex txt_stitle justify-content-between flex-wrap border-top border-dark py-2'>
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
                                <div className='d-flex txt_body fs-5 flex-wrap gap-1 align-items-center'>
                                    <BsCreditCardFill />
                                    Total price: <b>₹ {booking.price}</b>
                                </div>
                            </div>
                        </div>

                    </Link>
                )))}
            </div>
        </div>
    )
}

export default BookingsPage;