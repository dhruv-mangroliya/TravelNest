import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './pages/Layout';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

axios.defaults.baseURL = 'http://localhost:8000';

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<ProfilePage />} />
                    <Route path="/account/places" element={<PlacesPage />} />
                    <Route path="/account/places/new" element={<PlacesFormPage />} />
                    <Route path="/account/places/:id" element={<PlacesFormPage />} />
                    <Route path="/place/:id" element={<PlacePage />} />
                    <Route path="/account/bookings" element={<BookingsPage/>}/>
                    <Route path="/account/bookings/:id" element={<BookingPage/>}/>
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
