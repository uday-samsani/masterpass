import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import {
	Button,
	Grid,
	Input,
	Header,
	Label,
	Loader,
	TextArea,
	Form as SemanticForm
} from 'semantic-ui-react';

import {
	FETCH_PASSWORDS_QUERY,
	FETCH_PASSWORD_QUERY,
	UPDATE_PASSWORD_MUTATION
} from '../util/graphql';

import { encrypt, decrypt } from '../util/crypt';

function copyToClipboard(text) {
	var dummy = document.createElement('textarea');
	// to avoid breaking orgain page when copying more words
	// cant copy when adding below this code
	// dummy.style.display = 'none'
	document.body.appendChild(dummy);
	//Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
	dummy.value = text;
	dummy.select();
	document.execCommand('copy');
	document.body.removeChild(dummy);
}

const Password = props => {
	const passwordId = props.match.params.passwordId;
	const [showPassword, setShowPassword] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const {
		loading,
		data: { getPassword: password }
	} = useQuery(FETCH_PASSWORD_QUERY, {
		variables: {
			passwordId
		}
	});

	const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION);

	return (
		<>
			<Header as={'h1'}>{editMode ? 'Edit password' : 'Password'}</Header>
			{loading ? (
				<Loader inverted />
			) : (
				<Formik
					initialValues={{
						label: decrypt(password.label),
						username: decrypt(password.username),
						password: decrypt(password.password),
						website: decrypt(password.website),
						notes: decrypt(password.notes)
					}}
					onSubmit={(values, actions) => {
						actions.setSubmitting(true);
						updatePassword({
							variables: {
								passwordId: passwordId,
								label: encrypt(values.label),
								username: encrypt(values.username),
								password: encrypt(values.password),
								website: encrypt(values.website),
								notes: encrypt(values.notes)
							},
							update(proxy, result) {
								const data = proxy.readQuery({
									query: FETCH_PASSWORDS_QUERY
								});
								data.getPasswords = data.getPasswords.filter(
									password => password.id !== passwordId
								);
								data.getPasswords = [
									result.data.updatePassword,
									...data.getPasswords
								];
								data.getPassword = result.data.updatePassword;
								proxy.writeQuery({
									query: FETCH_PASSWORDS_QUERY,
									data
								});
							}
						});
						actions.setSubmitting(false);
					}}
				>
					<Form as={SemanticForm}>
						<Grid columns={2}>
							<Grid.Row>
								<Grid.Column>
									<Field
										as={Input}
										type='text'
										name='label'
										placeholder="JonDoe's Login"
										label={'Label'}
										labelPosition={'left'}
										size={'large'}
										fluid
										disabled={!editMode}
									/>
								</Grid.Column>
								<Grid.Column width={2} floated='right'>
									{!editMode ? (
										<Button
											onClick={() => {
												setEditMode(true);
											}}
										>
											Edit
										</Button>
									) : (
										<Button
											onClick={() => {
												setEditMode(false);
											}}
										>
											Cancel
										</Button>
									)}
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<Field
										as={Input}
										type='text'
										name='username'
										placeholder='Jon Doe'
										label={'Username'}
										labelPosition={'left'}
										size={'large'}
										fluid
										disabled={!editMode}
									/>
								</Grid.Column>
								<Grid.Column>
									<Grid>
										<Grid.Row>
											<Grid.Column width={12}>
												<Field
													as={Input}
													type={
														showPassword
															? 'text'
															: 'password'
													}
													name='password'
													placeholder='************'
													label={'Password'}
													labelPosition={'left'}
													size={'large'}
													fluid
													disabled={!editMode}
												/>
											</Grid.Column>
											<Grid.Column width={2}>
												<Field
													as={Button}
													type='button'
													icon={
														showPassword
															? 'eye slash'
															: 'eye'
													}
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
												/>
											</Grid.Column>
											<Grid.Column width={2}>
												<Field
													as={Button}
													type='button'
													icon='copy'
													onClick={() => {
														copyToClipboard(
															decrypt(
																password.password
															)
														);
														alert(
															'Password copied to clipboard.'
														);
													}}
												/>
											</Grid.Column>
										</Grid.Row>
									</Grid>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<Field
										type='url'
										name='website'
										as={Input}
										placeholder='www.abcd.com/'
										label={'Website'}
										labelPosition={'left'}
										size={'large'}
										fluid
										disabled={!editMode}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column as={SemanticForm}>
									<Label
										style={{
											borderRadius: '4px 4px 0 0'
										}}
										size={'medium'}
									>
										Notes
									</Label>
									<Field
										type='textarea'
										name='notes'
										as={TextArea}
										placeholder='Notes'
										disabled={!editMode}
										style={{
											borderRadius: '0 4px 4px 4px'
										}}
									/>
								</Grid.Column>
							</Grid.Row>
							{editMode ? (
								<Grid.Row>
									<Grid.Column>
										<Field as={Button} type='submit'>
											Submit
										</Field>
									</Grid.Column>
								</Grid.Row>
							) : null}
						</Grid>
					</Form>
				</Formik>
			)}
		</>
	);
};

export default Password;
