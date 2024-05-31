import ToDoList from '../components/ToDoList';
import App from '../App'
import WelcomePageView from '../views/WelcomePageView';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      //errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <WelcomePageView />,
        },
        {
          path: "todo-list",
          element: <ToDoList />,
        },
      ],
    },
  ]);