import Component from 'component';
import template from 'template';
import { getAuth } from 'auth';

import Profile from '../components/profile';

const { div, p } = template;

export default class ProfileContainer extends Component {

	render() {
		const profile = new Profile();
		return profile.element;
	}

}