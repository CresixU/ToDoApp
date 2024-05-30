export interface ToDoItem {
	_id: string
	name: string
	description: string
	date: string
	status: "w trakcie" | "zrobione"
}