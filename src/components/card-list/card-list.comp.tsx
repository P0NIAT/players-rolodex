import { Player } from '../../App';
import CardConatainer from '../card-container/card-container.comp';
import './card-list.style.css';

type CardListProps = {
	players: Player[]
}

const CardList = ({ players }: CardListProps ) => (
		<div className='card-list'>
			{players.map((player) => {
				return <CardConatainer key={player.id} player={player}/>;
			})}
		</div>
	);

export default CardList;
