import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, List, Segment, Loader } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { FETCH_PASSWORDS } from '../util/graphql';

function Locker() {
	const { user } = useContext(AuthContext);
	const {
		loading,
		data: { getPasswords: passwords }
	} = useQuery(FETCH_PASSWORDS);

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
								<List.Item key={index}>
									<List.Icon
										name='key'
										size='large'
										verticalAlign='middle'
									/>
									<List.Content>
										<List.Header as='a'>
											{pwd.label}
										</List.Header>
										<List.Description as='a'>
											{pwd.password}
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
