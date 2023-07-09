import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import AccountNav from '../AccountNav.js';
import PlaceImg from '../PlaceImg.js';

function PlacesPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.post('/user-placesList', { token: localStorage.getItem('token') }).then(({ data }) => {
            setPlaces(data);
        })
    }, [])

    return (
        <div className='container d-flex flex-wrap'>
            <AccountNav />
            <div className='m-auto text-center w-100'>
                <Link className='bg-brand d-inline-flex align-items-center gap-1 py-2 px-4 rounded-pill text-white text-decoration-none' to={'/account/places/new'}><AiOutlinePlus />
                    Add new Place</Link>
            </div>
            <div className='mt-4 gap-2 row'>
                {places.length > 0 && places.map(place => {
                    return (
                        <Link className='text-decoration-none' to={'/account/places/' + place._id}>
                            <div className='bg_lgrey curser_pointer gap-4 d-flex p-2 rounded-2' style={{ maxHeight: 250, overflow: 'scroll' }} >
                                <div className='w-25 p-0 sticky-top'>
                                    <PlaceImg place={place} />
                                </div>
                                <div className='shrink w-75'>
                                    <h5 className='txt_title bg_lgrey sticky-top'>{place.title}</h5>
                                    <p className='txt_body'>{place.description}</p>
                                </div>
                            </div>
                        </Link>)
                })}
            </div>
        </div>
    );
}

export default PlacesPage;