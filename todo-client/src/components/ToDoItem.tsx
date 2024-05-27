import React from "react"
import { ToDoItem } from "../todo"

interface Props {
	task: ToDoItem
	onDelete: () => void
	onStatusChange: () => void
}

const ToDoItemComponent: React.FC<Props> = ({
	task,
	onDelete,
	onStatusChange,
}) => {
	const handleDelete = async () => {
		await fetch(`http://localhost:3000/tasks/${task.id}`, { method: "DELETE" })
		onDelete()
	}

	const handleStatusChange = async () => {
		await fetch(`http://localhost:3000/tasks/${task.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...task, status: "done" }),
		})
		onStatusChange()
	}

	return (
		<tr>
			<td>{task.name}</td>
			<td>{task.description}</td>
			<td>{task.date}</td>
			<td>{task.status}</td>
			<td>
				<button onClick={handleStatusChange}>
					{task.status === "done" ? "Undo" : "Mark as Done"}
				</button>
				<button onClick={handleDelete}>Delete</button>
			</td>
		</tr>
	)
}

export default ToDoItemComponent
