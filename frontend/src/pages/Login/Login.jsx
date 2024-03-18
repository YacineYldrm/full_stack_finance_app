import { useState } from 'react';
import './Login.scss';
import { backendUrl } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/Logo.svg';
import { silentRefresh } from '../../utils/refresh';
import Button from '../../components/Button/Button';
import closedEye from '../../../public/eye/closedEye.svg';
import openEye from '../../../public/eye/openEye.svg';

const Login = ({ provider }) => {
	const [loginInfo, setLoginInfo] = useState({});
	const [message, setMessage] = useState(null);
	const [seePassword, setSeePassword] = useState(false);
	const navigate = useNavigate();

	// #################################################

	const login = async () => {
		event.preventDefault();

		const res = await fetch(`${backendUrl}users/login`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(loginInfo),
			headers: { 'Content-Type': 'application/json' },
		});

		const { success, result, accessToken, error } = await res.json();
		if (!success) {
			console.log(error);
		} else {
			if (!result.verified) {
				navigate(`/verify/${result._id}`);
			} else if (result.verified && result.accounts.length <= 0) {
				provider.setAuthorization(`Bearer ${accessToken}`);
				provider.setActiveUser(result);
				silentRefresh(accessToken, provider.setAuthorization);
				navigate('/account/setup');
			} else {
				provider.setAuthorization(`Bearer ${accessToken}`);
				provider.setActiveUser(result);
				silentRefresh(accessToken, provider.setAuthorization);
				navigate('/home');
			}
		}
	};

	// #################################################

	return (
		<>
			<main className='login'>
				<div>
					<img
						src={logo}
						alt='Finco-Logo'
					/>
				</div>
				<div>
					<h2>Welcome back!</h2>
					<p>Please Login to keep your finances organized.</p>
				</div>
				<form>
					<div>
						<label>
							<input
								type='email'
								placeholder='Email'
								onChange={(e) =>
									setLoginInfo({
										...loginInfo,
										email: e.target.value,
									})
								}
							/>
						</label>
						<label>
							<input
								type={seePassword ? 'text' : 'password'}
								placeholder='Password'
								onChange={(e) =>
									setLoginInfo({
										...loginInfo,
										password: e.target.value,
									})
								}
							/>
							<img
								onClick={() => setSeePassword(!seePassword)}
								src={seePassword ? openEye : closedEye}
								alt=''
							/>
						</label>
					</div>

					<h6 onClick={() => navigate('/forgot-password')}>
						Forgot password?
					</h6>

					<Button
						btnContent={'Login'}
						btnFunction={login}
					/>
				</form>
				<p>
					Don’t have an account? <Link to='/register'>Sign up</Link>
				</p>
			</main>
		</>
	);
};

export default Login;
