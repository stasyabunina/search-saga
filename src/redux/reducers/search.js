import {
    CHANGE_SEARCH_FIELD, SEARCH_PENDING,
    SEARCH_FAILURE, SEARCH_SUCCESS, CLEAR_ITEMS
} from '../actions/actionTypes';

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    search: '',
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_PENDING:
            return { ...state, items: [], isLoading: true, error: null, };
        case SEARCH_FAILURE:
            const { error } = action.payload;
            return { ...state, isLoading: false, error, };
        case SEARCH_SUCCESS:
            const { items } = action.payload;
            return { ...state, items, isLoading: false, error: null, };
        case CHANGE_SEARCH_FIELD:
            const { search } = action.payload;
            return { ...state, search };
        case CLEAR_ITEMS:
            return { ...initialState };
        default:
            return state;
    }
}