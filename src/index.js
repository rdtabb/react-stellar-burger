import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { App } from './components'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <DndProvider backend={HTML5Backend}>
                <Provider store={store}>
                    <App />
                </Provider>
            </DndProvider>
        </BrowserRouter>
    </React.StrictMode>
)
