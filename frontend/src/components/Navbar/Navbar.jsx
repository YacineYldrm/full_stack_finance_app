import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import cardIcon from '../../../public/cardIcon.png';
import plusIcon from '../../../public/plusIcon.png';
import reportIcon from '../../../public/reportIcon.png';
import homeIcon from '../../../public/homeIcon.png';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<NavLink to='/'>
				<h3>Home</h3>
				<div>
					<img
						src={homeIcon}
						alt=''
					/>
				</div>
			</NavLink>
			<NavLink to='/transactions'>
				<h3>Transactions</h3>
				<div>
					<img
						src={cardIcon}
						alt=''
					/>
				</div>
			</NavLink>
			<NavLink to='/add'>
				<h3>Add</h3>
				<div>
					<img
						src={plusIcon}
						alt=''
					/>
				</div>
			</NavLink>
			<NavLink to='/reports'>
				<h3>Reports</h3>
				<div>
					<img
						src={reportIcon}
						alt=''
					/>
				</div>
			</NavLink>
		</nav>
	);
};

export default Navbar;
