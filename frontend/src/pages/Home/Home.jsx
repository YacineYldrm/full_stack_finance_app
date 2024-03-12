import Navbar from '../../components/Navbar/Navbar';
import './Home.scss';

const Home = ({ provider }) => {
	console.log(provider);
	return (
		<main className='home'>
			<Navbar />
		</main>
	);
};

export default Home;
