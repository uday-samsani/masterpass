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

const DeleteCredential = ({ credId, credType, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const query =
		credType === 'Password'
			? FETCH_PASSWORDS_QUERY
			: credType === 'Card'
			? FETCH_CARDS_QUERY
			: FETCH_TEXTS_QUERY;
	const mutation =
		credType === 'password'
			? REMOVE_PASSWORD_MUTATION
			: credType === 'card'
			? REMOVE_CARD_MUTATION
			: REMOVE_TEXT_MUTATION;

	const [deletePostOrMutation] = useMutation(mutation, {
		update(proxy) {
			setConfirmOpen(false);
			const data = proxy.readQuery({
				query: query
			});
			credType === 'password'
				? (data.getPasswords = data.getPasswords.filter(
						p => p._id !== credId
				  ))
				: credType === 'card'
				? (data.getCards = data.getCards.filter(p => p._id !== credId))
				: (data.getTexts = data.getTexts.filter(p => p._id !== credId));

			proxy.writeQuery({ query: query, data });
			if (callback) callback();
		},
		variables: {
			credId
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
				onConfirm={deletePostOrMutation}
			/>
		</>
	);
};

export default DeleteCredential;
