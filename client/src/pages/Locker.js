/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
	Grid,
	List,
	Segment,
	Loader,
	Container,
	Button,
	Icon,
	Modal,
	Form
} from 'semantic-ui-react';
import CryptoJS from 'crypto-js';

import PasswordForm from '../components/PasswordForm';
import CardForm from '../components/CardForm';
import GeneralForm from '../components/GeneralForm';
import { AuthContext } from '../context/auth';
import { FETCH_PASSWORDS, FETCH_CARDS, FETCH_GENERALS } from '../util/graphql';

const AddCredentials = () => {
	const [addBtnVisibility, setAddBtnVisibility] = useState(false);

	const [passwordModal, setPasswordModal] = useState(false);
	const [cardModal, setCardModal] = useState(false);
	const [generalModal, setGeneralModal] = useState(false);

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

	const handleGeneralModalOpen = e => {
		setGeneralModal(true);
	};
	const handleOnCloseGeneralModal = e => {
		setGeneralModal(false);
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
							onClick={handleGeneralModalOpen}
						>
							<Icon name='text cursor' />
							General
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
				open={generalModal}
				onClose={handleOnCloseGeneralModal}
				size='small'
				closeIcon
			>
				<Modal.Content>
					<GeneralForm />
				</Modal.Content>
			</Modal>
		</>
	);
};

const Locker = () => {
	const { user } = useContext(AuthContext);
	const key = sessionStorage.getItem('key');
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
		data: { getGenerals: generals }
	} = useQuery(FETCH_GENERALS);

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
		if (generals !== undefined) {
			generals.map(general => {
				temp.push(general);
			});
		}
		setCredentials(Array.from(new Set(temp)));
	}, [cards, passwords, generals]);
	return (
		<Grid columns={3}>
			<Grid.Row className='page-title'>
				<h1>Locker</h1>
			</Grid.Row>
			<AddCredentials />
			<Grid.Row style={{ padding: '0.1em' }}>
				{loading1 && loading2 && loading3 ? (
					<Segment>
						<Loader inverted />
					</Segment>
				) : (
					<List divided relaxed>
						{credentials.sort().map(c => {
							return (
								<List.Item
									key={c._id}
									as={Container}
									style={{ padding: '1em' }}
								>
									<List.Icon
										name={
											c.username !== null &&
											c.username !== undefined
												? 'key'
												: c.cardNumber !== null &&
												  c.cardNumber !== undefined
												? 'credit card'
												: 'text cursor'
										}
										size='large'
										verticalAlign='middle'
										style={{ padding: '0.5em' }}
									/>
									<List.Content
										style={{
											padding: '0.5em'
										}}
									>
										<List.Header
											as='h3'
											style={{ padding: '0.25em 0.5em' }}
										>
											{CryptoJS.AES.decrypt(
												c.label,
												key
											).toString(CryptoJS.enc.Utf8)}
										</List.Header>
										<List.Description
											as='h4'
											style={{
												margin: '0',
												padding: '0.25em 0.5em'
											}}
										>
											{c.username !== null &&
											c.username !== undefined
												? 'username: ' +
												  CryptoJS.AES.decrypt(
														c.username,
														key
												  ).toString(CryptoJS.enc.Utf8)
												: c.cardNumber !== null &&
												  c.cardNumber !== undefined
												? 'card no: ' +
												  CryptoJS.AES.decrypt(
														c.cardNumber,
														key
												  ).toString(CryptoJS.enc.Utf8)
												: 'general'}
										</List.Description>
									</List.Content>
								</List.Item>
							);
						})}
					</List>
				)}
			</Grid.Row>
		</Grid>
	);
};

export default Locker;
