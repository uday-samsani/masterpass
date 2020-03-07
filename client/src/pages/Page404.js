import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Image, Button } from 'semantic-ui-react';

import Page404Image from '../images/page404.png';

const Page404 = () => {
	return (
		<Container textAlign='center' style={{ padding: '10em' }}>
			<Image src={Page404Image} size={'big'} centered />
			<Header as='h1' style={{ fontSize: '3em' }} color='blue'>
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
