import axios from 'axios';
import { useEffect, useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
import '../styles/indexPage.css';
import { UserContext } from '../UserContext';

export default function IndexPage() {
    const { user } = useContext(UserContext);
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        })
        if(!user){
            alert("Login to proceed.");
        }
    }, []);



    return (
        <div className="container-fluid">
            <div className='mt-4 row g-4'>
                {places.length > 0 && places.map(place => (
                    <Link to={'/place/' + place._id} className='d-flex text-decoration-none flex-column col-6 col-md-4 col-lg-3'>
                        <div className='bg_lgrey rounded-2 mb-2' style={{ "height": "80%" }}>
                            {place.photos?.[0] && (
                                <img className='object-fit-fill h-100 img-fluid rounded-2' src={'http://localhost:8000/uploads/' + place.photos?.[0]} alt="" />
                            )}
                        </div>
                        <h6 className='txt_title mt-2 mb-0'>{place.address}</h6>
                        <h6 className='txt_stitle text-truncate'>{place.title}</h6>
                        <h6 className='txt_stitle mt-1'><span className='text-black font-weight-bolder'>₹{place.price}</span> per night </h6>
                    </Link>
                ))}
            </div>
        </div>
    );
}
