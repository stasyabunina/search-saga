import {
    CHANGE_SEARCH_FIELD, SEARCH_PENDING,
    SEARCH_FAILURE, SEARCH_SUCCESS, CLEAR_ITEMS
} from './actionTypes';

export const searchPending = search => ({
    type: SEARCH_PENDING, payload: { search }
});

export const searchFailure = error => ({
    type: SEARCH_FAILURE, payload: { error }
});

export const searchSuccess = items => ({
    type: SEARCH_SUCCESS, payload: { items }
});

export const changeSearchField = search => ({
    type: CHANGE_SEARCH_FIELD, payload: { search }
});

export const clearItems = () => ({
    type: CLEAR_ITEMS,
});