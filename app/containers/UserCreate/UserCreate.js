import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SHA3 from 'crypto-js/sha3';
import encHex from 'crypto-js/enc-hex';
import { Button, NonIdealState } from '@blueprintjs/core';
import InputField from 'components/InputField/InputField';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { getSignupData, postUser } from 'actions/userCreate';

require('./userCreate.scss');

const propTypes = {
	userCreateData: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

class UserCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			password: '',
			bio: '',
			avatar: undefined,
			location: '',
			website: '',
			orcid: '',
			github: '',
			twitter: '',
			facebook: '',
			googleScholar: '',
		};
		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onFirstNameChange = this.onFirstNameChange.bind(this);
		this.onLastNameChange = this.onLastNameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onBioChange = this.onBioChange.bind(this);
		this.onAvatarChange = this.onAvatarChange.bind(this);
	}

	componentWillMount() {
		this.props.dispatch(getSignupData(this.props.match.params.hash));
	}

	componentWillReceiveProps(nextProps) {
		const prevData = this.props.userCreateData.data || {};
		const nextData = nextProps.userCreateData.data || {};
		if (!prevData.id && nextData.id) {
			this.props.history.push('/');
		}
	}

	onCreateSubmit(evt) {
		evt.preventDefault();
		this.props.dispatch(postUser({
			email: this.props.userCreateData.data.email,
			hash: this.props.userCreateData.data.hash,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: SHA3(this.state.password).toString(encHex),
			avatar: this.state.avatar,
			bio: this.state.bio,
			location: this.state.location,
			website: this.state.website,
			orcid: this.state.orcid,
			github: this.state.github,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			googleScholar: this.state.googleScholar,
		}));
	}

	onFirstNameChange(evt) {
		this.setState({ firstName: evt.target.value });
	}
	onLastNameChange(evt) {
		this.setState({ lastName: evt.target.value });
	}
	onPasswordChange(evt) {
		this.setState({ password: evt.target.value });
	}
	onBioChange(evt) {
		this.setState({ bio: evt.target.value.substring(0, 280).replace(/\n/g, ' ') });
	}
	onAvatarChange(val) {
		this.setState({ avatar: val });
	}

	render() {
		const expandables = [
			{
				label: 'Location',
				showTextOnButton: true,
				icon: 'pt-icon-map-marker',
				action: ()=> { this.setState({ showLocation: true }); },
				isVisible: this.state.showLocation,
				value: this.state.location,
				onChange: (evt)=> { this.setState({ location: evt.target.value }); }
			},
			{
				label: 'Website',
				showTextOnButton: true,
				icon: 'pt-icon-link',
				action: ()=> { this.setState({ showWebsite: true }); },
				isVisible: this.state.showWebsite,
				value: this.state.website,
				onChange: (evt)=> { this.setState({ website: evt.target.value }); }
			},
			{
				label: 'Orcid',
				icon: 'pt-icon-orcid',
				action: ()=> { this.setState({ showOrcid: true }); },
				isVisible: this.state.showOrcid,
				helperText: `https://orcid.org/${this.state.orcid}`,
				value: this.state.orcid,
				onChange: (evt)=> { this.setState({ orcid: evt.target.value }); }
			},
			{
				label: 'Github',
				icon: 'pt-icon-github',
				action: ()=> { this.setState({ showGithub: true }); },
				helperText: `https://github.com/${this.state.github}`,
				isVisible: this.state.showGithub,
				value: this.state.github,
				onChange: (evt)=> { this.setState({ github: evt.target.value }); }
			},
			{
				label: 'Twitter',
				icon: 'pt-icon-twitter',
				action: ()=> { this.setState({ showTwitter: true }); },
				helperText: `https://twitter.com/${this.state.twitter}`,
				isVisible: this.state.showTwitter,
				value: this.state.twitter,
				onChange: (evt)=> { this.setState({ twitter: evt.target.value }); }
			},
			{
				label: 'Facebook',
				icon: 'pt-icon-facebook',
				action: ()=> { this.setState({ showFacebook: true }); },
				helperText: `https://facebook.com/${this.state.facebook}`,
				isVisible: this.state.showFacebook,
				value: this.state.facebook,
				onChange: (evt)=> { this.setState({ facebook: evt.target.value }); }
			},
			{
				label: 'Google Scholar',
				icon: 'pt-icon-google-scholar',
				action: ()=> { this.setState({ showGoogleScholar: true }); },
				helperText: `https://scholar.google.com/citations?user=${this.state.googleScholar}`,
				isVisible: this.state.showGoogleScholar,
				value: this.state.googleScholar,
				onChange: (evt)=> { this.setState({ googleScholar: evt.target.value }); }
			},
		];
		return (
			<div className={'user-create'}>
				<Helmet>
					<title>User Create</title>
				</Helmet>

				{this.props.userCreateData.hashError &&
					<NonIdealState
						title={'Signup URL Invalid'}
						description={
							<div className={'success'}>
								<p>This URL cannot be used to signup.</p>
								<p>Click below to restart the signup process.</p>
							</div>
						}
						visual={'error'}
						action={<Link to={'/signup'} className={'pt-button'}>Signup</Link>}
					/>
				}

				{this.props.userCreateData.data &&
					<div className={'container small'}>
						<div className={'row'}>
							<div className={'col-12'}>
								<h1>Create Account</h1>
								<form onSubmit={this.onCreateSubmit}>
									<InputField
										label={'Email'}
										isDisabled={true}
										value={this.props.userCreateData.data.email}
									/>
									<InputField
										label={'First Name'}
										isRequired={true}
										value={this.state.firstName}
										onChange={this.onFirstNameChange}
									/>
									<InputField
										label={'Last Name'}
										isRequired={true}
										value={this.state.lastName}
										onChange={this.onLastNameChange}
									/>
									<InputField
										label={'Password'}
										type={'password'}
										isRequired={true}
										value={this.state.password}
										onChange={this.onPasswordChange}
									/>
									<ImageUpload
										htmlFor={'avatar-upload'}
										label={'Avatar Image'}
										onNewImage={this.onAvatarChange}
										useCrop={true}
									/>
									<InputField
										label={'Bio'}
										isTextarea={true}
										value={this.state.bio}
										onChange={this.onBioChange}
									/>
									{expandables.filter((item)=> {
										return item.isVisible;
									}).map((item)=> {
										return (
											<InputField
												key={`input-field-${item.label}`}
												label={item.label}
												value={item.value}
												onChange={item.onChange}
												helperText={item.helperText}
											/>
										);
									})}

									{!!expandables.filter(item => !item.isVisible).length &&
										<InputField label={'Add More'}>
											<div className={'pt-button-group'}>
												{expandables.filter((item)=> {
													return !item.isVisible;
												}).map((item)=> {
													return (
														<button type={'button'} key={`button-${item.label}`} className={`pt-button ${item.icon}`} onClick={item.action}>
															{item.showTextOnButton ? item.label : ''}
														</button>
													);
												})}
											</div>
										</InputField>
									}

									<InputField error={this.props.userCreateData.error && 'Error Creating User'}>
										<Button
											name={'create'}
											type={'submit'}
											className={'pt-button pt-intent-primary create-account-button'}
											onClick={this.onCreateSubmit}
											text={'Create Account'}
											disabled={!this.state.firstName || !this.state.lastName || !this.state.password}
											loading={this.props.userCreateData.isLoading}
										/>
									</InputField>
								</form>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

UserCreate.propTypes = propTypes;
export default withRouter(connect(state => ({
	userCreateData: state.userCreate,
}))(UserCreate));
