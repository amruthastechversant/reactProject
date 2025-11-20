import { useState } from 'react'
import './App.css'

function Welcome(){
  return (<h1>welcome to todo list</h1>)
}
function App() {
  
  const [task,setTask] = useState("");
  const [tasks,setTasks] = useState([]);
  const [editIndex,seteditIndex] = useState(null);

  const addorUpdateTask = ()=>{
    if(task.trim()==="")
    return;
    if(editIndex!=null){
      const updatedTask = [...tasks];
      updatedTask[editIndex] = task;
      setTasks(updatedTask);


      seteditIndex(null);
      setTask("");
    }else{
      setTasks([...tasks,task]);
      setTask("");
    }
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    seteditIndex(index);
  }

  return (
  
      <div className='todo-container'>
        <h1>To Do List</h1>
        <Welcome/>
        <div style={{display: 'flex', alignItems: 'center' }}>
        <input type='text' className="todo-input" value={task} placeholder='enter task' onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={addorUpdateTask} className='add-btn'>{editIndex!==null?"UPDATE":"ADD"}</button>
        </div>
        <ul className='todo-list'>
          {tasks.map((item,index) =>(
          <li key={index} className='todo-item'>
            {item}
          <button onClick={()=>editTask(index)} className='edit-btn'>EDIT</button>
          <button onClick={()=>deleteTask(index)} className='delete-btn'>DELETE</button>
          </li>
          ))}
        </ul>
      </div>
  )
}
export default App
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      
