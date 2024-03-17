import { Link, useNavigate } from 'react-router-dom';
import bigBill from '../../../public/Onboard/bigBill.svg';
import bigBillShadow from '../../../public/Onboard/bigBillShadow.svg';
import bills from '../../../public/Onboard/bills.svg';
import cardShadow from '../../../public/Onboard/cardShadow.svg';
import magneticStrip from '../../../public/Onboard/magneticStrip.svg';
import smallBallShadow from '../../../public/Onboard/smallBallShadow.svg';
import underBodyCard from '../../../public/Onboard/underBodyCard.svg';
import upperBodyCard from '../../../public/Onboard/upperBodyCard.svg';
import Button from '../../components/Button/Button';

const Onboard = () => {
	const navigate = useNavigate();
	return (
		<>
			<main>
				<section>
					<article>
						<img
							src={bills}
							alt=''
						/>
						<img
							src={smallBallShadow}
							alt=''
						/>
						<img
							src={bigBill}
							alt=''
						/>
						<img
							src={bigBillShadow}
							alt=''
						/>
						<div>
							<img
								src={upperBodyCard}
								alt=''
							/>
							<img
								src={magneticStrip}
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
						<h1>Track your spend and income</h1>
						<p>
							Welcome to Finco! Start your journey to financial
							empowerment. Begin your exploration by clicking
							below. Let's navigate your financial future together
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
