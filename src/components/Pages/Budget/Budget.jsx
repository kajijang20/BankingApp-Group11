import { useState, useEffect } from 'react';
import './Budget.css';

const Budget = () => {
  const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
  const [expenses, setExpenses] = useState(storedExpenses || []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  const handleAddExpense = (description, amount) => {
    const newExpense = {
      id: expenses.length + 1,
      description: description,
      amount: parseFloat(amount),
      timestamp: new Date().toISOString(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleRemoveExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="budget-container">
      <h2>Expense Tracker</h2>
      <ul className="expenses-list">
        {expenses.map(expense => (
          <li key={expense.id} className="expense-item">
            <span className="expense-description">{expense.description}:</span>
            <span className="expense-amount">${expense.amount.toFixed(2)}</span>
            <span className="expense-timestamp">{new Date(expense.timestamp).toLocaleString()}</span>
            <button onClick={() => handleRemoveExpense(expense.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="total-expense">Total Expenses: ${totalExpense.toFixed(2)}</p>
      <div className="add-expense-form">
        <input type="text" placeholder="Description" id="expense-description" />
        <input type="number" placeholder="Amount" id="expense-amount" />
        <button
          className="add-expense-button"
          onClick={() => {
            const description = document.getElementById('expense-description').value;
            const amount = document.getElementById('expense-amount').value;
            if (description && amount) {
              handleAddExpense(description, amount);
            }
          }}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default Budget;
