import Component from "component";
import template from "template";
import { createForm, setError, setErrors } from "form";
import { isString } from 'lib';

const { div, h2, button } = template;

export default class Register extends Component {

	register(event) {
		let error = false;
		event.preventDefault();

		const { register } = this.props;
		const { username, password, repeatPassword } = this.refs;

		if(!username.value.length) {
			error = true;
			setError("username", "This field is required", this.refs);
		}

		if(!password.value.length) {
			error = true;
			setError("password", "This field is required", this.refs);
		}

		if(!repeatPassword.value.length) {
			error = true;
			setError("repeatPassword", "This field is required", this.refs);
		}

		if(error) {
			return;
		}

		register(username.value, password.value).catch((err) => {
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
			class: "padding-all-2 border-all border-color-blue-grey box-shadow-large background-color-white border-radius-all",
			children: [
				h2({
					text: "Register",
					class: "margin-bottom-small"
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
							placeholder: "Repeat password",
						}
					},
					footer: [
						button({
							type: "submit",
							text: "Login",
							class: "button button--blue margin-top-medium block font-size-medium"
						})
					]
				})
			]
		});
	}

}