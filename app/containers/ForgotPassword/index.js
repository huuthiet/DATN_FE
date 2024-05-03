/**
 *
 * ForgotPassword
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Container, Alert } from 'reactstrap';
import _ from 'lodash';
import makeSelectForgotPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import InputForm from '../../components/InputForm';
import { postForgotPassword, getUser, changeStoreData } from './actions';
import './style.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
const validateForm = Yup.object().shape({
	email: Yup.string().required(<FormattedMessage {...messages.EmailMessage} />),
});

export function ForgotPassword(props) {

	useInjectReducer({ key: 'forgotPassword', reducer });
	useInjectSaga({ key: 'forgotPassword', saga });
	const [bcd, setBcd] = useState(0);
	useEffect(() => {
	}, []);
	const { error, actives } = props.forgotPassword;

	const [textdata, setTextdata] = useState(actives);

	const history = useHistory();


	return (
		<div className="login-page-wrapper">
			<Helmet>
				<title>Forgot Password</title>
				<meta name="description" content="Description of ForgotPassword" />
			</Helmet>
			<Container>
				<div className="title"><FormattedMessage {...messages.ForgotPassword} /></div>
				<Formik
					initialValues={{
						email: '',
					}}
					enableReinitialize
					validationSchema={validateForm}
					onSubmit={evt => {
						props.postForgotPassword(evt);
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


								{<FormattedMessage {...messages.enterEmailCode}>
									{(msg) => (
										<InputForm
											label={msg}
											placeholder={msg}
											name="email"
											autoComplete="email"
											icon="fa fa-envelope"
											touched={touched.email}
											error={errors.email}
											onChange={evt => {
												handleChange(evt);
											}}
											onBlur={handleBlur}
											type="email"
										/>
									)}
								</FormattedMessage>}
								{error.length > 0 && (
									<Container>
										<Alert color="danger">
											<FormattedMessage {...messages.emailnotexists} />
										</Alert>
									</Container>
								)
								}
								{
									actives == 1 ?
										props.changeStoreData('actives', 1)
										: setTextdata(0)
								}
								{
									actives == 1 && (
										<div className="link">
											{props.changeStoreData('actives', 0)}
											{history.push(`/auth/password_reissue/${values.email}`)}
										</div>
									)
								}
								<div className="submit-forgot-password">
									<Button color="primary" type="submit" className="btn-submit">
										<FormattedMessage {...messages.send} />
									</Button>
								</div>
							</form>
						</div>
					)}
				</Formik>
			</Container>
		</div>
	);
}

ForgotPassword.propTypes = {
	dispatch: PropTypes.func,
	postForgotPassword: PropTypes.func,
	changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	forgotPassword: makeSelectForgotPassword(),
});

function mapDispatchToProps(dispatch) {
	return {
		getUser: () => {
			dispatch(getUser());
		},
		postForgotPassword: evt => {
			dispatch(postForgotPassword(evt));
		},
		changeStoreData: (key, value) => {
			dispatch(changeStoreData(key, value));
		},
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(withConnect)(ForgotPassword);
