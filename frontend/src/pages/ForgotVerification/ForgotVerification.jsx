import { useState } from 'react';
import logo from '../../../public/Logo.svg';
import Button from '../../components/Button/Button';

const ForgotVerification = () => {
	const [email, setEmail] = useState();
	const [message, setMessage] = useState('');

	const newVerification = async () => {
		event.preventDefault();
		const res = await fetch(`${backendUrl}users/new-verification-code`, {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: { 'Content-Type': 'application/json' },
		});
		const { success, result, error, message } = await res.json();
		if (!success) {
			console.log(error, message);
			setMessage(message);
		} else {
			setMessage(result);
		}
	};
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
					<h2>Forgot your Verification Code?</h2>
					<p>
						Don't panic, type in your E-mail and we will send you a
						new verification code to verify your E-mail.
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
						btnFunction={newVerification}
					/>
				</form>
			</main>
		</>
	);
};

export default ForgotVerification;
