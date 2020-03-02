import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MasterVault from './pages/MasterVault';
import Password from './pages/Password';
import Card from './pages/Card';
import Text from './pages/Text';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<MenuBar />
					<Route exact path='/' component={Home} />
					<Route exact path='/mastervault' component={MasterVault} />
					<Route
						exact
						path='/passwords/:passwordId'
						component={Password}
					/>
					<Route exact path='/cards/:cardId' component={Card} />
					<Route exact path='/texts/:textId' component={Text} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
