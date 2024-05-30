import React, { useState } from "react"
import { ToDoItem } from "../todo"
import '../css/ToDoItem.css';

interface Props {
	task: ToDoItem
	fetchTasks: () => Promise<void> // Poprawna nazwa funkcji
}

const ToDoItemComponent: React.FC<Props> = ({ task, fetchTasks }) => {
	const [editMode, setEditMode] = useState(false)
	const [editedTask, setEditedTask] = useState({ ...task })

	const handleEditChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setEditedTask({ ...editedTask, [e.target.name]: e.target.value })
	}

	const saveTask = async () => {
		await fetch(`http://localhost:3001/api/todos/${task._id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(editedTask),
		})
		setEditMode(false)
		fetchTasks() // Poprawnie użyta nazwa
	}

	const toggleEditMode = () => {
		setEditMode(!editMode)
	}

	const handleDelete = async (id:string) => {
		await fetch(`http://localhost:3001/api/todos/${id}`, {
			method: "DELETE",
		})
		fetchTasks()
	}
	if (editMode) {
	
		return (
			<tr>
				<td>
					<input
						type='text'
						name='name'
						value={editedTask.name}
						onChange={handleEditChange}
					/>
				</td>
				<td>
					<input
						type='text'
						name='description'
						value={editedTask.description}
						onChange={handleEditChange}
					/>
				</td>
				<td>
					<input
						type='date'
						name='date'
						value={editedTask.date}
						onChange={handleEditChange}
					/>
				</td>
				<td>
					<select
						name='status'
						value={editedTask.status}
						onChange={handleEditChange}>
						<option value='pending'>W trakcie</option>
						<option value='done'>Zrobione</option>
					</select>
				</td>
				<td>
					<button onClick={saveTask}>Confirm</button>
					<button onClick={toggleEditMode}>Cancel</button>
				</td>
			</tr>
		)
	}

	return ( //
		<tr>
			<td>{task.name}</td>
			<td>{task.description}</td>
			<td>{task.date}</td>
			<td>{task.status}</td>
			<td>
				<button onClick={toggleEditMode}>Edytuj</button>
				<button onClick={() => handleDelete(task._id)}>Usuń</button>
			</td>
		</tr>
	)
	
}

export default ToDoItemComponent
