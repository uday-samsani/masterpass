import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, List, Segment, Loader, Container } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { FETCH_PASSWORDS, FETCH_CARDS, FETCH_GENERALS } from '../util/graphql';

function Locker() {
	const { user } = useContext(AuthContext);
	const {
		loading,
		data: { getPasswords: passwords }
	} = useQuery(FETCH_PASSWORDS);
	const {
		loading,
		data: { getCards: cards }
	} = useQuery(FETCH_CARDS);
	const {
		loading,
		data: { getGenerals: generals }
	} = useQuery(FETCH_GENERALS);

	return (
		<Grid columns={3}>
			<Grid.Row className='page-title'>
				<h1>Locker</h1>
			</Grid.Row>
			<Grid.Row>
				{loading ? (
					<Segment>
						<Loader inverted />
					</Segment>
				) : (
					<List divided relaxed>
						{passwords &&
							passwords.map((pwd, index) => (
								<List.Item
									key={index}
									as={Container}
									style={{ padding: '1em' }}
								>
									<List.Icon
										name='key'
										size='large'
										verticalAlign='middle'
										style={{ padding: '0.5em' }}
									/>
									<List.Content
										style={{
											padding: '0.5em'
										}}
									>
										<List.Header
											as='h3'
											style={{ padding: '0.5em' }}
										>
											{pwd.label}
										</List.Header>
										<List.Description
											as='h4'
											style={{
												margin: '0',
												padding: '0.5em'
											}}
										>
											{pwd.username}
										</List.Description>
									</List.Content>
								</List.Item>
							))}
					</List>
				)}
			</Grid.Row>
		</Grid>
	);
}

export default Locker;
