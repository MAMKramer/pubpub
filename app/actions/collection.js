import { apiFetch } from 'utilities';

/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_COLLECTION_DATA_LOAD = 'collection/GET_COLLECTION_DATA_LOAD';
export const GET_COLLECTION_DATA_SUCCESS = 'collection/GET_COLLECTION_DATA_SUCCESS';
export const GET_COLLECTION_DATA_FAIL = 'collection/GET_COLLECTION_DATA_FAIL';

export const POST_COLLECTION_LOAD = 'collection/POST_COLLECTION_LOAD';
export const POST_COLLECTION_SUCCESS = 'collection/POST_COLLECTION_SUCCESS';
export const POST_COLLECTION_FAIL = 'collection/POST_COLLECTION_FAIL';

export const PUT_COLLECTION_LOAD = 'collection/PUT_COLLECTION_LOAD';
export const PUT_COLLECTION_SUCCESS = 'collection/PUT_COLLECTION_SUCCESS';
export const PUT_COLLECTION_FAIL = 'collection/PUT_COLLECTION_FAIL';

export const DELETE_COLLECTION_LOAD = 'collection/DELETE_COLLECTION_LOAD';
export const DELETE_COLLECTION_SUCCESS = 'collection/DELETE_COLLECTION_SUCCESS';
export const DELETE_COLLECTION_FAIL = 'collection/DELETE_COLLECTION_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function getCollectionData(collectionId, communityId, createPubHash) {
	return (dispatch) => {
		dispatch({ type: GET_COLLECTION_DATA_LOAD });
		return apiFetch(`/collections/${collectionId}?communityId=${communityId}${createPubHash ? `&createPubHash=${createPubHash}` : ''}`)
		.then((result) => {
			dispatch({ type: GET_COLLECTION_DATA_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: GET_COLLECTION_DATA_FAIL, error });
		});
	};
}

export function postCollection({ communityId, title, slug, isPage, description }) {
	return (dispatch) => {
		dispatch({ type: POST_COLLECTION_LOAD });
		return apiFetch('/collections', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				communityId,
				title,
				slug,
				isPage,
				description,
			})
		})
		.then((result) => {
			dispatch({ type: POST_COLLECTION_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: POST_COLLECTION_FAIL, error });
		});
	};
}

export function putCollection({ communityId, collectionId, title, slug, description, isPublic, isOpenSubmissions, layout, createPubMessage }) {
	return (dispatch) => {
		dispatch({ type: PUT_COLLECTION_LOAD });
		return apiFetch('/collections', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				communityId,
				collectionId,
				title,
				slug,
				description,
				isPublic,
				isOpenSubmissions,
				layout,
				createPubMessage
			})
		})
		.then((result) => {
			dispatch({ type: PUT_COLLECTION_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: PUT_COLLECTION_FAIL, error });
		});
	};
}

export function deleteCollection({ communityId, collectionId }) {
	return (dispatch) => {
		dispatch({ type: DELETE_COLLECTION_LOAD });
		return apiFetch('/collections', {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				communityId,
				collectionId,
			})
		})
		.then((result) => {
			dispatch({ type: DELETE_COLLECTION_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: DELETE_COLLECTION_FAIL, error });
		});
	};
}
