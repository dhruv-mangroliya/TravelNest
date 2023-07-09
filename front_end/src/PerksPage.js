import React from 'react';
import { FaCarSide } from 'react-icons/fa';
import { BsWifi } from 'react-icons/bs';
import { BsDisplay } from 'react-icons/bs';
import { GiSittingDog } from 'react-icons/gi';
import { GiPocketRadio } from 'react-icons/gi';
import { BsDoorClosedFill } from 'react-icons/bs';

function PerksPage({ selected, onChange }) {

    function handleCbClick(ev) {
        const { checked, name } = ev.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter((selectedName) => selectedName !== name)])
        }
    }

    return (
        <>
            <label className='col-12 col-md-6 col-lg-3 border p-4 d-flex gap-2 align-items-center curser_pointer user-select-none rounded-2'>
                <input type="checkbox" checked={selected.includes("wifi")} onChange={handleCbClick} name="wifi" id="" />
                <BsWifi />
                <span>Wifi</span>
            </label>
            <label className='col-12 col-md-6 col-lg-3 border p-4 d-flex gap-2 align-items-center curser_pointer user-select-none rounded-2'>
                <input type="checkbox" checked={selected.includes("parking")} onChange={handleCbClick} name="parking" id="" />
                <FaCarSide />
                <span>Free parking spot</span>
            </label>
            <label className='col-12 col-md-6 col-lg-3 border p-4 d-flex gap-2 align-items-center curser_pointer user-select-none rounded-2'>
                <input type="checkbox" checked={selected.includes("tv")} onChange={handleCbClick} name="tv" id="" />
                <BsDisplay />
                <span>TV</span>
            </label>
            <label className='col-12 col-md-6 col-lg-3 border p-4 d-flex gap-2 align-items-center curser_pointer user-select-none rounded-2'>
                <input type="checkbox" checked={selected.includes("pets")} onChange={handleCbClick} name="pets" id="" />
                <GiSittingDog />
                <span>Pets</span>
            </label>
            <label className='col-12 col-md-6 col-lg-3 border p-4 d-flex gap-2 align-items-center curser_pointer user-select-none rounded-2'>
                <input type="checkbox" checked={selected.includes("entrance")} onChange={handleCbClick} name="entrance" id="" />
                <BsDoorClosedFill />
                <span>Private entrance</span>
            </label>
            <label className='col-12 col-md-6 col-lg-3 border p-4 d-flex gap-2 align-items-center curser_pointer user-select-none rounded-2'>
                <input type="checkbox" checked={selected.includes("radio")} onChange={handleCbClick} name="radio" id="" />
                <GiPocketRadio />
                <span>Radio</span>
            </label>
        </>
    )
}

export default PerksPage;