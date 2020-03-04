import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';

const CardCredential = ({ credential }) => {
	const key = sessionStorage.getItem('key');
	const [showCard, setShowCard] = useState(false);
	const hadndleOnClickShow = () => {
		setShowCard(!showCard);
	};
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
						{'Name of the card holder'}
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
						{CryptoJS.AES.decrypt(
							credential.cardHolderName,
							key
						).toString(CryptoJS.enc.Utf8)}
					</Segment>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Header
						as='h3'
						style={{ fontWieght: 'normal', padding: '0.7em' }}
					>
						{'Card type'}
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
						{CryptoJS.AES.decrypt(
							credential.cardType,
							key
						).toString(CryptoJS.enc.Utf8)}
					</Segment>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Header
						as='h3'
						style={{ fontWieght: 'normal', padding: '0.7em' }}
					>
						{'Card expiry'}
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
						{CryptoJS.AES.decrypt(credential.expiry, key).toString(
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
						{'CVV'}
					</Header>
				</Grid.Column>
				<Grid.Column width={6}>
					<Segment
						style={{
							backgroundColor: '#e3e3e3',
							padding: '0'
						}}
						clearing
					>
						<Header
							as='h3'
							style={{
								fontWieght: 'normal',
								marginBottom: '0',
								paddingTop: '0.7em',
								paddingLeft: '0.7em'
							}}
							floated='left'
						>
							{showCard
								? CryptoJS.AES.decrypt(
										credential.cvv,
										key
								  ).toString(CryptoJS.enc.Utf8)
								: '*'.repeat(
										CryptoJS.AES.decrypt(
											credential.cvv,
											key
										).toString(CryptoJS.enc.Utf8).length
								  )}
						</Header>
						<Header
							as='h5'
							floated='right'
							style={{ padding: '0.7em' }}
						>
							<Icon
								name='eye'
								onClick={hadndleOnClickShow}
								size='small'
							/>
						</Header>
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

export default CardCredential;
