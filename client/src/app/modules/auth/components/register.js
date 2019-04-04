import Component from "component";
import template from "template";
import { createForm, setError, setErrors } from "form";
import { isString } from 'lib';

const { div, h2, button } = template;

export default class Register extends Component {

	register(values) {
		let error = false;

		const { register } = this.props;
		const { username, password, repeatPassword } = values;

		if(!username.length) {
			error = true;
			setError("username", "This field is required", this.refs);
		}

		if(!password.length) {
			error = true;
			setError("password", "This field is required", this.refs);
		}

		if(!repeatPassword.length) {
			error = true;
			setError("repeatPassword", "This field is required", this.refs);
		}

		if(repeatPassword !== password) {
			error = true;
			setError("password", "Passwords do not match", this.refs);
			setError("repeatPassword", "Passwords do not match", this.refs);
		}

		if(error) {
			return;
		}

		register(username, password).catch(err => {
			let errors;
			if(isString(err)) {
				errors = { non_field_errors: [err] };
			} else {
				let { body: errors } = err; 
			}
			if(errors) {
				setErrors(errors, this.refs);
			}
		});
	}

	render() {
		return div({
			class: "padding-horizontal-small",
			children: [
				h2({
					text: "Register",
					class: "margin-bottom-small margin-left-medium font-weight-medium"
				}),
				createForm({
					refs: this.refs,
					events: { submit: this.register.bind(this) },
					fields: {
						username: {
							type: "text",
							label: false,
							placeholder: "Username"
						},
						password: {
							type: "password",
							label: false,
							placeholder: "Password",
						},
						repeatPassword: {
							type: "password",
							label: false,
							placeholder: "Password (again)",
						}
					},
					footer: [
						button({
							type: "submit",
							text: "Register",
							class: "button button--black margin-top-medium block font-size-medium margin-left-medium font-weight-medium"
						})
					]
				})
			]
		});
	}

}