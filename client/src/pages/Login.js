import React from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';
import { LoginForm } from '../components/Form';

import LoginIllustration from '../images/loginillustration.png';

const Login = props => {
	return (
		<Grid columns={2} fluid style={{ height: '100vh', margin: '0' }}>
			<Grid.Row style={{ margin: '0', padding: '0' }}>
				<Grid.Column style={{ backgroundColor: '#F4FFF8' }}>
					<Container style={{ padding: '5em' }} textAlign='center'>
						<Image src={LoginIllustration} verticalAlign='middle' />
						<Header
							as='h1'
							style={{
								color: '#00AD9F',
								fontSize: '5em',
								padding: '1em'
							}}
						>
							Welcome back!
						</Header>
					</Container>
				</Grid.Column>
				<Grid.Column style={{ backgroundColor: '#C8EEFB' }}>
					<Container style={{ padding: '4em' }}>
						<Header
							as='h1'
							textAlign='center'
							style={{
								fontSize: '2.5em',
								padding: '1em',
								color: '#3f58d4'
							}}
						>
							Log In
						</Header>
						<LoginForm props={props} />
					</Container>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Login;
