const Button = ({btnContent,btnFunction}) => {
    return ( 
        
        <button onClick={btnFunction}>{btnContent}</button>
        
     );
}
 
export default Button;