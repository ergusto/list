const fieldError = "form-field-error";

export default function resetErrors(refs) {
	const { formError, errors, ...rest } = refs;
	if(errors) {
		for(let ref in erorrs) {
			while(ref.firstChild) {
				ref.removeChild(ref.firstChild);
			}
		}
	}
	for(let ref in rest) {
		if(ref && ref.classList && ref.classList.contains(fieldError)) {
			ref.classList.remove(fieldError);
		}
	}
}