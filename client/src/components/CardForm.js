import React from 'react';
import CryptoJS from 'crypto-js';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, Icon } from 'semantic-ui-react';

import { useForm } from '../util/hooks';
import { FETCH_CARDS_QUERY, ADD_CARD_MUTATION } from '../util/graphql';

function CardForm() {
	const key = sessionStorage.getItem('key');
	const { values, onChange, onSubmit } = useForm(addCardCallback, {
		label: '',
		cardHolderName: '',
		cardNumber: '',
		cardType: '',
		expiry: '',
		cvv: '',
		notes: ''
	});

	const [addCard, { error }] = useMutation(ADD_CARD_MUTATION, {
		variables: {
			label: CryptoJS.AES.encrypt(values.label, key).toString(),
			cardHolderName: CryptoJS.AES.encrypt(
				values.cardHolderName,
				key
			).toString(),
			cardNumber: CryptoJS.AES.encrypt(values.cardNumber, key).toString(),
			cardType: CryptoJS.AES.encrypt(values.cardType, key).toString(),
			expiry: CryptoJS.AES.encrypt(values.expiry, key).toString(),
			cvv: CryptoJS.AES.encrypt(values.cvv, key).toString(),
			notes: CryptoJS.AES.encrypt(values.notes, key).toString()
		},
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_CARDS_QUERY
			});
			data.getCards = [result.data.addCard, ...data.getCards];
			proxy.writeQuery({ query: FETCH_CARDS_QUERY, data });
			values.label = '';
			values.cardHolderName = '';
			values.cardNumber = '';
			values.cardType = '';
			values.expiry = '';
			values.cvv = '';
			values.notes = '';
		}
	});

	function addCardCallback() {
		addCard();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Add Card</h2>
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
						name='cardHolderName'
						onChange={onChange}
						value={values.cardHolderName}
						error={error ? true : false}
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						placeholder='10011000110001'
						name='cardNumber'
						onChange={onChange}
						value={values.cardNumber}
						error={error ? true : false}
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						placeholder='Master/Visa/RuPay'
						name='cardType'
						onChange={onChange}
						value={values.cardType}
						error={error ? true : false}
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						placeholder='DD/MM/YYYY'
						name='expiry'
						type='date'
						onChange={onChange}
						value={values.expiry}
						error={error ? true : false}
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input
						placeholder='***'
						name='cvv'
						type='password'
						onChange={onChange}
						value={values.cvv}
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

export default CardForm;
