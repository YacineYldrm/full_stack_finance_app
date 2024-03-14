import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../api";
import arrowright from "../../../public/ArrowRight.svg"
import feather from "../../../public/feather.svg"
import bell from"../../../public/bell.svg"
import settings from "../../../public/settings.svg"
import faq from "../../../public/faq.svg"
import logouticon from "../../../public/logout.svg"
import Navbar from "../../components/Navbar/Navbar";
import './Menu.scss'

const Menu = ({provider}) => {
    const navigate = useNavigate()
    const logout = async()=>{
        const res = await fetch(`${backendUrl}users/logout`,{
            method: "GET",
            headers:{authorization: provider.authorization}
        })
        const {success, result, error, message} = await res.json()
        if(!success){
            console.log(error, message);
        }else{
            provider.setAuthorization("")
            navigate("/login")
        }
    }
    return ( 
        <main className="menu">
            <div>
                    <div>
                        <p>Welcome back.</p>
                        <h3>{provider.activeUser?.user}</h3>
                    </div>
                    <div className="profile_img_wrapper">
                        <img
                            src={`http://localhost:3001/${provider?.activeUser?.profileImage}`}
                            alt="profile picture."
                        />
                    </div>
                </div>
                <section>
                    <article>
                        <div>
                            <img src={feather} alt="" />
                            <p>My Wallet</p>
                        </div>
                        <img src={arrowright} alt="" />
                    </article>
                    <article>
                        <div>
                        <div>
                            <img src={bell} alt="" />
                            <p>Notification</p>
                        </div>
                        <img src={arrowright} alt="" />
                        </div>

                        <div>
                        <div>
                            <img src={settings} alt="" />
                            <p>Settings</p>
                        </div>
                        <img src={arrowright} alt="" />
                        </div>
                        <div>
                        <div>
                            <img src={faq} alt="" />
                            <p>FAQ</p>
                        </div>
                        <img src={arrowright} alt="" />
                        </div>
                    </article>

                    <article onClick={logout}>
                        <div>
                            <img src={logouticon} alt="" />
                            <p>Logout</p>
                        </div>
                        <img src={arrowright} alt="" />
                    </article>
                </section>
                <Navbar/>
        </main>
     );
}
 
export default Menu;