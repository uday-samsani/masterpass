import React from 'react';

import { Container, Grid, Header, Image } from 'semantic-ui-react';
import { RegisterForm } from '../components/Form';

import RegisterIllustration from '../images/registerillustration.png';

const Register = props => {
	return (
		<Grid columns={2} fluid style={{ height: '100vh', margin: '0' }}>
			<Grid.Row style={{ margin: '0', padding: '0' }}>
				<Grid.Column style={{ backgroundColor: '#FFE0D4' }}>
					<Container style={{ padding: '4em' }}>
						<Header
							as='h1'
							textAlign='center'
							style={{
								fontSize: '2.5em',
								padding: '1em',
								color: '#4B2728'
							}}
						>
							Register
						</Header>
						<RegisterForm />
					</Container>
				</Grid.Column>
				<Grid.Column style={{ backgroundColor: '#FFF9F7' }}>
					<Container style={{ padding: '5em' }} textAlign='center'>
						<Image
							src={RegisterIllustration}
							verticalAlign='middle'
							rounded
							size='big'
						/>
						<Header
							as='h1'
							style={{
								color: '#4737EE',
								fontSize: '3em',
								padding: '0 1em'
							}}
						>
							Glad to have you on board
						</Header>
					</Container>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Register;
