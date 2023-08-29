import { Link } from 'react-router-dom';
import './Dashboard.css';


const Dashboard = () => {
   
  return (
    <div className='dashboard-container'>
      <Link  to='/account' className='dashboard-button account'>
        <h2 className='dashboard-fonts'>Account</h2>
      </Link>

      <Link to='/withdraw' className='dashboard-button'>
        <h2 className='dashboard-fonts'>Withdraw</h2>
        {/* Add your withdraw dashboard content here */}
      </Link>
      <Link to='/deposit' className='dashboard-button'>
        <h2 className='dashboard-fonts'>Deposit</h2>
        {/* Add your deposit dashboard content here */}
      </Link>
      <Link to='/transfer' className='dashboard-button'>
        <h2 className='dashboard-fonts'>Transfer</h2>
        {/* Add your transfer dashboard content here */}
      </Link>
      <Link  to='/budget'className='dashboard-button'>
        <h2 className='dashboard-fonts'>Budget</h2>
        {/* Add your transfer dashboard content here */}
      </Link>
    </div>
  );
};

export default Dashboard;
