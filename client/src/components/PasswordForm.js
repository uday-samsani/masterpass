import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import CryptoJS from 'crypto-js';
import { Button, Form, Icon, Input } from 'semantic-ui-react';

import { useForm } from '../util/hooks';
import { FETCH_PASSWORDS_QUERY, ADD_PASSWORD_MUTATION } from '../util/graphql';

function PasswordForm() {
	const key = sessionStorage.getItem('key');
	const { values, onChange, onSubmit } = useForm(addPasswordCallback, {
		label: '',
		username: '',
		password: '',
		website: '',
		notes: ''
	});

	const [addPassword, { error }] = useMutation(ADD_PASSWORD_MUTATION, {
		variables: {
			label: CryptoJS.AES.encrypt(values.label, key).toString(),
			username: CryptoJS.AES.encrypt(values.username, key).toString(),
			password: CryptoJS.AES.encrypt(values.password, key).toString(),
			website: CryptoJS.AES.encrypt(values.website, key).toString(),
			notes: CryptoJS.AES.encrypt(values.notes, key).toString()
		},
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_PASSWORDS_QUERY
			});
			data.getPasswords = [result.data.addPassword, ...data.getPasswords];
			proxy.writeQuery({ query: FETCH_PASSWORDS_QUERY, data });
			values.label = '';
			values.username = '';
			values.password = '';
			values.website = '';
			values.notes = '';
		}
	});

	function addPasswordCallback() {
		console.log(CryptoJS.AES.encrypt(values.label, key));
		addPassword();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Add Password</h2>
				<Form.Field>
					<Form.Input
						placeholder='Label'
						name='label'
						onChange={onChange}
						value={values.label}
						error={error ? true : false}
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						placeholder='John Doe'
						name='username'
						onChange={onChange}
						value={values.username}
						error={error ? true : false}
					/>
				</Form.Field>
				<Form.Field>
					<Input
						id='password'
						placeholder='*******'
						name='password'
						type='password'
						onChange={onChange}
						value={values.password}
						error={error ? true : false}
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						placeholder='www.johndoe.com'
						name='website'
						onChange={onChange}
						value={values.website}
						error={error ? true : false}
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						placeholder='Abcd'
						name='notes'
						onChange={onChange}
						value={values.notes}
						error={error ? true : false}
					/>
				</Form.Field>
				<Form.Field>
					<Button type='submit' color='teal'>
						<Icon name='plus' />
						Add
					</Button>
				</Form.Field>
			</Form>
			{error && (
				<div className='ui error message' style={{ marginBottom: 20 }}>
					<ul className='list'>
						<li>{error.graphQLErrors[0].message}</li>
					</ul>
				</div>
			)}
		</>
	);
}

export default PasswordForm;
