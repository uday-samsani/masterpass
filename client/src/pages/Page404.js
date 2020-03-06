import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';

const Page404 = () => {
	return (
		<Container textAlign='center' style={{ padding: '10em' }}>
			<Header
				as='h1'
				style={{
					padding: 0,
					margin: 0,
					fontSize: '15em',
					color: '#151e3f'
				}}
			>
				404
			</Header>
			<Header as='h1' color='blue'>
				Page not found
			</Header>
			<Link to='/'>
				<Button basic color='blue' size='large'>
					Back to Home
				</Button>
			</Link>
		</Container>
	);
};

export default Page404;
