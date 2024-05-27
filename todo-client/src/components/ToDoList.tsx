import React, { useEffect, useState } from "react"
import { ToDoItem } from "../todo"
import ToDoItemComponent from "./ToDoItem"

const ToDoList = () => {
	const [tasks, setTasks] = useState<ToDoItem[]>([])

	useEffect(() => {
		fetchTasks()
	}, [])

	const fetchTasks = async () => {
		const response = await fetch("http://localhost:3000/tasks") // Zmień URL na właściwy endpoint API
		const data = await response.json()
		setTasks(data)
	}

	return (
		<div>
			<h1>ToDo Application</h1>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Date</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map(task => (
						<ToDoItemComponent
							key={task.id}
							task={task}
							onDelete={fetchTasks}
							onStatusChange={fetchTasks}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default ToDoList
