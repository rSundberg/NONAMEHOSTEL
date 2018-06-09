import React from 'react'
import ReactDOM from 'react-dom'

import Home from './browser/home'
import Loader from './browser/loader'

import './shared/css/app.css'

function App() {
    return <Home />
}

ReactDOM.render(<App />, document.getElementById('app'));