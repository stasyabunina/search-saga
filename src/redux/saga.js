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









// function filterChangeSearchAction({ type }) {
// 	return type === SEARCHING.type
// }

// function* handleChangeSearchSaga({ payload }) {
// 	yield put(LOADING_SEARCH(payload))
// }

// function* handleSearchSkillsSaga({ payload }) {
// 	try {
// 		const retryCount = settingSearchSaga.retryCount
// 		const retryDelay = settingSearchSaga.retryDelay * 1000
// 		const data = yield retry(retryCount, retryDelay, request, {
// 			query: payload,
// 			mainUrl: import.meta.env.VITE_MAIN_URL,
// 			subURL: import.meta.env.VITE_SEARCH_URL
// 		})

// 		yield put(SUCCESS_SEARCH(data))
// 	} catch (error) {
// 		yield put(FAIL_SEARCH())
// 	}
// }

// export function* watchChangeSearchSaga() {
// 	yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga)
// }

// export function* watchSearchSkillsSaga() {
// 	yield takeLatest(LOADING_SEARCH.type, handleSearchSkillsSaga)
// }


















// export function* getPostSaga(action: PayloadAction<string>) {
//     const text = action.payload.trim();
  
//     if (text) {
//       try {
//         yield put(getPostLoading());
//         const payload: DataItem[] = yield retry(3, 1000, getPostApi, text);
  
//         yield put(getPostsSuccess(payload));
//       } catch (error) {
//         yield put(getPostFailed((error as Error).message));
//       }
//     } else {
//       yield put(clearPosts());
//       yield put(getPostsSuccess([]));
//     }
//   }
  
//   export function* sagas() {
//     yield takeLatest(GET_POSTS, getPostSaga);
//   }

