import React from 'react';
import { ImUser } from 'react-icons/im';
import { IoListSharp } from 'react-icons/io5';
import { BiBuildingHouse } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';


function AccountNav() {
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];  //sometime string after '/' may empty thus, used (?.);
    if (subpage === undefined){
        subpage = 'profile';
    }
    function linkClasses(type = null) {
        let classes = 'd-inline-flex gap-1 rounded-pill align-items-center text-white txt_stitle py-2 px-5 text-decoration-none';
        if (type === subpage) {
            classes += ' bg-brand'
        }
        else {
            classes += ' bg-secondary'
        }
        return classes;
    }

    return (
        <>
            <nav className='w-100 my-4 justify-content-center gap-2 d-flex' >
                <Link className={linkClasses('profile')} to={'/account/'}><ImUser />My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}><IoListSharp />My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}><BiBuildingHouse />My accomodations</Link>
            </nav>
        </>
    )
}

export default AccountNav;