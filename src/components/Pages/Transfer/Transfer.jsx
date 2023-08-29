import { useState, useEffect } from 'react';
import './Transfer.css'

const recipients = [
  { id: 1, name: 'John Doe', accountNumber: '0000', balance: 3000 },
  { id: 2, name: 'Jane Smith', accountNumber: '1111', balance: 500 },
  { id: 3, name: 'Alice Johnson', accountNumber: '6969', balance: 10000 },
  // ... Add more mock recipients as needed
];

const columns = [
  { field: 'accountNumber', headerName: 'Account Number', flex: 1 },
  { field: 'name', headerName: 'Recipient Name', flex: 1 },
  { field: 'balance', headerName: 'Balance', flex: 1 },
];


const Transfer = ({ initialBalance, onTransfer }) => {
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(initialBalance);
  const [recipients, setRecipients] = useState([]);
  const [transferHistory, setTransferHistory] = useState([]);

   useEffect(() => {
    const savedRecipients = localStorage.getItem('recipients');
    if (savedRecipients) {
      setRecipients(JSON.parse(savedRecipients));
    }
    const savedBalance = localStorage.getItem('accountBalance');
    if (savedBalance) {
        setBalance(parseFloat(savedBalance));
    }
}, []);


  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    
    if (isNaN(amount) || amount <= 0) {
      setMessage('Transfer amount must be a valid positive number');
      return;   
    }

    if (amount > balance) {
      setMessage('Insufficient funds');
      return;
    }

    if (!selectedRecipient) {
      setMessage('Please select a recipient');
      return;
    }

    const selectedRecipientIndex = recipients.findIndex(
      (recipient) => recipient.name === selectedRecipient
    );

    if (selectedRecipientIndex === -1) {
      setMessage('Invalid recipient selected');
      return;
    }

    const newTransfer = {
      recipient: selectedRecipient,
      amount,
      date: new Date().toISOString(),
    };

    const selectedRecipientObject = recipients[selectedRecipientIndex];

    const newBalance = balance - amount;
    const updatedRecipientBalance = selectedRecipientObject.balance + amount;
    selectedRecipientObject.balance = updatedRecipientBalance;

     const updatedRecipients = [...recipients];
    updatedRecipients[selectedRecipientIndex] = selectedRecipientObject;
    localStorage.setItem('recipients', JSON.stringify(updatedRecipients))

    setTransferHistory([...transferHistory, newTransfer]);
    onTransfer(newBalance);
    setTransferAmount('');
    setSelectedRecipient('');
    setBalance(newBalance); 

    localStorage.setItem('accountBalance', newBalance.toString());
    setMessage(`Transferred $${amount} to ${selectedRecipient}`);
    console.log(localStorage)
  };

  return (
  <div className="transfer-container">
      <h2>Transfer Money</h2>
      <div className="recipient-selector">
        <label>Select Recipient:</label>
        <select
          value={selectedRecipient}
          onChange={(e) => setSelectedRecipient(e.target.value)}
        >
          <option value="">Select a recipient</option>
          {recipients.map((recipient) => (
            <option key={recipient.id} value={recipient.name}>
              {recipient.name}
            </option>
          ))}
        </select>
      </div>
      <div className="amount-input">
        <label>Transfer Amount:</label>
        <input
          type="number"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
      </div>
      <button onClick={handleTransfer}>Transfer</button>
      {message && <p className="message">{message}</p>}

      <div className="recipient-table">
        <h3>Recipient List</h3>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.field}>{column.headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient) => (
              <tr key={recipient.id}>
                {columns.map((column) => (
                  <td key={column.field}>{recipient[column.field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Transfer;
