import React from 'react';
import { GrMapLocation } from 'react-icons/gr';

function AddressLink({ children, className = null }) {
    if (!className) {
        className = 'txt_stitle fs-5';
    }
    className += 'text-decoration-none gap-1 d-flex align-items-center';
    return (
        <a className={className} rel='noreferrer' target="_blank" href={"http://maps.google.com/?q=" + children}>
            {/* rel= "noreferrer" is added to prevent fishing in old browser */}
            <GrMapLocation />
            <u>{children}</u>
        </a>
    )
}

export default AddressLink