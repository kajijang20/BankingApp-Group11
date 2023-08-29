import { useState } from 'react';
import './Withdraw.css'; // Import the CSS file

const Withdraw = ({ initialBalance, onWithdraw }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount) || amount <= 0) {
      setMessage('Withdrawal amount must be a valid positive number');
    } else if (amount > initialBalance) {
      setMessage('Insufficient funds');
    } else {
      onWithdraw(amount);
      setWithdrawAmount('');
      setMessage(`Successfully withdrawn $${amount.toFixed(2)}`);
    }
  };

  return (
    <div className="withdraw-container">
        
      <h3 className="withdraw-heading">Withdraw</h3>
      <input
        type="number"
        placeholder="Enter amount"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        className="withdraw-input"
      />
      <button className="withdraw-button" onClick={handleWithdraw}>
        Withdraw
      </button>
      {message && (
        <p className={`withdraw-message ${message.includes('Successfully') ? 'withdraw-success' : 'withdraw-error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Withdraw;
