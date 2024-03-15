import './ModalSure.scss'

const ModalSure = ({setModalSure, yesFunc, content}) => {
    return ( 
        <>
        <section className="modalsure">
            <article>
                <div>
                    <p>{content}</p>
                    <div>
                        <button onClick={()=>yesFunc()}>yes</button>
                        <button onClick={()=>setModalSure(false)}>no</button>
                    </div>
                </div>
            </article>
        </section>
        </>
     );
}
 
export default ModalSure;