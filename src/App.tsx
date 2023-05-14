import { useState, useEffect, ChangeEvent } from 'react';

import CardList from './components/card-list/card-list.comp';
import SearchBox from './components/search-box/search-box.comp';
import { getData } from './utils/data.utils';

import './App.css';

export type Player = {
	id: string;
	name: string;
	club: string;
};

// Best Football Players
const App = () => {
	const [title, setTitle] = useState('Best Players 2022');
	const [searchField, setSearchField] = useState('');
	const [players, setPlayers] = useState<Player[]>([]);
	const [filteredPlayers, setFilteredPlayers] = useState(players);

	console.log('rendered');

	useEffect(() => {
		const fetchPlayers = async () => {
			const users = await getData<Player[]>('http://localhost:8000/players');
			setPlayers(users);
		};

		fetchPlayers()
	}, []);

	useEffect(() => {
		const newFilteredPlayers = players.filter((player) => {
			return player.name.toLocaleLowerCase().includes(searchField);
		});

		setFilteredPlayers(newFilteredPlayers);
	}, [players, searchField]);

	const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	};

	const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const searchFieldString = event.target.value;
		setTitle(searchFieldString);
	};

	return (
		<div className='App'>
			<h1 className='app-title'>{title}</h1>
			<SearchBox
				onChangeHandler={onSearchChange}
				placeholder='search players'
				className='players-search-box'
			/>
			<SearchBox
				onChangeHandler={onTitleChange}
				placeholder='change title'
				className='players-search-box'
			/>
			<CardList players={filteredPlayers} />
		</div>
	);
};

// class App extends Component {
// 	constructor() {
// 		super();

// 		this.state = {
// 			players: [],
// 			searchField: '',
// 		};
// 	}

// componentDidMount() {
//     fetch('http://localhost:8000/players')
// 		.then((response) => response.json())
// 		.then((el) =>
// 			this.setState(
// 				() => {
// 					return { players: el };
// 				}
// 			)
// 		);
// }

// 	onSearchChange = (event) => {
// 		const searchField = event.target.value.toLocaleLowerCase();
// 		this.setState(() => {
// 			return { searchField };
// 		});
// 	};

// 	render() {

// 		const { players, searchField } = this.state;
// 		const { onSearchChange } = this;

// 		const filteredplayers = players.filter((player) => {
// 			return player.name.toLocaleLowerCase().includes(searchField);
// 		});

// 		return (
// 			<div className='App'>
//         <h1 className='app-title'>Best Football Players</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder='search players' className='players-search-box'/>
//         <CardList players={filteredplayers} />
// 			</div>
// 		);
// 	}
// }

export default App;
