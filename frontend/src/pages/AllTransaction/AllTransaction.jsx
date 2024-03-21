// -------------------------Imports---------------------------

import './AllTransaction.scss';
import {
	logo,
	mediaUrl,
	useNavigate,
	useEffect,
	useState,
	incomeIcon,
	expenseIcon,
	TransactionDay,
	ModalAllTransaction,
	magnifire,
	calendar,
	Navbar,
	updateArray,
	getDates,
	calcTotal,
} from '../../utils/files';

// -------------------------Imports---------------------------

const AllTransaction = ({ provider }) => {
	// -------------------------States---------------------------

	const [expenseTotal, setExpenseTotal] = useState(0);
	const [incomeTotal, setIncomeTotal] = useState(0);
	const [allDates, setAllDates] = useState([]);
	const [dates, setDates] = useState([]);
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();
	const formatter = new Intl.NumberFormat(
		provider?.account?.currencyType?.country,
		{
			style: provider?.account?.currencyType?.style,
			currency: provider?.account?.currencyType?.currency,
		},
	);

	// --------------------Renders on Load-----------------------
	//                   Sets the Active Card
	// ----------------------------------------------------------

	useEffect(() => {
		updateArray(provider);
	}, []);

	// --------------------Renders on Load-----------------------
	//     removes the Date Duplicates from Alldates Array
	// ----------------------------------------------------------

	useEffect(() => {
		setDates([...new Set(allDates)]);
	}, [allDates]);

	// --------------------Renders on account change--------------------
	//    calculates totalExpenses and Incomes ad groups by Day
	// -----------------------------------------------------------------

	useEffect(() => {
		getDates(provider, setAllDates);
		calcTotal(provider?.account, provider);
	}, [provider.account]);

	// ----------------------------------------------------------

	return (
		<>
			{modal ? (
				<ModalAllTransaction
					transactions={provider.account?.transactions}
					modal={modal}
					setModal={setModal}
					provider={provider}
				/>
			) : null}

			{modal ? null : (
				<main className='all_transactions_main'>
					<section>
						<div className='userInfo'>
							<img
								src={logo}
								alt='finoccio logo'
							/>
							<img
								onClick={() => navigate('/menu')}
								src={`${mediaUrl}${provider.activeUser?.profileImage}`}
								alt=''
							/>
						</div>
					</section>
					<div className='titleBar'>
						<h1>All transactions</h1>
						<div>
							<div>
								<img
									src={magnifire}
									alt='search'
									onClick={() => setModal(true)}
								/>
							</div>
							<div>
								<img
									src={calendar}
									alt='calendar'
									onClick={() => setModal(true)}
								/>
							</div>
						</div>
					</div>
					<div>
						<article>
							<div>
								<img
									src={incomeIcon}
									alt='income icon'
								/>
							</div>
							<div>
								<p>Income</p>
								<h2>
									{formatter.format(provider?.incomeTotal)}
								</h2>
							</div>
						</article>
						<article>
							<div>
								<img
									src={expenseIcon}
									alt='expense icon'
								/>
							</div>
							<div>
								<p>Expense</p>
								<h2>
									{formatter.format(provider?.expenseTotal)}
								</h2>
							</div>
						</article>
					</div>
					<section>
						{dates
							?.sort()
							.reverse()
							.map((date, i) => (
								<TransactionDay
									provider={provider}
									date={date}
									key={i}
									transactions={
										provider.account?.transactions
									}
								/>
							))}
					</section>
				</main>
			)}

			{modal ? null : <Navbar provider={provider} />}
		</>
	);
};

export default AllTransaction;
