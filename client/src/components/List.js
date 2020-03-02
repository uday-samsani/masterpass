import React from 'react';
import CryptoJS from 'crypto-js';
import { Dropdown, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import DeleteCredential from './DeleteCredential';

const key = sessionStorage.getItem('key');

const capitalize = str => {
	if (typeof str === 'string') {
		return str.replace(/^\w/, c => c.toUpperCase());
	} else {
		return '';
	}
};

const PasswordsList = ({ passwords }) => {
	return (
		<List>
			{passwords &&
				passwords.map((password, index) => (
					<List.Item key={index}>
						<List.Content floated={'right'}>
							<Dropdown
								icon='ellipsis vertical'
								direction='left'
								pointing={'top right'}
								closeOnChange
							>
								<Dropdown.Menu>
									<Dropdown.Item
										icon='edit outline'
										text='Edit'
									/>
									<DeleteCredential
										credId={password._id}
										credType={password.__typename}
									/>
								</Dropdown.Menu>
							</Dropdown>
						</List.Content>
						<List.Content
							as={Link}
							to={`/passwords/${password._id}`}
						>
							<List.Header>
								<List.Icon name='key' verticalAlign='middle' />
								{capitalize(
									CryptoJS.AES.decrypt(
										password.label,
										key
									).toString(CryptoJS.enc.Utf8)
								)}
							</List.Header>
							<List.Description>
								{'Username: ' +
									CryptoJS.AES.decrypt(
										password.notes,
										key
									).toString(CryptoJS.enc.Utf8)}
							</List.Description>
						</List.Content>
					</List.Item>
				))}
		</List>
	);
};

const CardsList = ({ cards }) => {
	return (
		<List>
			{cards &&
				cards.map((card, index) => (
					<List.Item key={index}>
						<List.Content floated={'right'}>
							<Dropdown
								icon='ellipsis vertical'
								direction='left'
								pointing={'top right'}
								closeOnChange
							>
								<Dropdown.Menu>
									<Dropdown.Item
										icon='edit outline'
										text='Edit'
									/>
									<DeleteCredential
										credId={card._id}
										credType={card.__typename}
									/>
								</Dropdown.Menu>
							</Dropdown>
						</List.Content>
						<List.Content as={Link} to={`/cards/${card._id}`}>
							<List.Header>
								<List.Icon
									name='credit card'
									verticalAlign='middle'
								/>
								{capitalize(
									CryptoJS.AES.decrypt(
										card.label,
										key
									).toString(CryptoJS.enc.Utf8)
								)}
							</List.Header>
							<List.Description>
								{'Card number: ' +
									CryptoJS.AES.decrypt(
										card.cardNumber,
										key
									).toString(CryptoJS.enc.Utf8)}
							</List.Description>
						</List.Content>
					</List.Item>
				))}
		</List>
	);
};

const TextsList = ({ texts, key }) => {
	return (
		<List>
			{texts &&
				texts.map((text, index) => (
					<List.Item key={index}>
						<List.Content floated={'right'}>
							<Dropdown
								icon='ellipsis vertical'
								direction='left'
								pointing={'top right'}
								closeOnChange
							>
								<Dropdown.Menu>
									<Dropdown.Item
										icon='edit outline'
										text='Edit'
									/>
									<DeleteCredential
										credId={text._id}
										credType={text.__typename}
									/>
								</Dropdown.Menu>
							</Dropdown>
						</List.Content>
						<List.Content as={Link} to={`/texts/${text._id}`}>
							<List.Header>
								<List.Icon
									name='text cursor'
									verticalAlign='middle'
								/>
								{capitalize(
									CryptoJS.AES.decrypt(
										text.label,
										key
									).toString(CryptoJS.enc.Utf8)
								)}
							</List.Header>
							<List.Description>{'Text'}</List.Description>
						</List.Content>
					</List.Item>
				))}
		</List>
	);
};

export { PasswordsList, CardsList, TextsList };
