// -------------------------Imports---------------------------

import './Menu.scss';
import {
	backendUrl,
	mediaUrl,
	useNavigate,
	Navbar,
	arrowright,
	feather,
	bell,
	settings,
	faq,
	logouticon,
} from '../../utils/files';
// -------------------------Imports---------------------------

const Menu = ({ provider }) => {
	const navigate = useNavigate();

	// --------------------Renders on click-----------------------
	//    Logs the User OUT and removes AccessToken and RefreshToken
	// ----------------------------------------------------------

	const logout = async () => {
		const res = await fetch(`${backendUrl}users/logout`, {
			method: 'GET',
			credentials: 'include',
			headers: { authorization: provider.authorization },
		});
		const { success, error, message } = await res.json();
		if (!success) {
			console.log(error, message);
		} else {
			console.log(message);
			provider.setAuthorization('');
			navigate('/login');
		}
	};

	// ---------------------------------------------------------------------

	return (
		<main className='menu'>
			<div>
				<div>
					<p>Welcome back.</p>
					<h3>{provider.activeUser?.user}</h3>
				</div>
				<div className='profile_img_wrapper'>
					<img
						src={`${mediaUrl}${provider?.activeUser?.profileImage}`}
						alt='profile picture.'
					/>
				</div>
			</div>
			<section>
				<article onClick={() => navigate('/menu/my-wallet')}>
					<div>
						<img
							src={feather}
							alt=''
						/>
						<p>My Wallet</p>
					</div>
					<img
						src={arrowright}
						alt=''
					/>
				</article>
				<article>
					<div>
						<div>
							<img
								src={bell}
								alt=''
							/>
							<p>Notification</p>
						</div>
						<img
							src={arrowright}
							alt=''
						/>
					</div>

					<div onClick={() => navigate('/menu/settings')}>
						<div>
							<img
								src={settings}
								alt=''
							/>
							<p>Settings</p>
						</div>
						<img
							src={arrowright}
							alt=''
						/>
					</div>
					<div>
						<div>
							<img
								src={faq}
								alt=''
							/>
							<p>FAQ</p>
						</div>
						<img
							src={arrowright}
							alt=''
						/>
					</div>
				</article>

				<article onClick={logout}>
					<div>
						<img
							src={logouticon}
							alt=''
						/>
						<p>Logout</p>
					</div>
					<img
						src={arrowright}
						alt=''
					/>
				</article>
			</section>
			<Navbar />
		</main>
	);
};

export default Menu;
