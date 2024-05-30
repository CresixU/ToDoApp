import React, { useEffect, useState } from "react"
import { ToDoItem } from "../todo"
import ToDoItemComponent from "./ToDoItem"
import "./ToDoList.css"

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
		const response = await fetch("http://localhost:3001/api/todos") // Zmień URL na właściwy endpoint API
		const data = await response.json()
		setTasks(data)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewTask({ ...newTask, [name]: value })
	}

	const addTask = async () => {
		const response = await fetch("http://localhost:3001/api/todos", {
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
			<div className='input-container'>
				<input
					type='text'
					name='name'
					value={newTask.name}
					onChange={handleInputChange}
					placeholder='Nazwa zadania' //NAZWA ZADANIA
					required
				/>
				<input
					type='text'
					name='description'
					value={newTask.description}
					onChange={handleInputChange}
					placeholder='Opis zadania'
					required
				/>
				<button className='button' onClick={addTask}>
					Dodaj nowe zadanie
				</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>Nazwa</th>
						<th>Opis</th>
						<th>Data utworzenia</th>
						<th>Status zadania</th>
						<th>Czynności</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map(task => (
						<ToDoItemComponent
							key={task._id}
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
