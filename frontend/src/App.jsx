import { useEffect, useState } from "react";
import "./assets/Css/App.css";
import { useNavigate } from "react-router-dom";
import checkLogin from "./assets/functionality/checkLogin";
import addTODO from "./assets/functionality/addTODO";
import getTODO from "./assets/functionality/getTodo";
import removeTODO from "./assets/functionality/removeTodo";

function App() {
  const [todoList, setTODOList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const add = async () => {
    const newTodo = await addTODO(inputValue);
    setTODOList([...todoList, newTodo]);
    setInputValue('');
  }

  const getAllTODOs = async () => {
    setTODOList(await getTODO());
  }
  useEffect(() => {
    if (checkLogin()) {
      getAllTODOs();
    } else {
      navigate("/login");
    }
  }, []);

  const remove = async (id) => {
    if (removeTODO(id)) {
      let newTodoList = todoList.filter(todo => todo._id !== id);
      setTODOList(newTodoList);
    } else {
      console.log("Error occurred");
    }
  }

  return (
    <div className="todo-container">
      <div className="todo-app">
        <div className="app-title">
          <h2>TODO app</h2>
          <i className="fa-solid fa-book-bookmark"></i>
        </div>
        <div className="row">
          <input type="text" id="input-box" value={inputValue} onChange={(event) => { setInputValue(event.target.value) }} onKeyDown={(event) => { if (event.key == "Enter") { add() } }} placeholder="Add Your Tasks" />
          <button onClick={add}>Add</button>
        </div>
        <ul id="list-container" >
          {
            todoList.map((todo, index) => {
              return <li key={index}>{todo.title}<span onClick={() => { remove(todo._id) }}>x</span></li>
            })
          }
        </ul>
      </div>
    </div>
  );

}

export default App
