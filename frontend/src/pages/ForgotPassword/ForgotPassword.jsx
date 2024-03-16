import { useState } from "react";
import logo from '../../../public/logo.png'
import Button from "../../components/Button/Button";
import { backendUrl } from "../../api";

const ForgotPassword = () => {
    const [email,setEmail] = useState("")
    const [message, setMessage] = useState("")
    const reset = async () =>{
        event.preventDefault()
        const res = await fetch(`${backendUrl}users/reset-password`,{
            method: "POST",
            body: JSON.stringify({email}),
            headers: {"Content-Type":"application/json"}
        })
        const {success, result, error, message} = await res.json()
        if(!success){
            console.log(error,message);
            setMessage(message)
        }else{
            setMessage(result)
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
					<h2>Forgot your Password?</h2>
					<p>Don't  panic, type in your E-mail and we will send you a link to reset your password.</p>
				</div>
				<form>
					<div>
						<input
							type='email'
							placeholder='Email'
							onChange={(e) =>
								setEmail(e.target.value)
							}
						/>
						
					</div>

					<h6>{message}</h6>

					<Button
						btnContent={'Confirm'}
						btnFunction={reset}
					/>
				</form>
				
			</main>
        </>
     );
}
 
export default ForgotPassword;