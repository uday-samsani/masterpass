import React from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import CryptoJS from 'crypto-js';

import { useForm } from '../util/hooks';
import { FETCH_TEXTS } from '../util/graphql';

function TextForm() {
	const key = sessionStorage.getItem('key');

	const { values, onChange, onSubmit } = useForm(addTextCallback, {
		label: '',
		notes: ''
	});

	const [addText, { error }] = useMutation(ADD_TEXT, {
		variables: {
			label: CryptoJS.AES.encrypt(values.label, key).toString(),
			notes: CryptoJS.AES.encrypt(values.notes, key).toString()
		},
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_TEXTS
			});
			data.getTexts = [result.data.addText, ...data.getTexts];
			proxy.writeQuery({ query: FETCH_TEXTS, data });
			values.label = '';
			values.notes = '';
		}
	});

	function addTextCallback() {
		addText();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Add Text</h2>
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

const ADD_TEXT = gql`
	mutation addText($label: String!, $notes: String) {
		addText(textInput: { label: $label, notes: $notes }) {
			_id
			label
			notes
		}
	}
`;

export default TextForm;
