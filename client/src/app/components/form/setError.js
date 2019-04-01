import template from 'template';

const { p } = template;

const fieldError = "form-field-error";

export default function setError(name, text, refs) {
	if(!refs['errors']) {
		refs['errors'] = {};
	}
	const errorRef = refs.errors[name];
	const inputRef = refs[name];
	if(errorRef) {
		const error = p({ text, class: "margin-top-small" });
		while (errorRef.firstChild) {
			errorRef.removeChild(errorRef.firstChild);
		}
		errorRef.appendChild(error);
	}
	if(inputRef) {
		inputRef.classList.add(fieldError);
	}
}