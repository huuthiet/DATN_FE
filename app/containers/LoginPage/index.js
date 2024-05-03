/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Container } from 'reactstrap';
import _ from 'lodash';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import InputForm from '../../components/InputForm';
import { postSignIn } from './actions';
import './style.scss';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const validateForm = Yup.object().shape({
	phoneNumber: Yup.string().required(<FormattedMessage {...messages.phoneMessage} />),
	password: Yup.string().required(<FormattedMessage {...messages.pwMessage} />),
});

export function LoginPage(props) {
	useInjectReducer({ key: 'loginPage', reducer });
	useInjectSaga({ key: 'loginPage', saga });
	const { loginError = {} } = props.loginPage;
	return (
		<div className="login-page-wrapper">
			<Helmet>
				<title>LoginPage</title>
				<meta name="description" content="Description of LoginPage" />
			</Helmet>
			<Container>
				<div className="title">{<FormattedMessage {...messages.login} />}</div>
				<Formik
					initialValues={{
						phoneNumber: '',
						password: '',
					}}
					enableReinitialize
					validationSchema={validateForm}
					onSubmit={evt => {
						props.postSignIn(evt);
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
					}) => (
						<div>
							<form onSubmit={handleSubmit}>
								{<FormattedMessage {...messages.entersdt}>
									{(msg) => (
										<InputForm
											label={<FormattedMessage {...messages.sdt} />}
											placeholder={msg}
											name="phoneNumber"
											autoComplete="phoneNumber"
											icon="fa fa-user"
											className="phonenumber-form"
											touched={touched.phoneNumber}
											error={errors.phoneNumber}
											onChange={evt => {
												handleChange(evt);
											}}
											onBlur={handleBlur}
										/>
									)}
								</FormattedMessage>}
								{<FormattedMessage {...messages.enterpassword}>
									{(msg) => (
										<InputForm
											label={<FormattedMessage {...messages.password} />}
											placeholder={msg}
											name="password"
											icon="fa fa-lock"
											className="password-form"
											type="password"
											autoComplete="current-password"
											value={values.password}
											touched={touched.password}
											error={errors.password}
											onChange={evt => {
												handleChange(evt);
											}}
											onBlur={handleBlur}
										/>
									)}
								</FormattedMessage>}


								{!_.isEmpty(loginError) && (
									<div className="alert alert-danger" role="alert">
										{/* {loginError.errorMessage} */}
										{<FormattedMessage {...messages.errorMessage} />}
									</div>
								)}
								<div className="login">
									<div className="forgotPassword">

										<Link to="/auth/forgot_password" className="link">
											{<FormattedMessage {...messages.forgotpw} />}
										</Link>
										{' '}

									</div>
									{' '}
									<Button color="primary" type="submit" className="btn-submit">
										{<FormattedMessage {...messages.login} />}
									</Button>
									<div className='sign-up'>
										{<FormattedMessage {...messages.unaccount} />}
										<Link to="/auth/sign-up" className="link">
											{<FormattedMessage {...messages.registration} />}{' '}
										</Link>
									</div>

								</div>
							</form>
						</div>
					)}
				</Formik>
			</Container>
		</div>
	);
}

LoginPage.propTypes = {
	dispatch: PropTypes.func,
	postSignIn: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
	return {
		postSignIn: evt => {
			dispatch(postSignIn(evt));
		},
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
