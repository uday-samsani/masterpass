import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import { MenuBar } from './components/Menu';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MasterVault from './pages/MasterVault';
import Password from './pages/Password';
import Card from './pages/Card';
import Text from './pages/Text';
import Page404 from './pages/Page404';

const NavRoute = ({ exact, path, component: Component }) => (
	<Container>
		<Route
			exact={exact}
			path={path}
			render={props => (
				<div>
					<MenuBar />
					<Component {...props} />
				</div>
			)}
		/>
	</Container>
);

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<NavRoute exact path='/' component={Home} />
					<NavRoute
						exact
						path='/mastervault'
						component={MasterVault}
					/>
					<NavRoute
						exact
						path='/passwords/:passwordId'
						component={Password}
					/>
					<NavRoute exact path='/cards/:cardId' component={Card} />
					<NavRoute exact path='/texts/:textId' component={Text} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<Route component={Page404} />
				</Switch>
			</Router>
		</AuthProvider>
	);
};

export default App;
