import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import { searchPending, searchSuccess, searchFailure } from './actions/actionCreators';
import { CHANGE_SEARCH_FIELD, SEARCH_PENDING } from './actions/actionTypes';
import { searchApi } from '../api/searchApi';

function filterChangeSearchAction({ type, payload }) {
    return type === CHANGE_SEARCH_FIELD && payload.search.trim() !== ''
}

function* handleChangeSearchSaga(action) {
    yield put(searchPending(action.payload.search));
}

function* watchChangeSearchSaga() {
    yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga);
}

function* watchSearchSkillsSaga() {
    yield takeLatest(SEARCH_PENDING, handleSearchSkillsSaga);
}

function* handleSearchSkillsSaga(action) {
    try {
        const retryCount = 3;
        const retryDelay = 1 * 1000;

        const data = yield retry(retryCount, retryDelay, searchApi, action.payload.search);
        yield put(searchSuccess(data));
    } catch (e) {
        yield put(searchFailure(e.message));
    }
}

export default function* saga() {
    yield spawn(watchChangeSearchSaga);
    yield spawn(watchSearchSkillsSaga)
}