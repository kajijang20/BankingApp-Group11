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


  const handleWithdraw = (amount) => {
    setBalance(balance - amount);
    localStorage.setItem('accountBalance', balance.toFixed(2));

    const newTransaction = {
      type: 'Withdrawal',
      amount: amount,
      date: new Date().toLocaleString(),
      description: 'Withdrawal'
    };
    setTransactionHistory([...transactionHistory, newTransaction]);

    localStorage.setItem('accountBalance', balance.toFixed(2));
    localStorage.setItem('transactionHistory', JSON.stringify([...transactionHistory, newTransaction]));
  };
  

  const handleDeposit = (amount) => {
    setBalance(balance + amount);
     localStorage.setItem('accountBalance', balance.toFixed(2));
     const newTransaction = {
      type: 'Deposit',
      amount: amount,
      date: new Date().toLocaleString(),
      description:'Deposit'
    };
    setTransactionHistory([...transactionHistory, newTransaction]);

    localStorage.setItem('accountBalance', balance.toFixed(2));
    localStorage.setItem('transactionHistory', JSON.stringify([...transactionHistory, newTransaction]));
  };

const handleTransfer = (newBalance, transferAmount, selectedRecipient) => {
  const parsedTransferAmount = parseFloat(transferAmount); // Parse the transfer amount as a float

  const transferDescription = `Transferred $${parsedTransferAmount.toFixed(2)} to ${selectedRecipient}`;

  const newTransaction = {
    type: 'Transfer',
    amount: parsedTransferAmount,
    date: new Date().toLocaleString(),
    description: transferDescription,
  };

  setBalance(newBalance);

  setTransactionHistory(prevTransactionHistory => [...prevTransactionHistory, newTransaction]);

  localStorage.setItem('accountBalance', newBalance.toFixed(2));
  localStorage.setItem('transactionHistory', JSON.stringify([...transactionHistory, newTransaction]));
};

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account balance={balance}/>} />
        <Route path="/withdraw" element={<Withdraw initialBalance={balance} onWithdraw={handleWithdraw} />} />
        <Route path="/deposit" element={<Deposit initialBalance={balance} onDeposit={handleDeposit} />} />
        <Route path="/transfer" element={<Transfer initialBalance={balance} onTransfer={handleTransfer} />} />
        <Route path="/budget" element={<Budget />} />
        
        
        

        </Routes>
    </BrowserRouter>
    );
}

export default App
