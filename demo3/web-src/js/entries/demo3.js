import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {GreetingReducer} from '../reducers/GreetingReducer.js'
import GreetingApp from '../components/GreetingApp.js'

let store = createStore(GreetingReducer)

render(
  <Provider store={store}>
    <GreetingApp />
  </Provider>,
  document.getElementById('reactHolder')
)
