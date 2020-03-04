import React from 'react';
import CryptoJS from 'crypto-js';
import { Grid, Header, Segment } from 'semantic-ui-react';

const TextCredential = ({ credential }) => {
	const key = sessionStorage.getItem('key');
	return (
		<>
			<Grid.Row>
				<Grid.Column width={2}>
					<Header
						as='h3'
						style={{ fontWieght: 'normal', padding: '0.7em' }}
					>
						{'Label'}
					</Header>
				</Grid.Column>
				<Grid.Column width={6}>
					<Segment
						as='h3'
						style={{
							fontWieght: 'normal',
							backgroundColor: '#e3e3e3',
							padding: '0.7em'
						}}
					>
						{CryptoJS.AES.decrypt(credential.label, key).toString(
							CryptoJS.enc.Utf8
						)}
					</Segment>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Header
						as='h3'
						style={{ fontWieght: 'normal', padding: '0.7em' }}
					>
						{'Notes'}
					</Header>
				</Grid.Column>
				<Grid.Column width={6}>
					<Segment
						as='h3'
						style={{
							fontWieght: 'normal',
							backgroundColor: '#e3e3e3',
							padding: '0.7em'
						}}
					>
						{CryptoJS.AES.decrypt(credential.notes, key).toString(
							CryptoJS.enc.Utf8
						).length > 0
							? CryptoJS.AES.decrypt(
									credential.notes,
									key
							  ).toString(CryptoJS.enc.Utf8)
							: '-'}
					</Segment>
				</Grid.Column>
			</Grid.Row>
		</>
	);
};

export default TextCredential;
