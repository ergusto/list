import Component from "component";
import template from "template";
import { createForm, setError } from "form";

const { div, h4, button } = template;

export default class CreateItem extends Component {

	submit(event) {
		let error = false;
		event.preventDefault();

		const { submit } = this.props;
		const { form, title, url, description } = this.refs;

		if(!title.value.length) {
			error = true;
			setError("title", "Title is required", this.refs);
		}

		if(error) {
			return;
		}

		submit({ title: title.value, url: url.value, description: description.value }).then(model => {
			form.reset();
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