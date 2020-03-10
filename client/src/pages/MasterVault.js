/* eslint-disable */
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
	Button,
	Container,
	Grid,
	Header,
	Icon,
	Loader,
	Modal
} from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

import { PasswordForm, CardForm, TextForm } from '../components/Form';
import { PasswordsList, CardsList, TextsList } from '../components/List.js';

import {
	FETCH_PASSWORDS_QUERY,
	FETCH_CARDS_QUERY,
	FETCH_TEXTS_QUERY
} from '../util/graphql';

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

const MasterVault = () => {
	const {
		passwordLoading,
		data: { getPasswords: passwords }
	} = useQuery(FETCH_PASSWORDS_QUERY);
	const {
		cardLoading,
		data: { getCards: cards }
	} = useQuery(FETCH_CARDS_QUERY);
	const {
		textLoading,
		data: { getTexts: texts }
	} = useQuery(FETCH_TEXTS_QUERY);

	return (
		<Grid>
			<Grid.Row className='page-title'>
				<Header as='h1'>Master Vault</Header>
			</Grid.Row>
			<AddCredentials />
			<Grid.Row>
				<Grid as={Grid.Column} columns='equal' stackable padded>
					<Grid.Row>
						<Grid.Column>
							<Container
								style={{
									backgroundColor: '#E1EFF6',
									margin: '1em',
									padding: '1.5em'
								}}
							>
								<Header as='h3' textAlign='center'>
									Passwords
								</Header>
								<Container fluid>
									{passwordLoading ? (
										<Loader inverted />
									) : (
										<PasswordsList passwords={passwords} />
									)}
								</Container>
							</Container>
						</Grid.Column>
						<Grid.Column>
							<Container
								style={{
									backgroundColor: '#E1EFF6',
									margin: '1em',
									padding: '1.5em'
								}}
							>
								<Header as='h3' textAlign='center'>
									Cards
								</Header>
								<Container>
									{cardLoading ? (
										<Loader inverted />
									) : (
										<CardsList cards={cards} />
									)}
								</Container>
							</Container>
						</Grid.Column>
						<Grid.Column>
							<Container
								style={{
									backgroundColor: '#E1EFF6',
									margin: '1em',
									padding: '1.5em'
								}}
							>
								<Header as='h3' textAlign='center'>
									Text
								</Header>
								<Container>
									{textLoading ? (
										<Loader inverted />
									) : (
										<TextsList texts={texts} />
									)}
								</Container>
							</Container>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Grid.Row>
		</Grid>
	);
};

export default MasterVault;
