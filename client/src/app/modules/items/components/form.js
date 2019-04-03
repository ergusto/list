import Component from "component";
import template from "template";
import { createForm, setError } from "form";

const { div, h4, button } = template;

export default class CreateItem extends Component {

	submit(values, event) {
		let error = false;

		const { submit } = this.props;
		const { title, url, description } = values;

		if(!title.length) {
			error = true;
			setError("title", "Title is required", this.refs);
		}

		if(error) {
			return;
		}

		submit({ title, url, description }).then(model => {
			this.refs.form.reset();
		});
	}

	render() {
		let cancel;
		const { onCancel } = this.props;

		if(onCancel) {
			cancel = button({
				type: "button",
				text: "Cancel",
				class: "button button--black margin-top-medium margin-left-medium block font-size-medium",
				events: {
					click: onCancel
				}
			})
		}

		return div({
			children: [
				createForm({
					refs: this.refs,
					events: { submit: this.submit.bind(this) },
					fields: {
						title: {
							type: "text",
							placeholder: "Title",
							label: false
						},
						url: {
							type: "url",
							placeholder: "URL",
							label: false
						},
						description: {
							type: "textarea",
							placeholder: "Description",
							rows: 3,
							label: false
						}
					},
					footer: [
						button({
							type: "submit",
							text: "Create",
							class: "button button--black margin-top-medium block font-size-medium"
						}),
						cancel
					]
				})
			]
		});
	}

}