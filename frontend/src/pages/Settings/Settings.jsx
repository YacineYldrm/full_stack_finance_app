import changePasswordIcon from '../../../public/changePassword.svg'
import changeUser from '../../../public/changeUser.svg'
import changeMail from '../../../public/changeMail.svg'
import deleteUserIcon from '../../../public/deleteUser.svg'
import arrowright from "../../../public/ArrowRight.svg"
import Navbar from '../../components/Navbar/Navbar'
import './Settings.scss'
import { useState } from 'react'
import Arrow from '../../../public/svg/Arrows/Arrow'
import ModalSure from '../../components/ModalSure/ModalSure'
import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../../api'

const Settings = ({provider}) => {
    const [userFirstName,userLastname] = provider.activeUser.user.split(" ")
    const [image,setImage] = useState()
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [changePwDropdown,setChangePwDropdown] = useState(false)
    const [firstName,setFirstName] = useState(userFirstName)
    const [lastName,setLastName] = useState(userLastname)
    const [email,setEmail] = useState(provider.activeUser.email)
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    
    const deleteUser = async ()=>{
        const res = await fetch(`${backendUrl}users/delete`,{
            method: "DELETE",
            body: JSON.stringify({password}),
            headers:{"Content-Type":"application/json",authorization:provider.authorization}
        })
        const {success,result,error,message}= await res.json()
        if(!success){
            console.log(error,message);
        }else{
            provider.setAuthorization("")
            navigate("/register")
        }
    }
    const editUser = async()=>{
        const fd = new FormData()
        const userInfo = JSON.stringify({firstName,lastName})
        fd.append("userInfo",userInfo)
        
        {image? fd.append("image",image):null}
        const res = await fetch(`${backendUrl}users/edit`,{
            method: "POST",
            body: fd,
            headers:{authorization:provider.authorization}
        })
        const {success,result,error,message} = await res.json()
        if(!success){
            console.log(error,message);
        }else{
            console.log(result);
            provider.setActiveUser(result)
        }
    }

    const changePassword = async()=>{
        const passwordInfo = {oldPassword,newPassword}
        const res = await fetch(`${backendUrl}users/change-password`,{
            method: "POST",
            body: JSON.stringify(passwordInfo),
            headers:{"Content-Type":"application/json",authorization:provider.authorization}
        })
        const {success,result,error,message} = await res.json()
        if(!success){
            console.log(error,message);
        }else{
            provider.setAuthorization("")
            navigate("/login")
        }

    }

    const changeEmail = async()=>{
        const res = await fetch(`${backendUrl}users/change-email`,{
            method: "POST",
            body: JSON.stringify({email}),
            headers:{"Content-Type":"application/json",authorization:provider.authorization}
        })
        const {success,result,error,message} = await res.json()
        if(!success){
            console.log(error,message);
        }else{
            provider.setAuthorization("")
            navigate("/login")
        }
    }
    
    return ( 
        <>
        <main className="settings">
            
        <div>
					<Arrow onClick={() => navigate('/menu')} />
					
				</div>
            <h3>Settings</h3>
                <section>
                    {/* <div>
                        <img src={image ? URL.createObjectURL(image) :`http://localhost:3001/${provider?.activeUser?.profileImage}`} alt="" />
                        <input type="file" name="" accept="image/*" id="" onChange={(e)=>setImage(e.target.files[0])}/>
                        {image? <button onClick={()=>setImage(null)}>use old</button> : <p>Drop your image here ⬆️ </p>}
                        {image? <button onClick={editUser}>upload new image</button>: null}
                    </div> */}
                    <article>
                    <div>
                        <div>
                            <div>
                                <img src={changePasswordIcon} alt="" />
                                <p>Change Password</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="" id="password" onChange={(e)=>setOldPassword(e.target.value)}/>
                            <label htmlFor="newpassword">New Password</label>
                            <input type="password" name="" id="newpassword" onChange={(e)=>setNewPassword(e.target.value)}/>
                            <button onClick={changePassword}>Change Password</button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <img src={changeMail} alt="" />
                                <p>Change Email</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="" defaultValue={email} id="email" onChange={(e)=>setEmail(e.target.value)}/>
                            
                            <button onClick={changeEmail}>Change Email</button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <img src={changeUser} alt="" />
                                <p>Change Name</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div>
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" name="" defaultValue={firstName} id="firstname" onChange={(e)=>setFirstName(e.target.value)}/>
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" name="" defaultValue={lastName} id="lastname" onChange={(e)=>setLastName(e.target.value)}/>
                            <button onClick={editUser}>Change Name</button>
                        </div>
                    </div>
                    </article>

                    <article>
                        <div>
                            <div>
                                <img src={deleteUserIcon} alt="" />
                                <p>Delete Pofile</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div>
                            <label htmlFor="passwordconfirm">Password</label>
                            <input type="password" name=""  id="email" onChange={(e)=>setPassword(e.target.value)}/>
                            
                            <button onClick={deleteUser}>Delete Profile</button>
                        </div>
                    </article>
                </section>
                
        </main>
        </>
     );
}
 
export default Settings;