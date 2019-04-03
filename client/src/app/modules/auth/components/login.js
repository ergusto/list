import Component from "component";
import template from "template";
import { createForm, setError, setErrors } from "form";
import { isString } from 'lib';

const { div, h2, button } = template;

export default class Login extends Component {

	login(values) {
		let error = false;

		const { login } = this.props;
		const { username, password } = values;

		if(!username.length) {
			error = true;
			setError("username", "This field is required", this.refs);
		}

		if(!password.length) {
			error = true;
			setError("password", "This field is required", this.refs);
		}

		if(error) {
			return;
		}

		login(username, password).catch((err) => {
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
					text: "Login",
					class: "margin-bottom-small margin-left-medium font-weight-medium"
				}),
				createForm({
					refs: this.refs,
					events: { submit: this.login.bind(this) },
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
						}
					},
					footer: [
						button({
							type: "submit",
							text: "Login",
							class: "button button--black margin-top-medium margin-left-medium block font-size-medium font-weight-medium"
						})
					]
				})
			]
		});
	}

}