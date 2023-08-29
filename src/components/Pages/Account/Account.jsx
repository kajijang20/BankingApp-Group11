import React, { useState, useEffect } from 'react';
import './Account.css'; // Import your CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Account = () => {
    const [balance, setBalance] = useState(8000);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const savedBalance = localStorage.getItem('accountBalance');
        if (savedBalance) {
            setBalance(parseFloat(savedBalance));
        }

        const savedTransactions = JSON.parse(localStorage.getItem('transactionHistory'));
        if (savedTransactions) {
            setTransactions(savedTransactions);
        }
    }, []);
    
    return (
        <div className="account-card">
            <div className="card-header">
                <h2>Account Overview</h2>
            </div>
            <div className="card-content">
                <p>Your current balance is: ${balance}</p>
                <h3>Transaction History</h3>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.description}</td>
                                <td>${transaction.amount}</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
