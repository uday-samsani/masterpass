import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Dropdown, Confirm } from 'semantic-ui-react';

import {
	FETCH_CARDS_QUERY,
	FETCH_PASSWORDS_QUERY,
	FETCH_TEXTS_QUERY,
	REMOVE_PASSWORD_MUTATION,
	REMOVE_CARD_MUTATION,
	REMOVE_TEXT_MUTATION
} from '../util/graphql';
import MyPopup from '../util/MyPopup';

const DeletePassword = ({ passwordId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deletePassword] = useMutation(REMOVE_PASSWORD_MUTATION, {
		update(proxy) {
			setConfirmOpen(false);
			const data = proxy.readQuery({
				query: FETCH_PASSWORDS_QUERY
			});
			data.getPasswords = data.getPasswords.filter(
				p => p._id !== passwordId
			);
			proxy.writeQuery({ query: FETCH_PASSWORDS_QUERY, data });
			if (callback) callback();
		},
		variables: {
			passwordId
		}
	});
	return (
		<>
			<MyPopup content={'Delete credential'}>
				<Dropdown.Item
					icon='trash'
					text='Delete'
					onClick={() => setConfirmOpen(true)}
				/>
			</MyPopup>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deletePassword}
			/>
		</>
	);
};

const DeleteCard = ({ cardId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deleteCard] = useMutation(REMOVE_CARD_MUTATION, {
		update(proxy) {
			setConfirmOpen(false);
			const data = proxy.readQuery({
				query: FETCH_CARDS_QUERY
			});
			data.getPasswords = data.getCards.filter(p => p._id !== cardId);
			proxy.writeQuery({ query: FETCH_CARDS_QUERY, data });
			if (callback) callback();
		},
		variables: {
			cardId
		}
	});
	return (
		<>
			<MyPopup content={'Delete credential'}>
				<Dropdown.Item
					icon='trash'
					text='Delete'
					onClick={() => setConfirmOpen(true)}
				/>
			</MyPopup>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deleteCard}
			/>
		</>
	);
};

const DeleteText = ({ textId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deleteText] = useMutation(REMOVE_TEXT_MUTATION, {
		update(proxy) {
			setConfirmOpen(false);
			const data = proxy.readQuery({
				query: FETCH_TEXTS_QUERY
			});
			data.getPasswords = data.getTexts.filter(p => p._id !== textId);
			proxy.writeQuery({ query: FETCH_TEXTS_QUERY, data });
			if (callback) callback();
		},
		variables: {
			textId
		}
	});
	return (
		<>
			<MyPopup content={'Delete credential'}>
				<Dropdown.Item
					icon='trash'
					text='Delete'
					onClick={() => setConfirmOpen(true)}
				/>
			</MyPopup>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deleteText}
			/>
		</>
	);
};

export { DeletePassword, DeleteCard, DeleteText };
