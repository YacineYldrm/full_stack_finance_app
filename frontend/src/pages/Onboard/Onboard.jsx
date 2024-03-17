import { Link, useNavigate } from 'react-router-dom';
import bankCard from '../../../public/splash/bankCard.svg';
import shadow from '../../../public/splash/shadow.svg';
import dollar from '../../../public/splash/moneyGreen.png';
import coin from '../../../public/splash/dollar.png';
import redDollar from '../../../public/splash/redDollar.png';
import './Onboard.scss';
import Button from '../../components/Button/Button';

const Onboard = () => {
	const navigate = useNavigate();
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
						src={dollar}
						alt=''
					/>
					<img
						className='dollar1'
						src={dollar}
						alt=''
					/>
					<img
						className='dollar2'
						src={dollar}
						alt=''
					/>
					<img
						className='dollar3'
						src={dollar}
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
						src={redDollar}
						alt=''
					/>
					<img
						className='redDollar1'
						src={redDollar}
						alt=''
					/>
					<img
						className='redDollar2'
						src={redDollar}
						alt=''
					/>
					<img
						className='redDollar3'
						src={redDollar}
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
