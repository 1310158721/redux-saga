import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'

// 引入 saga 的工厂函数（createSagaMiddleware）来创建 saga 的中间件
import createSagaMiddleware from 'redux-saga'

// 引入要运行的saga
import rootSaga from './sagas'

import reducer from './reducers'

// 创建一个 saga 的中间件
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    // 将 saga 的中间件连接至 redux 的 store中
    applyMiddleware(sagaMiddleware)
)

// 运行saga
sagaMiddleware.run(rootSaga)

// 定义函数 action
const action = type => store.dispatch({type})

class Counter extends React.Component {
    render () {
        return (
            <div>
                <div>
                    <button onClick={() => action('INCREMENT')}>increment</button>
                    <button onClick={() => action('DECREMENT')} style={{marginLeft: 10}}>decrement</button>
                    <button onClick={() => action('INCREMENT_ASYNC')} style={{marginLeft: 10}}>incrementAsync</button>
                </div>
                <p>the value is:  {store.getState()}</p>
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(<Counter />, document.getElementById('root'))
}

render()

// store 订阅 render 函数
store.subscribe(render)
