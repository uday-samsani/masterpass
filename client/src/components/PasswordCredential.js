import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';

const PasswordCredential = ({ credential }) => {
	const key = sessionStorage.getItem('key');
	const [showPassword, setShowPassword] = useState(false);
	const hadndleOnClickShow = (e, data) => {
		setShowPassword(!showPassword);
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
						{'Username'}
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
							credential.username,
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
						{'Password'}
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
							{showPassword
								? CryptoJS.AES.decrypt(
										credential.password,
										key
								  ).toString(CryptoJS.enc.Utf8)
								: '*'.repeat(
										CryptoJS.AES.decrypt(
											credential.password,
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

export default PasswordCredential;
