import React, {PropTypes} from 'react';
import Radium from 'radium';
import {globalStyles} from '../../utils/styleConstants';

import {globalMessages} from '../../utils/globalMessages';
import {FormattedMessage} from 'react-intl';

let styles = {};

const EditorBottomNav = React.createClass({
	propTypes: {
		viewMode: PropTypes.string,
		loadStatus: PropTypes.string,
		darkMode: PropTypes.bool,
		showBottomLeftMenu: PropTypes.bool,
		showBottomRightMenu: PropTypes.bool,
		toggleTOCHandler: PropTypes.func,
		toggleFormattingHandler: PropTypes.func,
		activeFocus: PropTypes.string,
		focusEditorHandler: PropTypes.func,
		travisTOC: PropTypes.array,
		insertFormattingHandler: PropTypes.func,
	},

	getDefaultProps: function() {
		return {
			
		};
	},

	// Function to generate side-list fade in animations.
	// Generates unique style per side and per item-depth
	animateListItemStyle: function(side, status, index) {
		const statusOffset = { loaded: 0, loading: 1};
		const offset = { left: -100, right: 100};
		const delay = 0.25 + (index * 0.02);
		return {
			transform: 'translateX(' + statusOffset[status] * offset[side] + 'px)',
			transition: '.3s ease-out transform ' + delay + 's',
		};
	},

	render: function() {
		return (
			<div style={[styles.common.editorBottomNav, styles[this.props.viewMode].editorBottomNav, globalStyles.hiddenUntilLoad, globalStyles[this.props.loadStatus]]}>

				{/* Background header bar that's used in livePreview mode. Provides opaque background. */}
				<div style={[styles.common.bottomNavBackground, styles[this.props.viewMode].bottomNavBackground, this.props.darkMode && styles.common.bottomNavBackgroundDark]}></div>

				<div className="leftBottomNav" style={[styles.common.bottomNavLeft, styles[this.props.viewMode].bottomNavLeft]}>

					{/* Table of Contents Title */}
					<div key="bNav_toc" style={[styles.common.bottomNavTitle, styles[this.props.viewMode].bottomNavTitle, this.props.showBottomLeftMenu && styles[this.props.viewMode].listTitleActive]} onClick={this.props.toggleTOCHandler}>
						<FormattedMessage {...globalMessages.tableOfContents} />
					</div>
					<div key="showAllTOCButton" style={[styles.showAll, this.props.activeFocus !== '' && styles.showAllVisible]} onClick={this.props.focusEditorHandler(this.props.activeFocus, 0)}>
						{'- '}<FormattedMessage id="editor.showAll" defaultMessage="show all"/>{' -'}
					</div>

					{/* Table of Contents line separator */}
					<div style={[styles.common.bottomNavDivider, styles[this.props.viewMode].bottomNavDivider]}>
						<div style={[styles.common.bottomNavDividerSmall, styles[this.props.viewMode].bottomNavDividerSmall]}></div>
						<div style={[styles.common.bottomNavDividerLarge, styles[this.props.viewMode].bottomNavDividerLarge]}></div>
					</div>

					{/* Table of Contents list */}
					<ul style={[styles.common.bottomNavList, styles[this.props.viewMode].bottomNavList, this.props.showBottomLeftMenu && styles[this.props.viewMode].listActive]}>
						{()=>{
							// const options = ['Introduction', 'Prior Art', 'Resources', 'Methods', 'A New Approach', 'Data Analysis', 'Results', 'Conclusion'];
							const options = this.props.travisTOC;
							return options.map((item, index)=>{
								return <li key={'blNav' + index} onClick={this.props.focusEditorHandler(item.title, index)} style={[styles.common.bottomNavListItem, styles[this.props.viewMode].bottomNavListItem, this.animateListItemStyle('left', this.props.loadStatus, index), this.props.showBottomLeftMenu && styles[this.props.viewMode].listItemActive, this.props.activeFocus === item.title && styles.common.listItemActiveFocus]}>{item.title}</li>;
							});
						}()}
					</ul>
				</div>

				<div className="rightBottomNav" style={[styles.common.bottomNavRight, styles[this.props.viewMode].bottomNavRight]}>

					{/* Formatting Title */}
					<div key="bNav_format" style={[styles.common.bottomNavTitle, styles[this.props.viewMode].bottomNavTitle, styles.alignRight, this.props.showBottomRightMenu && styles[this.props.viewMode].listTitleActive]} onClick={this.props.toggleFormattingHandler}>
						<FormattedMessage id="editor.formatting" defaultMessage="Formatting"/>
					</div>

					{/* Formatting line separator */}
					<div style={[styles.common.bottomNavDivider, styles[this.props.viewMode].bottomNavDivider]}>
						<div style={[styles.common.bottomNavDividerSmall, styles[this.props.viewMode].bottomNavDividerSmall, styles.floatRight, styles.common.bottomNavDividerRight]}></div>
						<div style={[styles.common.bottomNavDividerLarge, styles[this.props.viewMode].bottomNavDividerLarge, styles.floatRight, styles.common.bottomNavDividerLargeRight]}></div>
					</div>

					{/* Formatting list */}
					<ul style={[styles.common.bottomNavList, styles[this.props.viewMode].bottomNavList, styles[this.props.viewMode].bottomNavListRight, styles.alignRight, this.props.showBottomRightMenu && styles[this.props.viewMode].listActive]}>
						{()=>{
							const options = ['H1', 'H2', 'H3', 'Bold', 'Italic', '# List', '- List', 'Line', 'Link', 'Image', 'Video', 'Cite', 'Pagebreak', 'Linebreak', 'Quote'];
							return options.map((item, index)=>{
								return <li key={'brNav' + index} onClick={this.props.insertFormattingHandler(item)} style={[styles.common.bottomNavListItem, styles[this.props.viewMode].bottomNavListItem, this.animateListItemStyle('right', this.props.loadStatus, index), styles.floatRight, this.props.showBottomRightMenu && styles[this.props.viewMode].listItemActive]}>{item}</li>;
							});
						}()}
					</ul>
				</div>
			</div>
		);
	}
});

export default Radium(EditorBottomNav);

styles = {
	alignRight: {
		textAlign: 'right',
	},
	floatRight: {
		float: 'right',
	},
	hiddenMainEditor: {
		height: 0,
		overflow: 'hidden',
		pointerEvents: 'none',
	},
	showAll: {
		padding: '0px 5px',
		display: 'none',
		color: globalStyles.veryLight,
		position: 'absolute',
		top: -1,
		left: 135,
		height: '30px',
		lineHeight: '30px',
		width: 73,
		':hover': {
			cursor: 'pointer',
			color: 'black',
		}

	},
	showAllVisible: {
		pointerEvents: 'auto',
		display: 'inline-block',
	},

	showCommentsToggle: {
		backgroundColor: '#F5F5F5',
		cursor: 'pointer',
		width: '300px',
		height: '30px',
		lineHeight: '30px',
		margin: '0 auto',
		borderRadius: '1px',
		userSelect: 'none',
		textAlign: 'center',
		':hover': {
			color: 'black'
		}
	},
	common: {
		editorBottomNav: {
			position: 'fixed',
			top: 60,
			width: '100%',
			pointerEvents: 'none',
			zIndex: 10,
		},
		editorMarkdown: {
			margin: '30px 0px',
			width: '50vw',
			zIndex: 5,

			position: 'fixed',
			height: 'calc(100vh - 60px - 2*' + globalStyles.headerHeight + ')',
			overflow: 'hidden',
			overflowY: 'scroll',
		},
		editorPreview: {
			width: 'calc(50% - 20px)',
			backgroundColor: '#fff',
			boxShadow: 'rgba(0,0,0,0.25) 0px 3px 9px 1px',
			position: 'fixed',
			right: 0,
			top: 61,
			height: 'calc(100vh - 81px)',
			overflow: 'hidden',
			overflowY: 'scroll',
			zIndex: 20,
			padding: 10
		},
		bottomNavBackground: {
			position: 'absolute',
			height: globalStyles.headerHeight,
			backgroundColor: globalStyles.sideBackground,
			transition: '.352s linear opacity',
			opacity: 0,
			top: 1,
			width: '50%',
		},
		bottomNavBackgroundDark: {
			backgroundColor: '#272727',
		},
		bottomNavLeft: {
			// backgroundColor: 'rgba(100,200,85, 0.4)',
			// width: '20%',
			// height: 'calc(100vh - 60px)',
			position: 'relative',
			float: 'left',
		},
		bottomNavRight: {
			// backgroundColor: 'rgba(200,100,85, 0.4)',
			// width: '20%',
			// height: 'calc(100vh - 60px)',
			float: 'right',
			position: 'relative',
		},
		bottomNavTitle: {
			height: globalStyles.headerHeight,
			lineHeight: globalStyles.headerHeight,
			padding: '0px 20px',
			color: globalStyles.veryLight,
			fontSize: '.9em',
		},
		bottomNavDivider: {
			width: '20vw',
			height: '1px',
			position: 'relative',
		},
		bottomNavDividerSmall: {
			backgroundColor: globalStyles.veryLight,
			width: '50%',
			height: '100%',
			margin: '0px 20px',
			position: 'absolute',
			top: 0,
		},
		bottomNavDividerRight: {
			right: 0,
		},
		bottomNavDividerLarge: {
			backgroundColor: globalStyles.veryLight,
			width: 'calc(25vw + 1px)',
			height: '100%',
			margin: '0px 0px',
			position: 'absolute',
			top: 0,
		},
		bottomNavDividerLargeRight: {
			right: 0,
		},
		bottomNavList: {
			listStyle: 'none',
			margin: 0,
			padding: 0,
			overflow: 'hidden',
			overflowY: 'scroll',
			maxHeight: 'calc(100vh - 90px)',
			opacity: 1,
			transition: '.352s linear opacity',
		},
		bottomNavListItem: {
			margin: '0px 20px',
			padding: '3px 0px',
			float: 'left',
			clear: 'both',
			color: globalStyles.veryLight,
			fontSize: '.8em',
			pointerEvents: 'auto',

			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			maxWidth: '15vw',
			':hover': {
				cursor: 'pointer',
				color: globalStyles.sideText,
			}
		},
		listItemActiveFocus: {
			color: 'black',
		}
	},

	edit: {
		editorMarkdown: {
			transition: '.352s linear transform, .3s linear opacity .25s, 0s linear padding .352s, 0s linear left .352s',
			transform: 'translateX(0%)',
			padding: globalStyles.headerHeight + ' 25vw',
			left: 0,
		},
		editorPreview: {
			transition: '.352s linear transform',
			transform: 'translateX(110%)',
		},
		bottomNavRight: {
			transition: '.352s linear transform',
			transform: 'translateX(0%)',
		},
		bottomNavDividerLarge: {
			transition: '.352s linear opacity',
			opacity: 0,
		},
		bottomNavBackground: {
			opacity: 0,
		},
	},

	preview: {
		editorBottomNav: {
			pointerEvents: 'none',
		},
		editorMarkdown: {
			transition: '.352s linear transform, .3s linear opacity .25s',
			transform: 'translateX(-50%)',
			padding: globalStyles.headerHeight + ' 0px',
			left: '25vw'
		},
		editorPreview: {
			transition: '.352s linear transform',
			transform: 'translateX(0%)',
		},
		bottomNavRight: {
			transition: '.352s linear transform',
			transform: 'translateX(-250%)',
		},
		bottomNavTitle: {
			pointerEvents: 'auto',
			':hover': {
				color: globalStyles.sideText,
				cursor: 'pointer',
			}
		},
		bottomNavDividerLarge: {
			transition: '.352s linear opacity',
			opacity: 1,
		},
		bottomNavBackground: {
			opacity: 1,
		},
		bottomNavList: {
			opacity: 0,
			backgroundColor: globalStyles.sideBackground,
			transition: '.1s linear opacity, 0s linear box-shadow 0.352s',
			boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.3)',

		},
		bottomNavListRight: {
			boxShadow: '-3px 3px 3px 0px rgba(0,0,0,0.3)',
		},
		bottomNavListItem: {
			pointerEvents: 'none',
		},
		listActive: {
			opacity: 1,
		},
		listItemActive: {
			pointerEvents: 'auto',
			width: '100%',
		},
		listTitleActive: {
			color: globalStyles.sideText,
		}
	},
};