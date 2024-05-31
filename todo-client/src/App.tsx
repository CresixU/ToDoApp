import React from "react"
import logo from "./logo.svg"
import "./App.css"
import ToDoList from "./components/ToDoList"
import WelcomePageView from "./views/WelcomePageView"
import { Outlet, Link } from "react-router-dom"


function App() {
	return (
		<div>
			<nav>
				<ul>
					<li>
					<Link to="/">Home</Link>
					</li>
					<li>
					<Link to="/todo-list">ToDo List</Link>
					</li>
				</ul>
			</nav>
			<div className="container-xxl">
				<Outlet />
			</div>
	  </div>
	)
}

export default App
