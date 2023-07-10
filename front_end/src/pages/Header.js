import '../styles/header.css';
import logo from '../assets/nest.jpg';
import { GoSearch } from 'react-icons/go';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RiUser3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Header() {
    const { user } = useContext(UserContext);
    return (
        <>
            <header>
                <div className="container align-items-center header d-flex justify-content-between">
                    <div className="h-100">
                        <Link
                            to={"/"}
                            className="align-items-center text-decoration-none d-flex h-100 logo1"
                        >
                            <img className="p-1" src={logo} alt="" />
                            <span className="txt_brand fs-2">TravelNest</span>
                        </Link>
                    </div>
                    <div className="d-flex border align-items-center gap-2 border-2 rounded-pill h-75 ps-3 pe-1 py-1 shadow-sm">
                        <div className="font-weight-bold txt_stitle">Anywhere</div>
                        <div className="border mx-2 saparator border-left"></div>
                        <div className="font-weight-bold txt_stitle">Anyweek</div>
                        <div className="border saparator mx-2 border-left"></div>
                        <div className="txt_stitle">
                            Add guest
                            <button className="p-2 border-0 bg-brand ms-2 rounded-pill">
                                <GoSearch className="fs-5 mx-1 text-white" />
                            </button>
                        </div>
                    </div>
                    <div className="d-flex p-0 m-0">
                        <Link to={user ? '/account' : '/login'} className="d-flex flex-row text-decoration-none flex-nowrap align-items-center border h-75 border-2 rounded-pill ps-3 py-1 pe-2">
                            <RxHamburgerMenu className="fs-4 txt_stitle" />
                            <button className="px-2 ms-2 py-1 rounded-pill">
                                <RiUser3Line className="fs-5" />
                            </button>
                            {!!user && (
                                <span className='p-2 m-0 txt_stitle fs-6'>
                                    {user.name}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
