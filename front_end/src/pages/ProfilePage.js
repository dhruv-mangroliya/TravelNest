import React, { useContext, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { UserContext } from '../UserContext';
import PlacesPage from './PlacesPage';

function ProfilePage() {
    const { user, ready, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let { subpage } = useParams();

    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        localStorage.clear();
        setRedirect('/');
        setUser(null);
    }



    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (!ready && !user) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }


    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className='w-50 text-center mx-auto'>
                    Logged in as a {user.name} ({user.email}) <br />
                    <button onClick={logout} className='btn-primary mt-2 py-2 px-5 w-25 rounded-pill'>Logout</button>
                </div>
            )}
            {subpage === 'places' && <PlacesPage />}
        </div>
    )
}

export default ProfilePage;