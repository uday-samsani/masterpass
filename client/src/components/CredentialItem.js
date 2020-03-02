import React from 'react';
import { Dropdown, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import DeleteCredential from './DeleteCredential';

const CredentialItem = ({ credential }) => {
	const key = sessionStorage.getItem('key');
	const capitalize = str => {
		if (typeof str === 'string') {
			return str.replace(/^\w/, c => c.toUpperCase());
		} else {
			return '';
		}
	};

	const credType = credential
		? credential.username !== null && credential.username !== undefined
			? 'password'
			: credential.cardNumber !== null &&
			  credential.cardNumber !== undefined
			? 'card'
			: 'text'
		: null;

	return credential ? (
		<List.Item>
			<List.Content floated={'right'}>
				<Dropdown
					icon='ellipsis vertical'
					direction='left'
					pointing={'top right'}
					closeOnChange
				>
					<Dropdown.Menu>
						<Dropdown.Item icon='edit outline' text='Edit' />
						<DeleteCredential
							credId={credential._id}
							credType={credType}
						/>
					</Dropdown.Menu>
				</Dropdown>
			</List.Content>
			<List.Content
				as={Link}
				to={{
					pathname: '/credential',
					state: {
						credId: credential._id,
						credType: credType
					}
				}}
			>
				<List.Header>
					<List.Icon
						name={
							credential.username !== null &&
							credential.username !== undefined
								? 'key'
								: credential.cardNumber !== null &&
								  credential.cardNumber !== undefined
								? 'credit card'
								: 'text cursor'
						}
						verticalAlign='middle'
					/>
					<span style={{ padding: '0 1em ' }}>
						{capitalize(
							CryptoJS.AES.decrypt(
								credential.label,
								key
							).toString(CryptoJS.enc.Utf8)
						)}
					</span>
				</List.Header>
				<List.Description style={{ padding: '0.5em 1em' }}>
					{credential.username !== null &&
					credential.username !== undefined
						? 'username: ' +
						  CryptoJS.AES.decrypt(
								credential.username,
								key
						  ).toString(CryptoJS.enc.Utf8)
						: credential.cardNumber !== null &&
						  credential.cardNumber !== undefined
						? 'card no: ' +
						  CryptoJS.AES.decrypt(
								credential.cardNumber,
								key
						  ).toString(CryptoJS.enc.Utf8)
						: 'text'}
				</List.Description>
			</List.Content>
		</List.Item>
	) : null;
};

export default CredentialItem;
