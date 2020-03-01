/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
	Button,
	Container,
	Grid,
	Icon,
	List,
	Loader,
	Modal,
	Segment
} from 'semantic-ui-react';

import PasswordForm from '../components/PasswordForm';
import CardForm from '../components/CardForm';
import TextForm from '../components/TextForm';
import CredentialItem from '../components/CredentialItem';

import { AuthContext } from '../context/auth';
import { FETCH_PASSWORDS, FETCH_CARDS, FETCH_TEXTS } from '../util/graphql';

const AddCredentials = () => {
	const [addBtnVisibility, setAddBtnVisibility] = useState(false);

	const [passwordModal, setPasswordModal] = useState(false);
	const [cardModal, setCardModal] = useState(false);
	const [textModal, setTextModal] = useState(false);

	const handleAddBtn = e => {
		setAddBtnVisibility(!addBtnVisibility);
	};

	const handlePasswordModalOpen = e => {
		setPasswordModal(true);
	};
	const handleOnClosePasswordModal = e => {
		setPasswordModal(false);
	};

	const handleCardModalOpen = e => {
		setCardModal(true);
	};
	const handleOnCloseCardModal = e => {
		setCardModal(false);
	};

	const handleTextModalOpen = e => {
		setTextModal(true);
	};
	const handleOnCloseTextModal = e => {
		setTextModal(false);
	};

	return (
		<>
			<Grid.Row
				className='page-title'
				style={{ padding: '0.25em', margin: 0 }}
			>
				{addBtnVisibility ? (
					<Button.Group style={{ margin: ' 0 1em' }}>
						<Button
							basic
							color={'blue'}
							onClick={handlePasswordModalOpen}
						>
							<Icon name='key' />
							Password
						</Button>
						<Button
							basic
							color={'purple'}
							onClick={handleCardModalOpen}
						>
							<Icon name='credit card' />
							Card
						</Button>
						<Button
							basic
							color={'violet'}
							onClick={handleTextModalOpen}
						>
							<Icon name='text cursor' />
							Text
						</Button>
					</Button.Group>
				) : null}
				<Button
					basic
					icon
					onClick={handleAddBtn}
					style={{ margin: '0 1em' }}
					color={'teal'}
				>
					<Icon name={addBtnVisibility ? 'close' : 'plus'} />
				</Button>
			</Grid.Row>
			<Modal
				open={passwordModal}
				onClose={handleOnClosePasswordModal}
				size='small'
				closeIcon
			>
				<Modal.Content>
					<PasswordForm />
				</Modal.Content>
			</Modal>
			<Modal
				open={cardModal}
				onClose={handleOnCloseCardModal}
				size='small'
				closeIcon
			>
				<Modal.Content>
					<CardForm />
				</Modal.Content>
			</Modal>
			<Modal
				open={textModal}
				onClose={handleOnCloseTextModal}
				size='small'
				closeIcon
			>
				<Modal.Content>
					<TextForm />
				</Modal.Content>
			</Modal>
		</>
	);
};

const Locker = () => {
	useContext(AuthContext);
	const [credentials, setCredentials] = useState([]);
	const {
		loading1,
		data: { getPasswords: passwords }
	} = useQuery(FETCH_PASSWORDS);
	const {
		loading2,
		data: { getCards: cards }
	} = useQuery(FETCH_CARDS);
	const {
		loading3,
		data: { getTexts: texts }
	} = useQuery(FETCH_TEXTS);

	useEffect(() => {
		let temp = credentials;
		if (passwords !== undefined) {
			passwords.map(pwd => {
				temp.push(pwd);
			});
		}
		if (cards !== undefined) {
			cards.map(card => {
				temp.push(card);
			});
		}
		if (texts !== undefined) {
			texts.map(text => {
				temp.push(text);
			});
		}
		setCredentials(Array.from(new Set(temp)));
	}, [cards, passwords, texts]);
	return (
		<Grid>
			<Grid.Row className='page-title'>
				<h1>Locker</h1>
			</Grid.Row>
			<AddCredentials />
			<Grid.Row style={{ padding: '0.1em' }}>
				{loading1 || loading2 || loading3 ? (
					<Segment>
						<Loader inverted />
					</Segment>
				) : (
					<Container style={{ padding: '0 2em' }}>
						<List divided relaxed size={'big'}>
							{credentials.sort().map((credential, index) => {
								return (
									<CredentialItem
										credential={credential}
										key={index}
									/>
								);
							})}
						</List>
					</Container>
				)}
			</Grid.Row>
		</Grid>
	);
};

export default Locker;
