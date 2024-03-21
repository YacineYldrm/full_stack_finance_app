// -------------------------Imports---------------------------

import './Splash.scss';
import { left, right, circle, useNavigate, useEffect } from '../../utils/files';

// -------------------------Imports---------------------------

const Splash = ({ provider }) => {
	const navigate = useNavigate();

	//---------timeout for navigation at animation end--------

	useEffect(() => {
		setTimeout(() => {
			if (provider.authorization) {
				navigate('/home');
			} else {
				navigate('/onboard');
			}
		}, 4000);
	}, [provider.authorization]);

	// ---------------------------------------------------------------------

	return (
		<>
			<main className='splash'>
				<section>
					<div>
						<img
							className='left'
							src={left}
							alt='Finoccio logo'
						/>
					</div>
					<div>
						<img
							className='right'
							src={right}
							alt='Finoccio logo'
						/>
					</div>
					<div>
						<img
							className='circle'
							src={circle}
							alt='Finoccio logo'
						/>
					</div>
				</section>
			</main>
		</>
	);
};

export default Splash;
