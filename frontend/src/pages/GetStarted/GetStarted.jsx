import { useNavigate } from 'react-router-dom';
import bigPresent from '../../../public/GetStarted/bigPresent.svg';

import middlePresent from '../../../public/GetStarted/middlePresent.svg';

import smallPresent from '../../../public/GetStarted/smallPresent.svg';

import bankCard from '../../../public/splash/giftCard.svg';
import shadow from '../../../public/splash/shadow.svg';

import './GetStarted.scss';
import Button from '../../components/Button/Button';

const GetStarted = () => {
	const navigate = useNavigate();
	return (
		<main className='getStarted'>
			<article>
				<img
					className='giftCard'
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
					src={bigPresent}
					alt=''
				/>
				<img
					className='dollar2'
					src={bigPresent}
					alt=''
				/>
				<img
					className='dollar3'
					src={middlePresent}
					alt=''
				/>
				<img
					className='coin'
					src={middlePresent}
					alt=''
				/>
				<img
					className='coin1'
					src={middlePresent}
					alt=''
				/>
				<img
					className='coin2'
					src={middlePresent}
					alt=''
				/>
				<img
					className='coin3'
					src={middlePresent}
					alt=''
				/>
				<img
					className='redDollar'
					src={smallPresent}
					alt=''
				/>
				<img
					className='redDollar1'
					src={smallPresent}
					alt=''
				/>
				<img
					className='redDollar2'
					src={smallPresent}
					alt=''
				/>
				<img
					className='redDollar3'
					src={smallPresent}
					alt=''
				/>
			</article>
			<section>
				<div>
					<h2>Analyze your spending!</h2>
					<p>
						Get started with Finco and dive into a comprehensive
						analysis of your spending habits. Gain valuable
						insights, take control of your finances, and embark on
						your journey to financial empowerment.
					</p>
				</div>
				<div>
					<Button
						btnContent={`Get Started →`}
						btnFunction={() => navigate('/register')}
					/>
				</div>
			</section>
		</main>
	);
};

export default GetStarted;
