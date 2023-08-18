import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {userRef.current.focus();},[])

    useEffect(() => {setErrMsg('');},[user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
        setTimeout(() => {
            navigate('/dashboard');
            }, 2000);
    }
  return (
    <>  {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                         <a href="/dashboard">Go to Dashboard</a>
                    </p>
                </section>
            ) : (
    
            <section>

                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                <h1>Log In</h1>

                <form onSubmit={handleSubmit}>
                     <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                </form>
                <p>
                    Need an Account? <br />
                    <span className='line'></span>
                     <Link to="/SignUp">Sign Up</Link>
                </p>

            </section>

        )
            }
            </>
  )
}

export default Login