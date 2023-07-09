import '../styles/login.css';
import { Link, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handlelogin(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data.userDoc);
            localStorage.setItem('token', data.token);
            alert('Login Successful');
            setRedirect(true);
        } catch (error) {
            alert('Login Failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }
    return (
        <div className="position-relative vh-100">
            <div className="position-absolute translate-middle top-50 start-50 col-lg-4 col-md-6 col-sm-12">
                <h1 className="text-dark mb-2 text-center">Login</h1>
                <form
                    className="d-flex flex-column align-items-center"
                    onSubmit={handlelogin}
                >
                    <input
                        className="w-100 border rounded-4 py-2 px-3 my-2"
                        type="email"
                        placeholder="Enter Email"
                        id="email"
                        value={email}
                        onChange={(ev) => {
                            setEmail(ev.target.value);
                        }}
                    />
                    <input
                        className="w-100 border rounded-4 py-2 px-3 my-2"
                        type="password"
                        placeholder="Enter password"
                        id="pass1"
                        value={password}
                        onChange={(ev) => {
                            setPassword(ev.target.value);
                        }}
                    />
                    <button className="w-100 fs-5 btn-primary py-2 px-3 my-4 rounded">
                        Login
                    </button>
                    <div className="d-flex flex-column text-center">
                        Don't have an account yet?
                        <Link className="txt_brand text-decoration-none" to={'/register'}>
                            Register Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
