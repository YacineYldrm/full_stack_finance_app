import { useNavigate } from 'react-router-dom';
import bigPresent from '../../../public/GetStarted/bigPresent.svg';
import bigPresentShadow from '../../../public/GetStarted/bigPresentShadow.svg';
import magneticStripe from '../../../public/GetStarted/magneticStripe.svg';
import middlePresent from '../../../public/GetStarted/middlePresent.svg';
import shadowBigPresent from '../../../public/GetStarted/shadowBigPresent.svg';
import cardShadow from '../../../public/GetStarted/shadowCard.svg';
import shadowMiddlePresent from '../../../public/GetStarted/shadowMiddlePresent.svg';
import shadowSmallPresent from '../../../public/GetStarted/shadowSmallPresent.svg';
import smallPresent from '../../../public/GetStarted/smallPresent.svg';
import underBodyCard from '../../../public/GetStarted/underBodyCard.svg';
import upperBodyCard from '../../../public/GetStarted/upperBodyCard.svg';

import './GetStarted.scss';
import Button from '../../components/Button/Button';

const GetStarted = () => {
	const navigate = useNavigate();
	return (
		<main>
			<section>
				<article>
					<img
						src={smallPresent}
						alt=''
					/>
					<img
						src={shadowSmallPresent}
						alt=''
					/>
					<img
						src={middlePresent}
						alt=''
					/>
					<img
						src={shadowMiddlePresent}
						alt=''
					/>
					<img
						src={bigPresent}
						alt=''
					/>
					<img
						src={shadowBigPresent}
						alt=''
					/>
					<img
						src={bigPresentShadow}
						alt=''
					/>
					<div>
						<img
							src={upperBodyCard}
							alt=''
						/>
						<img
							src={magneticStripe}
							alt=''
						/>
						<img
							src={underBodyCard}
							alt=''
						/>
					</div>
					<img
						src={cardShadow}
						alt=''
					/>
				</article>
			</section>
			<section>
				<div>
					<h1>Analyze your spending!</h1>
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
