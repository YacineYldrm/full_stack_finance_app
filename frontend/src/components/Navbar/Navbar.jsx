import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import CardIcon from '../../../public/svg/cardIcon';
import HomeIcon from '../../../public/svg/homeIcon';
import PlusIcon from '../../../public/svg/plusIcon';
import ReportIcon from '../../../public/svg/reportIcon';

const Navbar = ({ provider }) => {
	return (
		<nav className='navbar'>
			<NavLink to='/'>
				<h3>Home</h3>
				<div>
					<HomeIcon />
				</div>
			</NavLink>
			<NavLink to='/transactions'>
				<h3>Transactions</h3>
				<div>
					<CardIcon />
				</div>
			</NavLink>
			<NavLink to={`/add-income`}>
				<h3>Add</h3>
				<div>
					<PlusIcon />
				</div>
			</NavLink>
			<NavLink to='/reports'>
				<h3>Reports</h3>
				<div>
					<ReportIcon />
				</div>
			</NavLink>
		</nav>
	);
};

export default Navbar;
