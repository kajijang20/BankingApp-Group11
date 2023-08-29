import { Link } from 'react-router-dom';
import { AiOutlineBank} from 'react-icons/ai'
import { GiReceiveMoney} from 'react-icons/gi'
import { GiPayMoney} from 'react-icons/gi'
import { SiMoneygram} from 'react-icons/si'
import { GiTakeMyMoney} from 'react-icons/gi'
import './Dashboard.css';

const Dashboard = ({ balance }) => {
   
  return (
    <div>
      <header className="dash-header">
        <p>Balance: ${balance.toFixed(2)}</p>
        </header>
    
      <div className='dashboard-container'>
      <Link  to='/account' className='dashboard-button account'>
        <h2 className='dashboard-fonts'>Account</h2>
        <AiOutlineBank  className="dash-icon"/>
      </Link>

      <Link to='/withdraw' className='dashboard-button withdraw'>
        <h2 className='dashboard-fonts'>Withdraw</h2>
        <GiReceiveMoney  className="dash-icon" />
      </Link>
      <Link to='/deposit' className='dashboard-button deposit'>
        <h2 className='dashboard-fonts'>Deposit</h2>
        <GiPayMoney  className="dash-icon"/>
      </Link>
      <Link to='/transfer' className='dashboard-button transfer'>
        <h2 className='dashboard-fonts'>Transfer</h2>
        <SiMoneygram  className="dash-icon"/>
      </Link>
      <Link  to='/budget'className='dashboard-button budget'>
        <h2 className='dashboard-fonts'>Budget</h2>
        <GiTakeMyMoney  className="dash-icon" />
      </Link>
    </div>
    </div>
  );
};

export default Dashboard;
