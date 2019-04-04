import Component from 'component';
import template from 'template';
import { ListListComponent } from 'modules/lists';
import { Lists } from 'collections';
import { removeChildren } from 'lib';
import { redirect } from 'router';

const { div, p, button, h2 } = template;

const initialLimit = 200;

export default class HomeContainer extends Component {

	constructor(props) {
		super(props);

		this.state.limit = initialLimit;
		this.state.offset = 0;
	}

	onMount() {
		this.fetch();
	}

	fetch() {
		const { limit, offset } = this.state;

		Lists.list({ limit, offset }).then(resp => {
			const { results, next } = resp;

			this.state.offset = this.state.offset + initialLimit;

			if(!results.length) {
				redirect('/create');
			} else {
				this.renderLists();

				if(next) {
					this.renderNext();
				} else {
					this.removeNext();
				}
			}
		});
	}

	renderNext() {
		const { nextContainer } = this.refs;

		const next = div({
			class: "padding-horizontal-4 margin-vertical",
			content: button({
				text: "Next",
				class: "button button--black button--large",
				events: {
					click: this.clickNext.bind(this)
				}
			})
		});

		nextContainer.appendChild(next);
	}

	clickNext() {
		this.fetch();
		this.removeNext();
	}

	removeNext() {
		const { nextContainer } = this.refs;

		removeChildren(nextContainer);
	}

	renderLists() {
		const { titleContainer } = this.refs,
			lists = Lists.all(),
			title = h2({
				text: "Lists:",
				class: "padding-left-4 padding-top-2 font-weight-bold font-size-huge margin-bottom"
			});

		if(!titleContainer.contains(title)) {
			titleContainer.appendChild(title);
		}

		this.list.update(lists);
	}

	preRender() {
		this.list = new ListListComponent();
	}

	render() {
		return div({
			children: [
				div({
					ref: { context: this.refs, name: "titleContainer" }
				}),
				this.list.element,
				div({
					ref: { context: this.refs, name: "nextContainer"}
				})
			]
		});
	}

}