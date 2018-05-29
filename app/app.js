import React from 'react'
import ReactDOM from 'react-dom'

import Home from './browser/home'

import './shared/css/app.css'

function App() {
    return <Home />
}

ReactDOM.render(<App />, document.getElementById('app'));