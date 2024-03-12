import { useState } from 'react';
import './Login.scss';
import Button from '../../components/Button';
import { backendUrl } from '../../api';
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png';
import { silentRefresh } from '../../utils/refresh';

const Login = ({ provider }) => {
	const [loginInfo, setLoginInfo] = useState({});
	const navigate = useNavigate();

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
	console.log(provider.activeUser);
	return (
		<>
			<main>
				<div>
					<img
						src={logo}
						alt='Finco-Logo'
					/>
				</div>
				<div>
					<h2>Welcome back!</h2>
					<p>
						Please Login to keep your finances organized. Or click{' '}
						<a href='/register'>here</a> to sign up.
					</p>
				</div>
				<form>
					<div>
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
						<input
							type='password'
							placeholder='Password'
							onChange={(e) =>
								setLoginInfo({
									...loginInfo,
									password: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<p>Forgot password?</p>
					</div>
					<Button
						btnContent={'Login'}
						btnFunction={login}
					/>
				</form>
			</main>
		</>
	);
};

export default Login;
