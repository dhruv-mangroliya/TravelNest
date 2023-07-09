import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import AddressLink from '../AddressLink';

function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return "";

    

    return (
        <div className='mt-4 container-fluid'>
            <div className='d-block p-2 bg-light pb-0'>
                <h2>{place.title}</h2>
                <AddressLink>{place.address}</AddressLink>
                <PlaceGallery place={place}/>                
                <div className='row mt-4 mb-5 g-4'>
                    <div className='col-md-8 col-12'>
                        <div className='mt-4'>
                            <h4 className='font-weight-bold txt_title '>Description</h4>
                            {place.description}
                        </div>
                        <div className='my-3'>
                            Check-in: {place.checkIn} <br />
                            Check-out: {place.checkOut}<br />
                            Max number of guests: {place.maxGuests}
                        </div>
                    </div>
                    <div className='col-md-4 col-12 d-flex'>
                        <BookingWidget place={place} />
                    </div>
                </div>
                <div className="bg-white border-top p-2">
                    <div>
                        <h4 className='font-weight-bold txt_title '>Extra Info</h4>
                    </div>
                    <div className='mb-4 text-secondary lh-sm'>{place.extraInfo}</div>
                </div>
            </div>
        </div>
    )
}

export default PlacePage;