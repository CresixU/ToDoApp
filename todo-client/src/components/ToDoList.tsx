import React, { useEffect, useState } from "react"
import { ToDoItem } from "../todo"
import ToDoItemComponent from "./ToDoItem"
import "../css/ToDoList.css"

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
				date: new Date().toISOString(), // Generate today's date
			}),
		})
		if (response.ok) {
			fetchTasks() // Refresh the list of tasks after adding a new one
			setNewTask({ name: "", description: "", date: "", status: "pending" }) // Reset the input fields
		}
	}
	
	return (
		<div>
			<div className='input-container row'>
				<div className="col-12 col-lg-4 p-2">
					<input
						className="w-100"
						type='text'
						name='name'
						value={newTask.name}
						onChange={handleInputChange}
						placeholder='Nazwa zadania' //NAZWA ZADANIA*
						required
					/>
				</div>
				<div className="col-12 col-lg-4 p-2">
					<input
						className="w-100"
						type='text'
						name='description'
						value={newTask.description}
						onChange={handleInputChange}
						placeholder='Opis zadania'
						required
					/>
				</div>
				<div className="col-12 col-lg-4 p-2">
					<button className='button w-100 m-0' onClick={addTask}>
						Dodaj nowe zadanie
					</button>
				</div>
			</div>

			<div >
				<table className='w-100'>
					<thead>
						<tr>
							<th>Nazwa</th>
							<th>Opis</th>
							<th>Data utworzenia</th>
							<th className="d-none d-md-table-cell">Status zadania</th>
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
		</div>
	)
}

export default ToDoList
