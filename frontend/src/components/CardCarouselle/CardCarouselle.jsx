import {
	Card,
	useEffect,
	useMemo,
	_,
	changeCardOnSwipe,
	updateArray,
} from '../../utils/files';

const CardCourouselle = ({ provider }) => {
	// --------------------Renders on Load-----------------------
	//                   Sets the Active Card
	// ----------------------------------------------------------

	useEffect(() => {
		updateArray(provider);
	}, []);

	// --------------------Renders on scroll---------------------
	//stops toomany renders on Scroll and triggers the Handler on scroll end usind use Memo and loeDash
	// ----------------------------------------------------------

	const handleScroll = (e) => {
		handleEndScroll();
	};

	const handleEndScroll = useMemo(
		() =>
			_.debounce(() => {
				provider?.setActiveCard(changeCardOnSwipe(provider));
				provider?.setCardIndex(changeCardOnSwipe(provider));
			}, 500),
		[provider],
	);

	// ---------------------------------------------------------------------

	return (
		<article
			onScroll={(e) => handleScroll(e)}
			className='cards_carouselle_wrapper'
			id='carouselle'>
			{provider?.accounts?.map((account) => {
				return (
					<Card
						key={account._id}
						cardId={account._id}
						provider={provider}
						account={account}
					/>
				);
			})}
		</article>
	);
};

export default CardCourouselle;
