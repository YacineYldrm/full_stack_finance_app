// import food from '../../../public/food.png'
// import shopping from '../../../public/shopping.png'
// import insurance from '../../../public/insurance.png'
// import other from '../../../public/other.png'
// import sallary from '../../../public/sallary.png';
import activeCard from '../../../public/activeCard.svg';
import './Transaction.scss';
const Transaction = ({ transaction }) => {
	// #################################################

	const getIcon = () => {
		if (transaction?.category === 'Food & Drink') {
			return food;
		} else if (transaction?.category === 'Shopping') {
			return shopping;
		} else if (transaction?.category === 'Insurance bill') {
			return insurance;
		} else if (transaction?.category === 'Sallary') {
			return sallary;
		} else {
			return other;
		}
	};

	// #################################################

	const date = new Date(transaction?.date);

	// #################################################

	return (
		<>
			<main className='transaction'>
				<div>
					<img
						src={activeCard}
						alt=''
					/>
					<div>
						<h3>{transaction?.category}</h3>
						<p>{`${date
							.toString()
							.slice(16, 21)
							.replace(':', '.')} , ${date
							.toString()
							.slice(8, 10)} ${date.toString().slice(4, 7)} ${date
							.toString()
							.slice(11, 15)}`}</p>
					</div>
				</div>
				<div>
					{transaction?.type === 'income' ? (
						<h5>{`${transaction?.amount.toLocaleString()},00€`}</h5>
					) : (
						<h4>{`${transaction?.amount.toLocaleString()},00€`}</h4>
					)}
				</div>
			</main>
		</>
	);
};

export default Transaction;
