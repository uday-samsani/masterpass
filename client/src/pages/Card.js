import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import {
	Button,
	Dropdown,
	Grid,
	Input,
	Header,
	Label,
	Loader,
	TextArea,
	Form as SemanticForm
} from 'semantic-ui-react';

import {
	FETCH_CARDS_QUERY,
	FETCH_CARD_QUERY,
	UPDATE_CARD_MUTATION
} from '../util/graphql';

import { encrypt, decrypt } from '../util/crypt';

const Card = props => {
	const cardId = props.match.params.cardId;
	const [editMode, setEditMode] = useState(false);
	const options = [
		{ key: '0', value: 'masterCard', text: 'Master Card' },
		{ key: '0', value: 'meastro', text: 'Meastro' },
		{ key: '1', value: 'visa', text: 'Visa' },
		{ key: '2', value: 'rupay', text: 'Rupay' }
	];
	const {
		loading,
		data: { getCard: card }
	} = useQuery(FETCH_CARD_QUERY, {
		variables: {
			cardId
		}
	});

	const [updateCard] = useMutation(UPDATE_CARD_MUTATION);

	return (
		<>
			<Header as={'h1'}>{editMode ? 'Edit card' : 'Card'}</Header>
			{loading ? (
				<Loader inverted />
			) : (
				<Formik
					enableReinitialize={true}
					initialValues={{
						label: decrypt(card.label),
						cardHolderName: decrypt(card.cardHolderName),
						cardNumber: decrypt(card.cardNumber),
						cardType: options.filter(
							option => option.value === decrypt(card.cardType)
						)[0],
						expiry: decrypt(card.expiry),
						cvv: decrypt(card.cvv),
						notes: decrypt(card.notes)
					}}
					onSubmit={(values, actions) => {
						actions.setSubmitting(true);
						updateCard({
							variables: {
								label: encrypt(values.label),
								cardHolderName: encrypt(values.cardHolderName),
								cardNumber: encrypt(values.cardNumber),
								cardType: encrypt(values.cardType),
								expiry: encrypt(values.expiry),
								cvv: encrypt(values.cvv),
								notes: encrypt(values.notes)
							},
							update(proxy, result) {
								const data = proxy.readQuery({
									query: FETCH_CARDS_QUERY
								});
								data.getCards = data.getCards.fiter(
									card => card.id !== cardId
								);
								data.getCards = [
									result.data.updateCard,
									...data.getCards
								];
								data.getCard = result.data.updateCard;
								proxy.writeQuery({
									query: FETCH_CARDS_QUERY,
									data
								});
							}
						});
						actions.setSubmitting(false);
					}}
				>
					<Form>
						<Grid>
							<Grid.Row>
								<Grid.Column width={14}>
									<Field
										as={Input}
										type='text'
										name='label'
										placeholder="JonDoe's card"
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
								<Grid.Column width={8}>
									<Field
										as={Input}
										type='text'
										name='cardHolderName'
										placeholder='Jon Doe'
										label={'Card holder name'}
										labelPosition={'left'}
										size={'large'}
										fluid
										disabled={!editMode}
									/>
								</Grid.Column>
								<Grid.Column width={8}>
									<Field
										as={Input}
										type='text'
										name='cardNumber'
										placeholder='xxxx xxxx xxxx xxxx'
										label={'Card number'}
										labelPosition={'left'}
										size={'large'}
										fluid
										disabled={!editMode}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={8}>
									<Field
										as={Input}
										type='date'
										name='expiry'
										placeholder='dd/mm/yyyy'
										label={'Card Expiry'}
										labelPosition={'left'}
										size={'large'}
										fluid
										disabled={!editMode}
									/>
								</Grid.Column>
								<Grid.Column wdith={8}>
									<Field
										as={Input}
										type='password'
										name='cvv'
										placeholder='***'
										label={'CVV'}
										labelPosition={'left'}
										size={'large'}
										fluid
										disabled={!editMode}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={8}>
									<Field
										as={Dropdown}
										type='select'
										name='cardType'
										placeholder='Select your card type'
										size={'large'}
										options={options}
										clearable
										selection
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

export default Card;
