import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { AuthContext } from '../context/auth';

import {
	Button,
	Container,
	Dropdown,
	Grid,
	Icon,
	Input,
	Header,
	Form as SemanticForm,
	TextArea
} from 'semantic-ui-react';
import { Field, Form, Formik } from 'formik';
import generator from 'generate-password';

import {
	FETCH_CARDS_QUERY,
	FETCH_PASSWORDS_QUERY,
	FETCH_TEXTS_QUERY,
	ADD_PASSWORD_MUTATION,
	ADD_CARD_MUTATION,
	ADD_TEXT_MUTATION,
	LOGIN_USER,
	REGISTER_USER
} from '../util/graphql';
import { useMutation } from '@apollo/react-hooks';

import { encrypt } from '../util/crypt';

const PasswordForm = () => {
	const [addPassword] = useMutation(ADD_PASSWORD_MUTATION);

	return (
		<div>
			<Header as={'h1'}>Add password</Header>
			<Formik
				enableReinitialize={true}
				initialValues={{
					password: generator.generate({ length: 12, strict: true })
				}}
				onSubmit={(values, actions) => {
					actions.setSubmitting(true);
					addPassword({
						variables: {
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
							data.getPasswords = [
								result.data.addPassword,
								...data.getPasswords
							];
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
								/>
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
								/>
							</Grid.Column>
							<Grid.Column>
								<Field
									as={Input}
									type='password'
									name='password'
									placeholder='************'
									label={'Password'}
									labelPosition={'left'}
									size={'large'}
									icon={<Icon name='eye' />}
									fluid
								/>
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
								/>
							</Grid.Column>
							<Grid.Column as={SemanticForm}>
								<Field
									type='textarea'
									name='notes'
									as={TextArea}
									placeholder='Notes'
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Field as={Button} type='submit'>
									Submit
								</Field>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Formik>
		</div>
	);
};

const CardForm = () => {
	const options = [
		{ key: '0', value: 'masterCard', text: 'Master Card' },
		{ key: '0', value: 'meastro', text: 'Meastro' },
		{ key: '1', value: 'visa', text: 'Visa' },
		{ key: '2', value: 'rupay', text: 'Rupay' }
	];
	const [addCard] = useMutation(ADD_CARD_MUTATION);

	return (
		<div>
			<Header as={'h1'}>Add card</Header>
			<Formik
				enableReinitialize={true}
				initialValues={{}}
				onSubmit={(values, actions) => {
					actions.setSubmitting(true);
					addCard({
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
							data.getCards = [
								result.data.addCard,
								...data.getCards
							];
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
					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column>
								<Field
									as={Input}
									type='text'
									name='label'
									placeholder="JonDoe's card"
									label={'Label'}
									labelPosition={'left'}
									size={'large'}
									fluid
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Field
									as={Input}
									type='text'
									name='cardHolderName'
									placeholder='Jon Doe'
									label={'Card holder name'}
									labelPosition={'left'}
									size={'large'}
									fluid
								/>
							</Grid.Column>
							<Grid.Column>
								<Field
									as={Input}
									type='text'
									name='cardNumber'
									placeholder='xxxx xxxx xxxx xxxx'
									label={'Card number'}
									labelPosition={'left'}
									size={'large'}
									fluid
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Field
									as={Input}
									type='date'
									name='expiry'
									placeholder='dd/mm/yyyy'
									label={'Card Expiry'}
									labelPosition={'left'}
									size={'large'}
									fluid
								/>
							</Grid.Column>
							<Grid.Column>
								<Field
									as={Input}
									type='password'
									name='cvv'
									placeholder='***'
									label={'CVV'}
									labelPosition={'left'}
									size={'large'}
									fluid
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
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
								/>
							</Grid.Column>
							<Grid.Column>
								<SemanticForm>
									<Field
										type='textarea'
										name='notes'
										as={TextArea}
										placeholder='Notes'
										fluid
									/>
								</SemanticForm>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Field as={Button} type='submit'>
									Submit
								</Field>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Formik>
		</div>
	);
};

const TextForm = () => {
	const [addText] = useMutation(ADD_TEXT_MUTATION);
	return (
		<div>
			<h1>Add text</h1>
			<Formik
				enableReinitialize={true}
				initialValues={{}}
				onSubmit={(values, actions) => {
					actions.setSubmitting(true);
					addText({
						variables: {
							label: encrypt(values.label),
							notes: encrypt(values.notes)
						},
						update(proxy, result) {
							const data = proxy.readQuery({
								query: FETCH_TEXTS_QUERY
							});
							data.getTexts = [
								result.data.addText,
								...data.getTexts
							];
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
					<Grid columns={1}>
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
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<SemanticForm>
									<Field
										type='textarea'
										name='notes'
										as={TextArea}
										placeholder='Notes'
										fluid
									/>
								</SemanticForm>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Field as={Button} type='submit'>
									Submit
								</Field>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Formik>
		</div>
	);
};

const LoginForm = props => {
	const context = useContext(AuthContext);
	const [loginUser] = useMutation(LOGIN_USER);
	return (
		<Container>
			<Formik
				enableReinitialize={true}
				initialValues={{}}
				onSubmit={(values, actions) => {
					actions.setSubmitting(true);
					loginUser({
						variables: {
							username: values.username,
							password: values.password
						},
						update(_, { data: { login: userData } }) {
							context.login(userData);
							const salt = userData._id.toString();
							const key256Bits = CryptoJS.PBKDF2(
								values.password,
								salt,
								{
									keySize: 256 / 32
								}
							);
							sessionStorage.setItem('key', key256Bits);
							props.history.push('/mastervault');
						}
					});
					actions.setSubmitting(false);
				}}
			>
				<Form>
					<Grid textAlign='center'>
						<Grid.Row>
							<Grid.Column>
								<Field
									as={Input}
									type='text'
									name='username'
									placeholder='JonDoe'
									size={'huge'}
									style={{
										width: '400px'
									}}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Field
									as={Input}
									type='password'
									name='password'
									placeholder='********'
									size={'huge'}
									style={{ width: '400px' }}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={8}>
								<Link to='/register'>
									<Field
										as={Button}
										type='button'
										basic
										size='large'
										color='purple'
									>
										Register
									</Field>
								</Link>
								<Field
									as={Button}
									type='submit'
									size='large'
									color='blue'
								>
									Log In
								</Field>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Formik>
		</Container>
	);
};

const RegisterForm = props => {
	const [addUser] = useMutation(REGISTER_USER);
	return (
		<Container>
			<Formik
				enableReinitialize={true}
				initialValues={{}}
				onSubmit={(values, actions) => {
					actions.setSubmitting(true);
					addUser({
						variables: {
							username: values.username,
							password: values.password,
							confirmPassword: values.confirmPassword
						},
						update(_) {
							props.history.push('/login');
						}
					});
					actions.setSubmitting(false);
				}}
			>
				<Form>
					<Grid textAlign='center'>
						<Grid.Row>
							<Grid.Column>
								<Field
									as={Input}
									type='text'
									name='username'
									placeholder='JonDoe'
									size={'huge'}
									style={{
										width: '400px'
									}}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Field
									as={Input}
									type='password'
									name='password'
									placeholder='Password'
									size={'huge'}
									style={{ width: '400px' }}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Field
									as={Input}
									type='password'
									name='confirmPassword'
									placeholder='Confirm Password'
									size={'huge'}
									style={{ width: '400px' }}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={8}>
								<Link to='/login'>
									<Field
										as={Button}
										type='button'
										basic
										size='large'
										color='purple'
									>
										Log In
									</Field>
								</Link>
								<Field
									as={Button}
									type='submit'
									size='large'
									color='blue'
								>
									Register
								</Field>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Formik>
		</Container>
	);
};

export { PasswordForm, CardForm, TextForm, LoginForm, RegisterForm };
