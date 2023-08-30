
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
      const [loggedInUser, setLoggedInUser] = useState('');

    useEffect(() => {userRef.current.focus();},[])

    useEffect(() => {setErrMsg('');},[user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};
        if (!storedUserData[user] || storedUserData[user] !== pwd) {
            setErrMsg('Invalid username or password');
            return;
        }

        setUser('');
        setPwd('');
        setLoggedInUser(user);
        setSuccess(true);

        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

  return (
    <>  {success ? (
            <section className= 'login-notif'>
                <h1>Welcome, {loggedInUser}!</h1>
                <br />
            </section>
            ) : (
    
            <section className= 'login-section'>

                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                <h1>Log In</h1>

                <form onSubmit={handleSubmit} className='login-form'>
                     <label htmlFor="username" className='login-labels'>Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            className='login-interface'
                        />

                        <label htmlFor="password" className='login-labels'>Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className='login-interface'
                        />
                        <button className='login-button'>Log In</button>
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