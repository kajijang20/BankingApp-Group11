import {useState} from 'react'
import { Route, BrowserRouter, Routes,} from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard';
import Account from './components/Pages/Account/Account'
import Withdraw from './components/Pages/Withdraw/Withdraw'
import Deposit from './components/Pages/Deposit/Deposit'
import Transfer from './components/Pages/Transfer/Transfer'
import Budget from './components/Pages/Budget/Budget'

function App() {
  const storedBalance = localStorage.getItem('accountBalance');
  const [balance, setBalance] = useState(storedBalance ? parseFloat(storedBalance) : 5000);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleWithdraw = (amount) => {
    const newBalance = balance - amount; 

    if (newBalance < 0) {
      setMessage('Insufficient funds');
    } else {
      setBalance(newBalance); 

      const newTransaction = {
        type: 'Withdrawal',
        amount: amount,
        date: new Date().toLocaleString(),
        description: 'Withdrawal'
      };
      setTransactionHistory([...transactionHistory, newTransaction]);

      updateLocalStorage(newBalance, newTransaction);
    }
  };

  const handleDeposit = (amount) => {
    const newBalance = balance + amount; 
    setBalance(newBalance);

    const newTransaction = {
      type: 'Deposit',
      amount: amount,
      date: new Date().toLocaleString(),
      description: 'Deposit'
    };
    setTransactionHistory([...transactionHistory, newTransaction]);

    updateLocalStorage(newBalance, newTransaction);
  };

  const handleTransfer = (newBalance, transferAmount, selectedRecipient) => {
    const parsedTransferAmount = parseFloat(transferAmount);

    const transferDescription = `Transferred $${parsedTransferAmount.toFixed(2)} to ${selectedRecipient}`;

    const newTransaction = {
      type: 'Transfer',
      amount: parsedTransferAmount,
      date: new Date().toLocaleString(),
      description: transferDescription,
    };

    setBalance(newBalance);
    setTransactionHistory(prevTransactionHistory => [...prevTransactionHistory, newTransaction]);

    updateLocalStorage(newBalance, newTransaction);
  };

  const updateLocalStorage = (updatedBalance, newTransaction) => {
    localStorage.setItem('accountBalance', updatedBalance.toFixed(2));
    localStorage.setItem('transactionHistory', JSON.stringify([...transactionHistory, newTransaction]));
  };

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard balance={balance}/>} />
        <Route path="/account" element={<Account balance={balance}/>} />
        <Route path="/withdraw" element={<Withdraw initialBalance={balance} onWithdraw={handleWithdraw} message={message}/>} />
        <Route path="/deposit" element={<Deposit initialBalance={balance} onDeposit={handleDeposit} message={message}/>} />
        <Route path="/transfer" element={<Transfer initialBalance={balance} onTransfer={handleTransfer} message={message}/>} />
        <Route path="/budget" element={<Budget balance={balance} setBalance={setBalance} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory} message={message} />} />
        
        
        

        </Routes>
    </BrowserRouter>
    );
}

export default App
