// -------------------------Imports---------------------------

import './Navbar.scss';

import {
	NavLink,
	Link,
	CardIcon,
	HomeIcon,
	PlusIcon,
	ReportIcon,
} from '../../utils/files';

// -------------------------Imports---------------------------

const Navbar = () => {
	// --------------------Triggers on click-----------------------
	//              pop up for add expense or income
	// ----------------------------------------------------------

	const jumpUp = (e) => {
		e.preventDefault();
		const allActive = document.getElementsByClassName('active');
		for (let i = 0; i < allActive.length; i++) {
			allActive[i].classList.remove('active');
		}
		const jumpUpButton = document.getElementById('jumpUpButton');
		jumpUpButton.classList.toggle('active');

		const jumpUp = document.getElementsByClassName('jumpUpBox');
		jumpUp[0].classList.toggle('showJumpUpBox');
	};

	// ---------------------------------------------------------------------

	return (
		<nav className='navbar'>
			<NavLink to='/home'>
				<h3>Home</h3>
				<div>
					<HomeIcon />
				</div>
			</NavLink>
			<NavLink to='/all-transactions'>
				<h3>Transactions</h3>
				<div>
					<CardIcon />
				</div>
			</NavLink>
			<article
				id='jumpUpButton'
				to='/add'
				onClick={(e) => jumpUp(e)}>
				<h3>Add</h3>
				<div>
					<PlusIcon />
				</div>
				<div className='jumpUpBox'>
					<Link to='/add-income'>Income</Link>
					<Link to='/add-expense'>Expense</Link>
				</div>
			</article>
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
