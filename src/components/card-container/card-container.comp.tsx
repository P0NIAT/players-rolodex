import { Player } from '../../App';

import './card-container.style.css';

type CardConatainerProps = {
	player: Player;
};

const CardConatainer = ({
	player: { id, name, club }
}: CardConatainerProps) => (
	<div className='card-container'>
		<img alt={`player ${name}`} src={`../../../img/${id}.jpg`} />
		<h2>{name}</h2>
		<h4>{club}</h4>
	</div>
);

export default CardConatainer;
