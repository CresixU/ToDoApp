import React, { useEffect, useState } from "react"
import { ToDoItem } from "../todo"
import ToDoItemComponent from "./ToDoItem"

const ToDoList = () => {
	const [tasks, setTasks] = useState<ToDoItem[]>([])
	const [newTask, setNewTask] = useState({
		name: "",
		description: "",
		date: "",
		status: "pending",
	})

	useEffect(() => {
		fetchTasks()
	}, [])

	const fetchTasks = async () => {
		const response = await fetch("http://localhost:3000/tasks") // Zmień URL na właściwy endpoint API
		const data = await response.json()
		setTasks(data)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewTask({ ...newTask, [name]: value })
	}

	const addTask = async () => {
		const response = await fetch("http://localhost:3000/tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...newTask,
				date: new Date().toISOString().slice(0, 10),
			}), // Generate today's date
		})
		if (response.ok) {
			fetchTasks() // Refresh the list of tasks after adding a new one
		}
	}

	return (
		<div>
			<h1>ToDo Application</h1>
			<div style={{ marginBottom: "20px" }}>
				<input
					type='text'
					name='name'
					value={newTask.name}
					onChange={handleInputChange}
					placeholder='Name of the task'
					required
				/>
				<input
					type='text'
					name='description'
					value={newTask.description}
					onChange={handleInputChange}
					placeholder='Short description'
					required
				/>
				<button onClick={addTask}>Add Task</button>
			</div>
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
							fetchTasks={fetchTasks}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default ToDoList
