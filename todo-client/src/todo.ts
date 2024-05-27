export interface ToDoItem {
	id: number
	name: string
	description: string
	date: string
	status: "pending" | "done"
}
