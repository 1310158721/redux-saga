import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects'

export function* incrementAsync () {
    // call 后面接一个函数
    yield call(delay, 1000)
    // put 后面dispatch一个action到store
    yield put({type: 'INCREMENT'})
}

export function* watchIncrementAsync() {
    // takeEvery 监听 action(type 为 INCREMENT_ASYNC 时，该 action 不一定要写在reducers中)
    // 执行 incrementAsync 函数
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* rootSaga () {
    yield [
        watchIncrementAsync()
    ]
}

export default rootSaga