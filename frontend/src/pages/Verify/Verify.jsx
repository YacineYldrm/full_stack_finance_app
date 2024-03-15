import logo from '../../../public/logo.png'
import { Link, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from '../../api';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';

import './Verify.scss'



const Verify = () => {
    const params = useParams()
    const userId = params.userId
    const [verifyInfo, setVerifyInfo] = useState({userId})
    const navigate = useNavigate()

    const getUser = async()=>{
        const res = await fetch(`${backendUrl}users/get-user`,{
            method: "POST",
            body: JSON.stringify(verifyInfo),
            headers: {"Content-Type":"application/json"}
        })
        const {success, result, error, message} = await res.json()
        if(!success){
            navigate("/register")
        } else if(result.verified){
            
                navigate("/login")
            
        }
    }
    useEffect(()=>{
        getUser()
    },[])
    const verify = async()=>{
        event.preventDefault()
        const res = await fetch(`${backendUrl}users/verify`,{
            method:"POST",
            body: JSON.stringify(verifyInfo),
            headers: {"Content-Type":"application/json"}
        })
        const {success,result,error,message} = await res.json()
        if(!success){
            console.log(error,message);
        }else{
            
            navigate("/login");
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
					<h2>Welcome to Finco!</h2>
					<p>Please  type in your verification code, to verify your E-mail and get started, to keep your finances organized.</p>
				</div>
				<form>
					<div>
						<input
							type='text'
							placeholder='Verification Code'
							onChange={(e) =>
								setVerifyInfo({
									...verifyInfo,
									v_code: e.target.value,
								})
							}
						/>
						
					</div>

					<h6>Didn't get your Code?</h6>

					<Button
						btnContent={'Verify'}
						btnFunction={verify}
					/>
				</form>
				
			</main>
        </>
     );
}
 
export default Verify;