export interface ToDoItem {
	id: number
	name: string
	description: string
	date: string
	status: "w trakcie" | "zrobione"
}