// -------------------------Imports---------------------------
import './Onboard.scss';
import {
	useNavigate,
	bankCard,
	shadow,
	Button,
	Link,
	blueDollar,
	coin,
	greenDollar,
} from '../../utils/files';

// -------------------------Imports---------------------------

const Onboard = () => {
	const navigate = useNavigate();

	// ---------------------------------------------------------------------

	return (
		<>
			<main className='onBoarding'>
				<article>
					<img
						className='bankCard'
						src={bankCard}
						alt=''
					/>
					<img
						className='shadow'
						src={shadow}
						alt=''
					/>
					<img
						className='dollar'
						src={blueDollar}
						alt=''
					/>
					<img
						className='dollar1'
						src={blueDollar}
						alt=''
					/>
					<img
						className='dollar2'
						src={blueDollar}
						alt=''
					/>
					<img
						className='dollar3'
						src={blueDollar}
						alt=''
					/>
					<img
						className='coin'
						src={coin}
						alt=''
					/>
					<img
						className='coin1'
						src={coin}
						alt=''
					/>
					<img
						className='coin2'
						src={coin}
						alt=''
					/>
					<img
						className='coin3'
						src={coin}
						alt=''
					/>
					<img
						className='redDollar'
						src={greenDollar}
						alt=''
					/>
					<img
						className='redDollar1'
						src={greenDollar}
						alt=''
					/>
					<img
						className='redDollar2'
						src={greenDollar}
						alt=''
					/>
					<img
						className='redDollar3'
						src={greenDollar}
						alt=''
					/>
				</article>
				<section>
					<div>
						<h2>Track your spend and income</h2>
						<p>
							Start your journey to financial empowerment. Let's
							navigate your financial future together
						</p>
					</div>
					<div>
						<Link to={`/login`}>Skip</Link>
						<Button
							btnContent={`Next →`}
							btnFunction={() => navigate('/get-started')}
						/>
					</div>
				</section>
			</main>
		</>
	);
};

export default Onboard;
