// -------------------------Imports---------------------------

import './ForgotPassword.scss';
import { Button, backendUrl, useState, logo } from '../../utils/files';

// -------------------------Imports---------------------------

const ForgotPassword = () => {
	// -------------------------States---------------------------

	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	// ------------------resetPassword Fetch Function------------------

	const resetPassword = async () => {
		event.preventDefault();
		const resetPasswordFetch = await fetch(
			`${backendUrl}users/reset-password`,
			{
				method: 'POST',
				body: JSON.stringify({ email }),
				headers: { 'Content-Type': 'application/json' },
			},
		);
		const { success, result, error, message } =
			await resetPasswordFetch.json();
		if (!success) {
			console.log(error, message);
			setMessage(message);
		} else {
			setMessage(result);
		}
	};

	// ---------------------------------------------------------------------

	return (
		<>
			<main className='forgotPassword'>
				<div>
					<img
						src={logo}
						alt='Finco-Logo'
					/>
				</div>
				<div>
					<h2>Forgot your Password?</h2>
					<p>
						Don't panic, type in your E-mail and we will send you a
						link to reset your password.
					</p>
				</div>
				<form>
					<div>
						<input
							type='email'
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<h6>{message}</h6>

					<Button
						btnContent={'Confirm'}
						btnFunction={resetPassword}
					/>
				</form>
			</main>
		</>
	);
};

export default ForgotPassword;
