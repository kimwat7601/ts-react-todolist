import { useState } from 'react'
import AddTaskForm from './components/AddTaskForm';
import TodoList from './components/TodoList';
import './styles/style.css';

type DataProps = {
  id: number;
  todoTxt: string;
  status: boolean;
}

function App() {
  const [data, setData] = useState<DataProps[]>([]);
  const [count, setCount] = useState(0);

  const handleEntryClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const elemTodoInputText = document.querySelector('.todo-input-text') as HTMLInputElement;
    const taskTxt = elemTodoInputText.value;
    if(!taskTxt) {
      return;
    };
    setData((prevState) => {
      const itemData = {id: count, todoTxt: taskTxt, status: false};
      return [itemData, ...prevState];
    });
    setCount((prevState) => prevState + 1);
    elemTodoInputText.value = '';
  };
  const handleChange = (id:number) => {
    setData(prevState => {
      const newData = prevState.map((item) => {
        if(item.id === id) {
          const newItem = {
            ...item,
            status: !item.status
          }
          return newItem;
        } else {
          return item;
        }
      });
      return newData;
    });
  };

  const handleClick = (id:number) => {
    setData((data) => {
      return data.filter((item) => {
        return item.id !== id;
      });
    });
  };

  return (
    <main role="main">
      <h1 className="page-title">Javascript演習<span className="page-main-title">Todoリスト</span></h1>
      <div className="todolist-wrap">
          <form>
            <AddTaskForm
              handleEntryClick={handleEntryClick}
            />
            <TodoList
              handleChange={handleChange}
              handleClick={handleClick}
              data={data}
            />
          </form>
      </div>
    </main>
  )
}

export default App
