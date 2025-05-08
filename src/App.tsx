import { JSX, useState } from 'react'
import AddTaskForm from './components/AddTaskForm';
import TodoList from './components/TodoList';
import './styles/style.css';
import { DataProps } from './types';

function App():JSX.Element {
  const [data, setData] = useState<DataProps[]>([]);
  const [count, setCount] = useState(0);

  const handleAddTask = (taskText: string): void => {
    setData((prevState) => {
      const itemData = {id: count, todoTxt: taskText, status: false};
      return [itemData, ...prevState];
    });
    setCount((prevState) => prevState + 1);
  };

  const handleChange = (id:number): void => {
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

  const handleClick = (id:number): void => {
    setData((data) => {
      return data.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const handleEditSave = (id: number, task: string): void => {
    setData((data) => {
      return data.map((item) => {
        if(item.id === id) {
          return {
            ...item,
            todoTxt: task
          }
        } else {
          return item;
        }
      });
    });
  };

  return (
    <main role="main">
      <h1 className="page-title">Javascript演習<span className="page-main-title">Todoリスト</span></h1>
      <div className="todolist-wrap">
        <AddTaskForm
          onAddTask={handleAddTask}
        />
        <TodoList
          handleChange={handleChange}
          handleClick={handleClick}
          handleEditSave={handleEditSave}
          data={data}
        />
      </div>
    </main>
  )
}

export default App
