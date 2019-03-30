import template from 'template';

const { p } = template;

export default function setFormError(text, refs) {
	if(!refs['errors']) {
		refs['errors'] = {};
	}
	const ref = refs.errors['formError'];
	if(ref) {
		const error = p({ text, class: "margin-vertical-small" });
		while(ref.firstChild) {
			ref.removeChild(ref.firstChild);
		}
		ref.appendChild(error);
	}
}