import Component from "component";
import template from "template";
import { createForm, setError } from "form";

const { div, h4, button } = template;

export default class CreateList extends Component {

	submit(event) {
		let error = false;

		const { submit } = this.props;
		const { form, title } = this.refs;

		if(!title.value.length) {
			error = true;
			setError("title", "Title is required", this.refs);
		}

		if(error) {
			return;
		}

		return submit({ title: title.value });
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
							label: false,
							class: "font-size-large font-weight-medium"
						}
					},
					footer: [
						button({
							type: "submit",
							text: "Create",
							class: "button button--black margin-top-medium margin-left-medium block font-size-medium"
						}),
						cancel
					]
				})
			]
		});
	}

}