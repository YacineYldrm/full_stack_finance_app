import { useEffect } from 'react';
import logo from '../../../public/logo.png'
import './Splash.scss'
import { useNavigate } from 'react-router-dom';

const Splash = () => {
const navigate = useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/onboard")
        },5000)
    },[])
    return ( 
        <>
        <main>
            <section>
                <div>
                    <img src={logo} alt="Finco logo" />
                </div>
            </section>
        </main>
        </>
     );
}
 
export default Splash;