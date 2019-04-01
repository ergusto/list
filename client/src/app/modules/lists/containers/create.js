import Component from 'component';
import ListForm from '../components/form.js';
import { redirect } from 'router';
import { Lists } from 'collections';

export default class ListCreateContainer extends Component {

	create(attributes) {
		return Lists.create(attributes).then(list => {
			const { id, slug } = list;
			redirect(`/list/${id}/${slug}`);
		});
	}

	render() {
		const { onCancel } = this.props;
		const form = new ListForm({
			submit: this.create.bind(this),
			onCancel: onCancel
		});
		return form.element;
	}

}