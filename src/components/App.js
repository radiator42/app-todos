import React from 'react'
import {connect} from 'react-redux'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

   const App = () => (
            <div>
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>
    );
export default connect()(App)