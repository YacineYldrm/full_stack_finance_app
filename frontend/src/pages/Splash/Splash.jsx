import { useEffect } from 'react';
import left from '../../../public/splash/left.svg';
import right from '../../../public/splash/right.svg';
import circle from '../../../public/splash/circle.svg';
import './Splash.scss';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			navigate('/onboard');
		}, 4000);
	}, []);
	return (
		<>
			<main className='splash'>
				<section>
					<div>
						<img
							className='left'
							src={left}
							alt='Finco logo'
						/>
					</div>
					<div>
						<img
							className='right'
							src={right}
							alt='Finco logo'
						/>
					</div>
					<div>
						<img
							className='circle'
							src={circle}
							alt='Finco logo'
						/>
					</div>
				</section>
			</main>
		</>
	);
};

export default Splash;
