const Arrow = ({onClick}) => {
	return (
		<svg
		onClick={onClick}
			xmlns='http://www.w3.org/2000/svg'
			width='8'
			height='14'
			viewBox='0 0 8 14'
			fill='none'>
			<path
				d='M7 13L1 7L7 1'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default Arrow;
