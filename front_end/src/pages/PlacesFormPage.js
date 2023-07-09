import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../AccountNav.js';
import PerksPage from '../PerksPage.js';
import PhotosUploader from '../PhotosUploader.js';

function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [price, setPrice] = useState(1000);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className='fs-5 mt-4 txt_title '>{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className='txt_stitle fs-6'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            price, addedPhotos, maxGuests, checkOut,
            checkIn, extraInfo, perks,
            description, address, title
        };
        if (id) {
            await axios.put('/places', {
                id,
                token: localStorage.getItem('token'),
                ...placeData,
            });
            setRedirect(true);
        } else {
            await axios.post('/places', {
                token: localStorage.getItem('token'),
                ...placeData,
            });
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div className='container'>
            <AccountNav />
            <form className='d-flex flex-column w-100' onSubmit={savePlace}>

                {preInput('Title', 'Title for your place should be short and catchy')}
                <input className='p-2' type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title, "My lovely House' name="" id="" />

                {preInput('Address', 'Address to your place')}
                <input className='p-2' type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='Address' name="" id="" />

                {preInput('Photos', 'More is better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'Description of your place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} name="" id="" cols="30" rows="10"></textarea>

                {preInput('Perks', 'Select all the perks of your place')}
                <div className='d-flex w-100 flex-wrap gap-2 mt-2'>
                    <PerksPage selected={perks} onChange={setPerks} />
                </div>

                {preInput('Extra Info', 'House rules, etc')}
                <textarea value={extraInfo} rows='10' onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Check in/out Times, Max Guest', 'Add time for Check in and out, also consider the time window for cleaning the place between guests')}
                <div className='d-flex gap-2'>
                    <div className='col-3'>
                        <h6 className='mt-2 txt_stitle'>Check in time</h6>
                        <input className='p-2' type="text"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder='14' />
                    </div>
                    <div className='col-3'>
                        <h6 className='mt-2 txt_stitle'>Check out time</h6>
                        <input className='p-2' type="text"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder='13' />
                    </div>
                    <div className='col-3'>
                        <h6 className='mt-2 txt_stitle'>Maximum Guests allowed</h6>
                        <input
                            className='p-2'
                            type='number'
                            value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div className='col-3'>
                        <h6 className='mt-2 txt_stitle'>Price per night</h6>
                        <input
                            className='p-2'
                            type='number'
                            value={price}
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <div>
                    <button className='btn-primary py-2 my-4 w-100'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage;