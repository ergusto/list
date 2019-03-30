import setError from "./setError.js";
import setFormError from "./setFormError.js";

export default function setErrors(errors,refs) {
	const { non_field_errors, ...restErrors } = errors;
	if(non_field_errors && non_field_errors.length) {
		setFormError(non_field_errors[0], refs);
	}
	for(let field in restErrors) {
		let error = restErrors[field];
		setError(field, error, refs);
	}
}