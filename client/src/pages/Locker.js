import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

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
					<h1>Loading passwords..</h1>
				) : (
					<Transition.Group>
						{passwords &&
							passwords.map(password => (
								<Grid.Column
									key={password.id}
									style={{ marginBottom: 20 }}
								>
									<p>{password.label}</p>
								</Grid.Column>
							))}
					</Transition.Group>
				)}
			</Grid.Row>
		</Grid>
	);
}

export default Locker;
