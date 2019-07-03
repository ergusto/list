import template from 'template';

const { div, input, textarea, label, fieldset } = template;

const fieldClassName = "form-field border-all border-color-light-grey box-shadow";

function renderInput({ name, type, refs, class: className, ...rest }) {
	return input({
		name,
		type: type,
		class: className ? (fieldClassName + " ") + className : fieldClassName,
		ref: { name: name, context: refs },
		...rest
	});
}

function renderTextarea({ name, type, refs, class: className, ...rest }) {
	return textarea({
		name,
		class: className ? (fieldClassName + " ") + className : fieldClassName,
		ref: { name: name, context: refs },
		...rest
	});
}

function getInput(options) {
	const { type } = options;
	const isTextarea = type === "textarea";
	return isTextarea ? renderTextarea(options) : renderInput(options);
}

function renderError(name, type, refs) {
	if(!refs['errors']) {
		refs['errors'] = {};
	}
	return div({
		class: "form-field-error font-size-medium",
		ref: { name: name, context: refs.errors }
	});
}

export default function createField(options) {
	const { name, type, refs, label: labelText, ...rest } = options;

	const wrapper = fieldset({
		class: "padding-bottom-medium padding-top-small"
	});

	const labelElement = label({
		text: labelText ? labelText : name.charAt(0).toUpperCase() + name.substr(1),
		class: "margin-bottom-small block font-size-small"
	});

	const element = getInput({ name, type, refs, ...rest });

	const error = renderError(name,type,refs);

	if(!!labelText || labelText === undefined) {
		wrapper.appendChild(labelElement);
	}

	wrapper.appendChild(element);

	return wrapper;
}