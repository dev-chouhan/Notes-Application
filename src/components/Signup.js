import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword:""});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("https://notes-application-7he3.onrender.com/api/auth/createuser",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
        });
        const json = await response.json();
        console.log(json);
        // save the authToken and redirect and here is no need to check for correct credeintials;
        if(json.success){
            localStorage.setItem("auth-token", json.authToken);
            navigate('/');
            props.showAlert("Successfully Signed In", "success");
        } else {
            props.showAlert("Invalid Crediantials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container mt-3'> 
            <h1>Sign Up here...</h1> <br /><br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input onChange={onChange} type="name" name='name' className="form-control" id="name"required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" name='password' className="form-control" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input onChange={onChange} type="password" name='cpassword' className="form-control" id="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
