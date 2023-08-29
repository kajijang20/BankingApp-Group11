import { useState, useEffect } from 'react';
import './Deposit.css';

const Deposit = ({ initialBalance, onDeposit }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(initialBalance);

  useEffect(() => {
    const savedBalance = localStorage.getItem('accountBalance');
    if (savedBalance !== null) {
      setBalance(parseFloat(savedBalance));
    }
  }, []);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);

    if (isNaN(amount) || amount <= 0) {
      setMessage('Invalid deposit amount');
    } else {
      const newBalance = balance + amount;
      setBalance(newBalance);
      onDeposit(amount);
      setDepositAmount('');
      setMessage(`Deposited $${amount.toFixed(2)} successfully!`);
      localStorage.setItem('accountBalance', newBalance.toFixed(2));
    }
  };

  return (
    <div className="deposit-container">
      <h1>Deposit</h1>

      <div className="deposit-form">
        <input
          type="number"
          placeholder="Enter deposit amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="deposit-input"
        />
      </div>
        <button className="deposit-button" onClick={handleDeposit}>Deposit</button>

      {message && <p className={`deposit-message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
};

export default Deposit;
