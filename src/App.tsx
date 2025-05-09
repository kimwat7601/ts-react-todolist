import { JSX, useState } from 'react'
import AddTaskForm from './components/AddTaskForm';
import TodoList from './components/TodoList';
import './styles/style.css';
import { DataProps } from './types';
import MyStorage from './components/Storage';

const storage = new MyStorage('todoList');
const initData: DataProps[] | null = storage.getItem('todoListData');

function App():JSX.Element {
  const [data, setData] = useState<DataProps[]>(initData ? initData : []);
  // const [count, setCount] = useState(0);

  const saveData = (data: DataProps[]):void => {
    storage.setItem('todoListData', data);
    storage.save();
  };

  const handleAddTask = (taskText: string): void => {
    setData((prevState) => {
      const itemData = {id: Date.now(), todoTxt: taskText, status: false};
      const upDateData = [itemData, ...prevState];
      saveData(upDateData);
      return upDateData;
    });
    // setCount((prevState) => prevState + 1);
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
      saveData(newData);
      return newData;
    });
  };

  const handleClick = (id:number): void => {
    setData((data) => {
      const newData = data.filter((item) => {
        return item.id !== id;
      });
      saveData(newData);
      return newData;
    });
  };

  const handleEditSave = (id: number, task: string): void => {
    setData((data) => {
      const newData = data.map((item) => {
        if(item.id === id) {
          return {
            ...item,
            todoTxt: task
          }
        } else {
          return item;
        }
      });
      saveData(newData);
      return newData;
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
