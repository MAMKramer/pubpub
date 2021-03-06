import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DiscussionInput from 'components/DiscussionInput/DiscussionInput';

require('./discussionNew.scss');

const propTypes = {
	pubId: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	loginData: PropTypes.object,
	initialContent: PropTypes.object,
	getHighlightContent: PropTypes.func,
	pathname: PropTypes.string.isRequired,
	handleDiscussionSubmit: PropTypes.func.isRequired,
	submitIsLoading: PropTypes.bool,
};
const defaultProps = {
	initialContent: undefined,
	getHighlightContent: undefined,
	loginData: {},
	submitIsLoading: false,
};

const DiscussionNew = function(props) {
	function onDiscussionSubmit(replyObject) {
		props.handleDiscussionSubmit({
			userId: props.loginData.id,
			pubId: props.pubId,
			title: replyObject.title,
			content: replyObject.content,
			text: replyObject.text,
			isPublic: replyObject.isPublic,
			highlights: replyObject.highlights,
		});
	}

	return (
		<div className={'discussion-new'}>
			<Link to={`/pub/${props.slug}/collaborate`} className={'top-button pt-button pt-minimal'}>
				Cancel
			</Link>

			{!props.loginData.id &&
				<div className={'login-wrapper'}>
					<Link to={`/login?redirect=${props.pathname}`} className={'pt-button pt-fill'}>
						Login to Add Discussion
					</Link>
				</div>
			}

			<div className={props.loginData.id ? '' : 'disabled'}>
				<DiscussionInput
					initialContent={props.initialContent}
					handleSubmit={onDiscussionSubmit}
					showTitle={true}
					submitIsLoading={props.submitIsLoading}
					getHighlightContent={props.getHighlightContent}
				/>
			</div>

		</div>
	);
};

DiscussionNew.propTypes = propTypes;
DiscussionNew.defaultProps = defaultProps;
export default DiscussionNew;
