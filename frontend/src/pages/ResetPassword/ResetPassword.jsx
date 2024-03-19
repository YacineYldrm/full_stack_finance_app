// -------------------------Imports---------------------------

import './ResetPassword.scss';

import {
	Button,
	backendUrl,
	useNavigate,
	useState,
	logo,
	closedEye,
	openEye,
	useParams,
} from '../../utils/files';
// -------------------------Imports---------------------------

const ResetPassword = () => {
	// -------------------------States---------------------------

	const [newPassword, setNewPassword] = useState();
	const [confirmNewPassword, setConfirmNewPassword] = useState();
	const [message, setMessage] = useState('');
	const [seePassword, setSeePassword] = useState(false);
	const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
	const params = useParams();
	const authorization = `Bearer ${params.resetToken}`;
	const navigate = useNavigate();

	// --------------------Renders on click-----------------------------
	//    sends new Password to server and updates the user PasswordHash
	// -----------------------------------------------------------------

	const resetPassword = async () => {
		event.preventDefault();
		if (newPassword === confirmNewPassword) {
			const resetPasswordFetch = await fetch(
				`${backendUrl}users/change-password`,
				{
					method: 'POST',
					body: JSON.stringify({ newPassword, forgotPassword: true }),
					headers: {
						'Content-Type': 'application/json',
						authorization,
					},
				},
			);
			const { success, result, error, message } =
				await resetPasswordFetch.json();
			if (!success) {
				console.log(error, message);
			} else {
				navigate('/login');
			}
		} else setMessage("Passwords don't match! please try again");
	};

	// ---------------------------------------------------------------------

	return (
		<>
			<main className='resetPassword'>
				<div>
					<img
						src={logo}
						alt='Finco-Logo'
					/>
				</div>
				<div>
					<h2>Reset your Password!</h2>
					<p>Please choose a new secure Password, with at least:</p>
					<ul>
						<li>8 Characters</li>
						<li>1 upper case letter</li>
						<li>1 lower case letter</li>
						<li>1 special character</li>
					</ul>
				</div>
				<form>
					<div>
						<label>
							<input
								type={seePassword ? 'text' : 'password'}
								placeholder='New Password'
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<img
								onClick={() => setSeePassword(!seePassword)}
								src={seePassword ? openEye : closedEye}
								alt=''
							/>
						</label>
						<label>
							<input
								type={seeConfirmPassword ? 'text' : 'password'}
								placeholder='Confirm new Password'
								onChange={(e) =>
									setConfirmNewPassword(e.target.value)
								}
							/>
							<img
								onClick={() =>
									setSeeConfirmPassword(!seeConfirmPassword)
								}
								src={seeConfirmPassword ? openEye : closedEye}
								alt=''
							/>
						</label>
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

export default ResetPassword;
