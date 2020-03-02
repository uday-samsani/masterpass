import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import CryptoJS from 'crypto-js';
import { Button, Form, Icon } from 'semantic-ui-react';

import { useForm } from '../util/hooks';
import { FETCH_TEXTS_QUERY, ADD_TEXT_MUTATION } from '../util/graphql';

function TextForm() {
	const key = sessionStorage.getItem('key');

	const { values, onChange, onSubmit } = useForm(addTextCallback, {
		label: '',
		notes: ''
	});

	const [addText, { error }] = useMutation(ADD_TEXT_MUTATION, {
		variables: {
			label: CryptoJS.AES.encrypt(values.label, key).toString(),
			notes: CryptoJS.AES.encrypt(values.notes, key).toString()
		},
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_TEXTS_QUERY
			});
			data.getTexts = [result.data.addText, ...data.getTexts];
			proxy.writeQuery({ query: FETCH_TEXTS_QUERY, data });
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

export default TextForm;
