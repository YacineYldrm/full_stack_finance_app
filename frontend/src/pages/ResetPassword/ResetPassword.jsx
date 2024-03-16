import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../../api";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState()
    
    const params = useParams()
    const authorization = params.resetToken
    const navigate = useNavigate()
    const resetPassword = async ()=>{
        const res = await fetch(`${backendUrl}users/change-password`,{
            method: "POST",
            body: JSON.stringify({newPassword, forgotPassword: true}),
            headers: {authorization}
        })
        const {success, result, error, message} = await res.json()
        if(!success){
            console.log(error,message);
        }else{
            navigate("/login")
        }

    }
    return ( 
        <>
        <main className='verify'>
				<div>
					<img
						src={logo}
						alt='Finco-Logo'
					/>
				</div>
				<div>
					<h2>Reset your Password!</h2>
					<p>Choose a new Password, with at least 8 Characters , 1 upper case letter, 1 lower case letter and 1 special character!</p>
				</div>
				<form>
					<div>
						<input
							type='password'
							placeholder='Password'
							onChange={(e) =>
								setNewPassword(e.target.value)
							}
						/>
						
					</div>

					

					<Button
						btnContent={'Confirm'}
						btnFunction={resetPassword}
					/>
				</form>
				
			</main>
        </>
     );
}
 
export default ResetPassword;