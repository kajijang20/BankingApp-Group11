import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Budget.css';

const Budget = ({ balance, setBalance, transactionHistory, setTransactionHistory }) => {
  const [expenses, setExpenses] = useState([]);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  const handleAddExpense = () => {
    const parsedAmount = parseFloat(expenseAmount);

    if (!isNaN(parsedAmount) && balance >= parsedAmount && expenseDescription) {
      const newExpense = {
        id: expenses.length + 1,
        description: expenseDescription,
        amount: parsedAmount,
        timestamp: new Date().toISOString(),
      };
      const newBalance = balance - parsedAmount;

      setExpenses([...expenses, newExpense]);
      setBalance(newBalance);

      const newTransaction = {
        type: 'Expense',
        amount: parsedAmount,
        date: new Date().toLocaleString(),
        description: expenseDescription,
      };

      setTransactionHistory([...transactionHistory, newTransaction]);

      localStorage.setItem('expenses', JSON.stringify([...expenses, newExpense]));
      localStorage.setItem('accountBalance', newBalance.toFixed(2));
      localStorage.setItem('transactionHistory', JSON.stringify([...transactionHistory, newTransaction]));

      setExpenseDescription('');
      setExpenseAmount('');
    } else {
      console.log("Invalid input or insufficient balance to add this expense.");
    }
  };

  const handleRemoveExpense = (id, amount, description  ) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    const newBalance = balance + amount;
  setBalance(newBalance);
  localStorage.setItem('accountBalance', newBalance.toFixed(2));

  const updatedTransactionHistory = transactionHistory.filter(transaction => !(transaction.type === 'Expense' && transaction.amount === amount && transaction.description === description));
  setTransactionHistory(updatedTransactionHistory);
  localStorage.setItem('transactionHistory', JSON.stringify(updatedTransactionHistory));
  };

  
  return (
    <div className="budget-container">
      <h2>Expense Tracker</h2>
      <p>Your current balance is: ${balance.toFixed(2)}</p>
      <ul className="expenses-list">
        {expenses.map(expense => (
          <li key={expense.id} className="expense-item">
            <span className="expense-description">{expense.description}</span>
            <span className="expense-amount">${expense.amount.toFixed(2)}</span>
           <button className="expense-button" onClick={() => handleRemoveExpense(expense.id, expense.amount, expense.description)}>
  Remove
</button>

          </li>
        ))}
      </ul>
      <p className="total-expense">Total Expenses: ${totalExpense.toFixed(2)}</p>
      <div className="add-expense-form">
        <input
          type="text"
          placeholder="Description"
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <button className="expense-button" onClick={handleAddExpense}>
          Add Expense
        </button>
      </div>
      <div className="card-footer">
        <Link to="/dashboard" className="styled-link">
          Back to Dashboard
        </Link>
        </div>
    </div>
  );
};

export default Budget;
