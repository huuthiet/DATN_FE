/**
 *
 * PasswordReissuePage
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
import { Button, Container, Row, Col, Alert } from 'reactstrap';
import _ from 'lodash';
import makeSelectPasswordReissuePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import InputForm from '../../components/InputForm';
import { postPasswordReissue } from './actions';
import './style.scss';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const REGEX_PASSWORD = /\S.*\S/;
const validateForm = Yup.object().shape({
	tokenKey: Yup.string().required(<FormattedMessage {...messages.ErrorCode}/>),
	password: Yup.string()
		.min(6, <FormattedMessage {...messages.ErrorPW}/>)
		.required( <FormattedMessage {...messages.ErrorPW1}/>)
		.matches(REGEX_PASSWORD, <FormattedMessage {...messages.ErrorPW2}/>),
	confirmPassword: Yup.string()
		.min(6, <FormattedMessage {...messages.ErrorPW}/>)
		.oneOf([Yup.ref('password'), null], <FormattedMessage {...messages.ErrorPWConfig}/>)
		.required(<FormattedMessage {...messages.ErrorPWConfig1}/>)
		.matches(REGEX_PASSWORD, <FormattedMessage {...messages.ErrorPW2}/>),
});

export function PasswordReissuePage(props) {
	useInjectReducer({ key: 'passwordReissuePage', reducer });
	useInjectSaga({ key: 'passwordReissuePage', saga });
	const history = useHistory();
	const { email } = useParams();
	const { linkurl, error } = props.passwordReissuePage;
	return (
		<div className="login-page-wrapper">
			<Helmet>
				<title>PasswordReissuePage</title>
				<meta name="description" content="Description of PasswordReissuePage" />
			</Helmet>
			<Container>
				<div className="title"><FormattedMessage {...messages.ReissuePW}/></div>
				<Formik
					initialValues={{
						tokenKey: '',
						password: '',
						confirmPassword: '',
					}}
					enableReinitialize
					validationSchema={validateForm}
					onSubmit={evt => {
						const temp = { ...evt, email };
						props.postPasswordReissue(temp);
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
								<Row>
									<Col xs={12}>
										<InputForm
											label={<FormattedMessage {...messages.Verification}/>}
											placeholder="Nhập Mã Xác Nhận"
											name="tokenKey"
											icon="fa fa-barcode"
											touched={touched.tokenKey}
											error={errors.tokenKey}
											autoComplete="tokenKey"
											onChange={evt => {
												handleChange(evt);
											}}
											onBlur={handleBlur}
										/>
									</Col>
									<Col xs={12}>
										<InputForm
											label={<FormattedMessage {...messages.Password}/>}
											placeholder="Nhập mật khẩu..."
											name="password"
											icon="fa fa-lock"
											type="password"
											value={values.password}
											touched={touched.password}
											error={errors.password}
											autoComplete="new-password"
											onChange={evt => {
												handleChange(evt);
											}}
											onBlur={handleBlur}
										/>
									</Col>
									<Col xs={12}>
										<InputForm
											label={<FormattedMessage {...messages.EnterPassword}/>}
											placeholder="Nhập lại mật khẩu..."
											name="confirmPassword"
											icon="fa fa-lock"
											type="password"
											value={values.confirmPassword}
											touched={touched.confirmPassword}
											error={errors.confirmPassword}
											autoComplete="new-password"
											onChange={evt => {
												handleChange(evt);
											}}
											onBlur={handleBlur}
										/>
									</Col>
								</Row>
								{error.length > 0 && (
									<Container>
										<Alert color="danger">
										{<FormattedMessage {...messages.IncorrectCode}/>}
                     				 </Alert>
									</Container>
								)}
								{ linkurl == 1 &&
									(
										<Container>
											<Alert color="success">
											{<FormattedMessage {...messages.Success}/>}
										  </Alert>
										</Container>
									)
									&&
									(
										history.push(`/auth/login/}`)
									)
								}
								{/* {
									abc == 1 && (
										<Container>
											<Alert color="danger">
												Thành Công
                      							</Alert>
										</Container>
									)
								} */}
								<div className="login">
									<Button color="primary" type="submit" className="btn-submit">
									{<FormattedMessage {...messages.Send}/>}
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

PasswordReissuePage.propTypes = {
	dispatch: PropTypes.func,
	postPasswordReissue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	passwordReissuePage: makeSelectPasswordReissuePage(),
});

function mapDispatchToProps(dispatch) {
	return {
		postPasswordReissue: evt => {
			dispatch(postPasswordReissue(evt));
		},
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(withConnect)(PasswordReissuePage);
