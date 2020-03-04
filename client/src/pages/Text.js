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
	FETCH_TEXTS_QUERY,
	FETCH_TEXT_QUERY,
	UPDATE_TEXT_MUTATION
} from '../util/graphql';

import { encrypt, decrypt } from '../util/crypt';

const Text = props => {
	const textId = props.match.params.textId;
	const [editMode, setEditMode] = useState(false);
	const {
		loading,
		data: { getText: text }
	} = useQuery(FETCH_TEXT_QUERY, {
		variables: {
			textId
		}
	});

	const [updateText] = useMutation(UPDATE_TEXT_MUTATION);

	return (
		<>
			<Header as={'h1'}>{editMode ? 'Edit text' : 'Text'}</Header>
			{loading ? (
				<Loader inverted />
			) : (
				<Formik
					enableReinitialize={true}
					initialValues={{
						label: decrypt(text.label),
						notes: decrypt(text.notes)
					}}
					onSubmit={(values, actions) => {
						actions.setSubmitting(true);
						updateText({
							variables: {
								textId: textId,
								label: encrypt(values.label),
								notes: encrypt(values.notes)
							},
							update(proxy, result) {
								const data = proxy.readQuery({
									query: FETCH_TEXTS_QUERY
								});
								data.getTexts = data.getTexts.fiter(
									text => text.id !== textId
								);
								data.getTexts = [
									result.data.updateText,
									...data.getTexts
								];
								data.getText = result.data.updateText;
								proxy.writeQuery({
									query: FETCH_TEXTS_QUERY,
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
										placeholder="JonDoe's Secret"
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

export default Text;
