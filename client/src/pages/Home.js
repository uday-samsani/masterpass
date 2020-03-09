import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Header, Grid, Container } from 'semantic-ui-react';
import HomeIllustration from '../images/homeillustration.png';

const Home = props => {
	return (
		<Grid style={{ padding: '10em 0' }}>
			<Grid.Row>
				<Grid.Column width={8}>
					<Container style={{ padding: '5em 0' }}>
						<Header
							as='h1'
							style={{ color: '#4E3681', fontSize: '3em' }}
						>
							Master the art of maintaining the passwords
						</Header>
						<Header
							as='p'
							style={{ fontWeight: '400', fontSize: '1.5em' }}
						>
							In this digital age, a password is the key for all
							your data. Maintaining several passwords can be
							tough hence a manager would be effective and secure.
						</Header>
						{/* <Header
							as='h3'
							style={{
								fontWeight: '500',
								color: '#DB6C54',
								fontSize: '1.75em'
							}}
						>
							One key to rule them all
						</Header> */}
						<Link to='/register'>
							<Button color='purple' basic size='large'>
								{'Get started'}
							</Button>
						</Link>
					</Container>
				</Grid.Column>
				<Grid.Column width={8}>
					<Image src={HomeIllustration} size='huge' />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Home;
