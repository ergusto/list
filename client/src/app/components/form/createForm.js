import template from 'template';
import createField from './createField.js';
import resetErrors from './resetErrors.js';
import { isDOMNode } from 'lib';

const { div, header, form, footer } = template;

export default function createForm({ fields, refs, events, header: headerOptions, footer: footerOptions, ...restOptions }) {
	const { submit, ...restEvents } = events,
		element = form({ ...restOptions, events: { ...restEvents }});

	if(headerOptions) {
		const headerEl = header(headerOptions);
		element.appendChild(headerEl);
	}

	for(let name in fields) {
		let fieldOptions = fields[name],
			field = createField({ name, refs, ...fieldOptions });
		element.appendChild(field);
	}

	element.appendChild(div({ ref: { name: "formError", context: refs.errors } }));

	if(footerOptions) {
		const footerEl = footer(footerOptions);
		element.appendChild(footerEl);
	}

	element.addEventListener("submit", event => {
		resetErrors(refs.errors);
		submit(event);
	});

	return element;
}