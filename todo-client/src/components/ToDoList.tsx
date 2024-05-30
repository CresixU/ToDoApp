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
				date: new Date().toISOString().slice(0, 10), // Generate today's date
			}),
		})
		if (response.ok) {
			fetchTasks() // Refresh the list of tasks after adding a new one
			setNewTask({ name: "", description: "", date: "", status: "pending" }) // Reset the input fields
		}
	}
	


	return (
		<div>
			<h1>ToDo Application</h1>
			<h3>Witaj na stronie naszej aplikacji do zarządzania zadaniami! Zaprojektowana z myślą o wydajności, nasza aplikacja pozwala na łatwe dodawanie, organizowanie i śledzenie zadań. Dzięki wykorzystaniu nowoczesnej technologii React, oferujemy szybkie, intuicyjne i responsywne środowisko, które dopasowuje się do Twoich indywidualnych potrzeb. Niezależnie od tego, czy jesteś studentem, profesjonalistą, czy po prostu szukasz sposobu na zorganizowanie swojego dnia, nasza aplikacja jest dla Ciebie idealnym narzędziem. Zacznij korzystać już dziś i zobacz, jak łatwo możesz zapanować nad swoimi zadaniami!</h3>
			<h4>Aplikacja zaprojektowana przez Krystiana Wawrucha, Jakuba Walaska, Bartka Tomaszewskiego, Wojciecha Kuskę</h4>
			<div className='input-container'>
				<input
					type='text'
					name='name'
					value={newTask.name}
					onChange={handleInputChange}
					placeholder='Nazwa zadania' //NAZWA ZADANIA*
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

			<div className='table-container'>
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
		</div>
	)
}

export default ToDoList
