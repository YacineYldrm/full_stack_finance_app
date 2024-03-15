import './ModalSure.scss'

const ModalSure = ({setModalSure, yesFunc, content}) => {
    return ( 
        <>
        <section className="modalsure">
            <article className='modalsureart'>
                
                    <p>{content}</p>
                    <div className='modalsurediv'>
                        <button onClick={()=>yesFunc()}>yes</button>
                        <button onClick={()=>setModalSure(false)}>no</button>
                    </div>
                
            </article>
        </section>
        </>
     );
}
 
export default ModalSure;