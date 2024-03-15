import changePassword from '../../../public/changePassword.svg'
import changeUser from '../../../public/changeUser.svg'
import changeMail from '../../../public/changeMail.svg'
import deleteUser from '../../../public/deleteUser.svg'
import arrowright from "../../../public/ArrowRight.svg"
import Navbar from '../../components/Navbar/Navbar'
import './Settings.scss'
import { useState } from 'react'
import Arrow from '../../../public/svg/Arrows/Arrow'
import ModalSure from '../../components/ModalSure/ModalSure'
import { useNavigate } from 'react-router-dom'

const Settings = ({provider}) => {
    const [image,setImage] = useState()
    const [surePwModal, setSurePwModal] = useState(false)
    const [changePwModal,setChangePwModal] = useState(false)
    const navigate = useNavigate()
    const yesPw = ()=>{
        setSurePwModal(false)
        setChangePwModal(true)
    }
    return ( 
        <>
        <main className="settings">
            {surePwModal? <ModalSure setModalSure={setSurePwModal} yesFunc={yesPw} content={"Are you sure you want to change your password?"}/> : null}
        <div>
					<Arrow onClick={() => navigate('/menu')} />
					
				</div>
            <h3>Settings</h3>
                <section>
                    {/* <div>
                        <img src={image ? URL.createObjectURL(image) :`http://localhost:3001/${provider?.activeUser?.profileImage}`} alt="" />
                        <input type="file" name="" accept="image/*" id="" onChange={(e)=>setImage(e.target.files[0])}/>
                        {image? <button onClick={()=>setImage(null)}>use old</button> : <p>Drop your image here ⬆️ </p>}
                        {image? <button>upload new image</button>: null}
                    </div> */}
                    <article>
                        <div onClick={()=>setSurePwModal(true)}>
                        <div>
                            <img src={changePassword} alt="" />
                            <p>Change Password</p>
                        </div>
                        <img src={arrowright} alt="" />
                        </div>

                        <div>
                        <div>
                            <img src={changeMail} alt="" />
                            <p>Change Email</p>
                        </div>
                        <img src={arrowright} alt="" />
                        </div>
                        <div>
                        <div>
                            <img src={changeUser} alt="" />
                            <p>Change Name</p>
                        </div>
                        <img src={arrowright} alt="" />
                        </div>
                    </article>

                    <article >
                        <div>
                            <img src={deleteUser} alt="" />
                            <p>Delete Profile</p>
                        </div>
                        <img src={arrowright} alt="" />
                    </article>
                </section>
                <Navbar/>
        </main>
        </>
     );
}
 
export default Settings;