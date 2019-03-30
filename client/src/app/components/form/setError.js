import template from 'template';

const { p } = template;

export default function setError(name, text, refs) {
	if(!refs['errors']) {
		refs['errors'] = {};
	}
	const ref = refs.errors[name];
	if(ref) {
		const error = p({ text, class: "margin-top-small" });
		while (ref.firstChild) {
			ref.removeChild(ref.firstChild);
		}
		ref.appendChild(error);
	}
}