import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const auth = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState<string>("");

  async function getTodos() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setTodos(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function createTodo() {
    if (value.length > 3) {
      try {
        const response = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ title: value,completed: false }),
        });
        if (response.ok) {
          const todo = (await response.json()) as Todo;
          setTodos([...todos, todo]);
          setValue('');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteTodo() {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ title: value,completed: false }),
      });
      if (response.ok) {
        const json = await response.json();
        setTodos(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function editTodo(){
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ title: value,completed: false }),
      });
      if (response.ok) {
        const json = await response.json();
        setTodos(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo();
    setValue("");
  }
  // function handleDelete() {
  //   deleteTodo();
  // }
  // function handleEdit() {
  //   editTodo();
  // }

  return (
    <PortalLayout>
      <div className="dashboard">
        <h1>Dashboard de {auth.getUser()?.name ?? ""}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Escribe una nueva tarea..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Crear</button>
        </form>
        {todos.map((post: Todo) => (
          //Esto esta teniendo problema si se coloca post.id y se corrije con post._id
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.completed.toString()
            ? 'No Completado' : 'Completado'
            }</p>
            {/* <button  onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button> */}
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}