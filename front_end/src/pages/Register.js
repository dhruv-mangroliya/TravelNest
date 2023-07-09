import '../styles/register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function regUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });

      alert('Registration Successful');
    } catch (error) {
        alert("Registration failed");
    }
  }

  return (
    <div className="position-relative vh-100">
      <div className="position-absolute translate-middle top-50 start-50 col-lg-4 col-md-6 col-sm-12">
        <h1 className="text-dark mb-2 text-center">Register</h1>
        <form
          className="d-flex flex-column align-items-center"
          onSubmit={regUser}
        >
          <input
            className="w-100 border rounded-4 py-2 px-3 my-2"
            type="text"
            placeholder="Enter your Name"
            id="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            className="w-100 border rounded-4 py-2 px-3 my-2"
            type="email"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            className="w-100 border rounded-4 py-2 px-3 my-2"
            type="password"
            placeholder="Enter password"
            id="pass1"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="w-100 fs-5 btn-primary py-2 px-3 my-4 rounded">
            Register
          </button>
          <div className="d-flex flex-column text-center">
            Already a member?
            <Link className="txt_brand text-decoration-none" to={'/login'}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
