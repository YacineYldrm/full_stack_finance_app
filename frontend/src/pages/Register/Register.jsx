import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png';
import { useEffect, useState } from 'react';
import './Register.scss';
import Button from '../../components/Button/Button';

const Register = () => {
	const [userInfo, setUserInfo] = useState({});
	const [message, setMessage] = useState('');
	const [accepted, setAccepted] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {}, [message]);

	const handleRegistration = async () => {
		event.preventDefault();
		if (!accepted) {
			setMessage('Please accept our Terms and Services!');
			return;
		}
		const response = await fetch(
			'http://localhost:3001/api/v1/' + 'users/register',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userInfo),
			},
		);
		const { success, result, error, message } = await response.json();
		if (!success) {
			console.log(error, message);
			setMessage(message);
		} else {
			setMessage('Great! Your registration was successful!');
			navigate(`/verify/${result._id}`);
		}
	};

	return (
		<main className='registration'>
			<div>
				<img
					src={logo}
					alt='finco logo'
				/>
			</div>
			<div>
				<h1>Create an account</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adip sicing elit,
					sed do eiusmod.
				</p>
			</div>
			<div>
				<form>
					<input
						onChange={(e) =>
							setUserInfo({
								...userInfo,
								firstName: e.target.value,
							})
						}
						type='text'
						placeholder='First Name'
					/>
					<input
						onChange={(e) =>
							setUserInfo({
								...userInfo,
								lastName: e.target.value,
							})
						}
						type='text'
						placeholder='Last Name'
					/>
					{/* <input
						onChange={(e) =>
							setUserInfo({
								...userInfo,
								birthDay: new Date(e.target.value).getTime(),
							})
						}
						type='date'
						defaultValue={new Date().toISOString().slice(0, 10)}
					/> */}
					<input
						onChange={(e) =>
							setUserInfo({
								...userInfo,
								email: e.target.value,
							})
						}
						type='text'
						placeholder='Email'
					/>
					<input
						onChange={(e) =>
							setUserInfo({
								...userInfo,
								password: e.target.value,
							})
						}
						type='password'
						placeholder='Password'
					/>
					<input
						onChange={(e) =>
							setUserInfo({
								...userInfo,
								phoneNumber: e.target.value,
							})
						}
						type='text'
						placeholder='Phone'
					/>

					<label>
						<input
							onClick={() => setAccepted(true)}
							type='checkbox'
							name=''
							id=''
						/>{' '}
						<p>
							Agree to our <b>Terms and Services</b>
						</p>
					</label>
				</form>
			</div>
			{message ? <h4>{message}</h4> : null}

			<Button
				btnContent={'Register Now'}
				btnFunction={handleRegistration}
			/>
			<p>
				Already have an account? <Link to='/login'>Login</Link>
			</p>
		</main>
	);
};

export default Register;
