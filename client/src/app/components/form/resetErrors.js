export default function resetErrors(refs) {
	if(refs['errors']) {
		for(let ref in refs.erorrs) {
			while(ref.firstChild) {
				ref.removeChild(ref.firstChild);
			}
		}
	}
}