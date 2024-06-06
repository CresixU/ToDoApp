#Jak odpalić aplikacje?
W głównym folderze (ToDoApp) odpalasz 2 konsole (cmd.exe) <br>
- Testy (api) "cd todo-api" -> "npm test" <br>
- W pierwszej wpisujesz "cd todo-api" -> "npm start" <br>
- W drugiej wpisujesz "cd todo-client" -> "npm start" <br> <br>
Do poprawnego działania wymagany jest plik .env po stronie todo-api <br> <br>

Strona znajduje się na adresie https://localhost:3000
API znajduje się na adresie https://localhost:3001

<br><br>
.env file <br>
NODE_ENV=production #production / test <br>
MONGO_URI= mongoDb Database connection string <br>
MONGO_URI_TESTS= mongoDb Database connection string for tests <br
PORT=3001 #default
