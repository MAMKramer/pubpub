import React, {PropTypes} from 'react';

import ReactDOM from 'react-dom';
import Resizable from 'react-resizable-box';

// import EmbedEditor from './EmbedEditor';

// import {safeGetInToJS} from 'utils/safeParse';

let styles = {};

export const EmbedEdited = React.createClass({
	propTypes: {
		imageSource: PropTypes.string,

		align: PropTypes.oneOf(['inline', 'full', 'left', 'right', 'inline-word']),
		size: PropTypes.string,
		caption: PropTypes.string,
		citeCount: PropTypes.number,
		context: PropTypes.oneOf(['reference-list', 'document', 'library']), // where the embed is being used
		nodeId: PropTypes.number,
	},
	getInitialState: function() {
		return {
			selected: false,
		};
	},
	getDefaultProps: function() {
		return {
			context: 'document',
		};
	},

	componentWillUpdate: function(nextProps, nextState) {
	},

	componentWillUnmount: function() {
		console.log('unmounted atom!');
	},

	getSize: function() {
		const elem = ReactDOM.findDOMNode(this.refs.menupointer);
		return {
			width: elem.clientWidth,
			left: elem.offsetLeft,
			top: elem.offsetTop,
		};
	},

	setCiteCount: function(citeCount) {
		this.setState({citeCount});
		this.forceUpdate();
	},

	setSelected: function(selected) {
		this.setState({selected});
	},

	updateParams: function(newAttrs) {
		this.props.updateParams(this.props.nodeId, newAttrs);
	},

	typeNewCaption: function() {
		const newCaption = this.refs.captionInput.value;
		this.updateParams({caption: newCaption});
		this.refs.captionInput.focus();
	},

	focusCaption: function() {
		this.refs.captionInput.focus();
	},

	render: function() {
		const data = this.props.data || {};
		// Data is the version object with a populated parent field.
		// The parent field is the atomData field


		const selected = this.state.selected;

    console.log('image src', this.props.source);

		return (
			<div ref="embedroot" className={'pub-embed ' + this.props.className}>
				<figure style={styles.figure({size: this.props.size, align: this.props.align})}>
				<div style={{width: this.props.size, position: 'relative', display: 'table-row'}}>
				<Resizable
					width={'100%'}
					height={'auto'}
					maxWidth={650}
					customStyle={styles.outline({selected})}
					onResizeStop={(direction, styleSize, clientSize, delta) => {
						const ratio = (clientSize.width / 650) * 100;
						this.updateParams({size: ratio + '%' });
					}}>
						<img src={this.props.source}></img>
				</Resizable>
			</div>
			<figcaption style={styles.caption({size: this.props.size, align: this.props.align})}>
				<span
					draggable="false"
					className="caption"
					ref="captionInput"
					contentEditable="false"

					style={styles.captionText({align: this.props.align})}>
					{this.props.caption}
				</span>
			</figcaption>
			</figure>
			</div>
		);
	}
});

styles = {
	embed: function({size}) {

		const style = {
			zIndex: 10000,
			pointerEvents: 'all',
			position: 'absolute',
			minWidth: '200px',
			width: `calc(${size} * 0.8)`,
			margin: `0 calc(${size} * 0.1)`,
		};

		const parsedSize = parseInt(size);
		const realSize = 650 * (parsedSize / 100);
		if (realSize * 0.8 < 200) {
			const newMargin = Math.round((realSize - 200) / 2);
			style.margin = `0 ${newMargin}px`
		}
		return style;
	},
	button: {
		padding: '0em 0em',
		height: '0.75em',
		width: '0.75em',
		position: 'relative',
		top: '-0.15em',
		verticalAlign: 'middle',
		display: 'inline-block',
		cursor: 'pointer',
		// border: 'none'
	},
	hover: {
		minWidth: '275px',
		padding: '1em',
		fontSize: '0.85em'
	},
	number: {
		display: 'inline-block',
		height: '100%',
		verticalAlign: 'top',
		position: 'relative',
		top: '-0.45em',
		fontSize: '0.85em',
	},
	outline: function({selected}) {
		return {
			outline: (selected) ? '3px solid #BBBDC0' : '3px solid transparent',
			transition: 'outline-color 0.15s ease-in',

		};
	},
	figure: function({size, align, selected}) {
		const style = {
			width: size,
			display: 'table',
		};
		if (align === 'left') {
			style.float = 'left';
		} else if (align === 'right') {
			style.float = 'right';
		} else if (align === 'full') {
			style.margin = '0 auto';
		}
 		return style;
	},
	caption: function({size, align}) {
		const style = {
			width: size,
			display: 'table-row',
		};
		return style;
	},
	captionText: function({align}) {
		const style = {
			width: '100%',
			display: 'inline-block',
		};
		return style;
	}
};

export default EmbedEdited;
