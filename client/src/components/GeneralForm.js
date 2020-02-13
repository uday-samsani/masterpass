import React from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import CryptoJS from 'crypto-js';

import { useForm } from '../util/hooks';
import { FETCH_GENERALS } from '../util/graphql';

function GeneralForm() {
	const key = sessionStorage.getItem('key');

	const { values, onChange, onSubmit } = useForm(addGeneralCallback, {
		label: '',
		text: '',
		notes: ''
	});

	const [addGeneral, { error }] = useMutation(ADD_GENERAL, {
		variables: {
			label: CryptoJS.AES.encrypt(values.label, key).toString(),
			text: CryptoJS.AES.encrypt(values.text, key).toString(),
			notes: CryptoJS.AES.encrypt(values.notes, key).toString()
		},
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_GENERALS
			});
			data.getGenerals = [result.data.addGeneral, ...data.getGenerals];
			proxy.writeQuery({ query: FETCH_GENERALS, data });
			values.label = '';
			values.text = '';
			values.notes = '';
		}
	});

	function addGeneralCallback() {
		addGeneral();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Add General</h2>
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
						placeholder='Text'
						name='text'
						onChange={onChange}
						value={values.text}
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
			{console.log(error)}
			{error && (
				<div className='ui error message' style={{ marginBottom: 20 }}>
					{console.log(error)}
					<ul className='list'>
						<li>{error.graphQLErrors[0].message}</li>
					</ul>
				</div>
			)}
		</>
	);
}

const ADD_GENERAL = gql`
	mutation addGeneral($label: String!, $text: String, $notes: String) {
		addGeneral(
			generalInput: { label: $label, text: $text, notes: $notes }
		) {
			_id
			label
			text
			notes
		}
	}
`;

export default GeneralForm;
