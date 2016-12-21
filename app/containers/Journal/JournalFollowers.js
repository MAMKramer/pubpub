import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { PreviewUser } from 'components';

import { globalMessages } from 'utils/globalMessages';
import { FormattedMessage } from 'react-intl';


let styles;

export const JournalFollowers = React.createClass({
	propTypes: {
		journal: PropTypes.object,
	},

	render() {
		const journal = this.props.journal || {};
		const followers = journal.followers || [];
		return (
			<div style={styles.container}>
				<h2>Followers</h2>

				{followers.map((follower, index)=> {
					return <PreviewUser key={'follower-' + index} user={follower} />;
				})}

			</div>
		);
	}
});

export default Radium(JournalFollowers);

styles = {
	container: {
		
	},
	buttonLink: {
		textDecoration: 'none',
	},
};