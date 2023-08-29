import React, { useState, useEffect } from 'react';
import './Account.css'; // Import your CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Account = () => {
    const [balance, setBalance] = useState(8000);

    useEffect(() => {
        const savedBalance = localStorage.getItem('accountBalance');
        if (savedBalance) {
            setBalance(parseFloat(savedBalance));
        }
    }, []);

    return (
        <div className="account-card">
            <div className="card-header">
                <h2>Account Balance</h2>
            </div>
            <div className="card-content">
                <p>Your current balance is: ${balance}</p>
            </div>
            <div className="card-footer">
                <Link to="/dashboard" className="styled-link">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Account;
