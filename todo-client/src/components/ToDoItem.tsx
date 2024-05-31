import React, { useState } from "react"
import { ToDoItem } from "../todo"
import '../css/ToDoItem.css';

interface Props {
	task: ToDoItem
	fetchTasks: () => Promise<void>
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
		fetchTasks()
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

	const toggleStatus = async (id:string) => {
		await fetch(`http://localhost:3001/api/todos/${id}`, {
			method: "PATCH",
		});
		fetchTasks();
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
					<button onClick={saveTask} className="edytuj">Potwierdź</button>
					<button onClick={toggleEditMode} className="usun">Anuluj</button>
				</td>
			</tr>
		)
	}

	return ( //
		<tr className={`${task.status == "pending" ? "" : 'todo-done'} `} onClick={() => toggleStatus(task._id)}>
			<td>{task.name}</td>
			<td>{task.description}</td>
			<td>{task.date.slice(0, 10)}</td>
			<td className="d-none d-md-table-cell">{task.status == "pending" ? 'W trakcie' : "Zrobione"}</td>
			<td>
			<button className="edytuj" onClick={toggleEditMode}>Edytuj</button>
			<button className="usun" onClick={() => handleDelete(task._id)}>Usuń</button>
			</td>
		</tr>
	)
	
}

export default ToDoItemComponent
