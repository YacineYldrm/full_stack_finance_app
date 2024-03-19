// -------------------------Imports---------------------------
import './GetStarted.scss';
import {
	bigPresent,
	useNavigate,
	bankCard,
	shadow,
	Button,
} from '../../utils/files';
// -------------------------Imports---------------------------

// ---------------------------------------------------------------------

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
					src={bigPresent}
					alt=''
				/>
				<img
					className='coin'
					src={bigPresent}
					alt=''
				/>
				<img
					className='coin1'
					src={bigPresent}
					alt=''
				/>
				<img
					className='coin2'
					src={bigPresent}
					alt=''
				/>
				<img
					className='coin3'
					src={bigPresent}
					alt=''
				/>
				<img
					className='redDollar'
					src={bigPresent}
					alt=''
				/>
				<img
					className='redDollar1'
					src={bigPresent}
					alt=''
				/>
				<img
					className='redDollar2'
					src={bigPresent}
					alt=''
				/>
				<img
					className='redDollar3'
					src={bigPresent}
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
