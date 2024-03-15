import './Button.scss';

const Button = ({ btnContent, btnFunction }) => {
	return (
		<button
			className='button'
			onClick={() => btnFunction()}>
			{btnContent}
		</button>
	);
};

export default Button;
