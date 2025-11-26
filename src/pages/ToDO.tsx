import { useState } from 'react'
import Modal from '../components/modal';

function ToDo(){
    const [task,setTask] = useState<string>("");
    const [tasks,setTasks] = useState<string[]>([]);
    const [editIndex,seteditIndex] = useState<number|null>(null);
    const [error,setError] = useState<string>("");
    const [openModal,setopenModal] = useState(false);
    const [deleteIndex,setdeleteIndex] = useState<number|null>(null);
    const addorUpdateTask = ()=>{
        if(task.trim()===""){
            setError("Enter Tasks");
            return;
        }
        
        if(editIndex!=null){
        const updatedTask = [...tasks];
        updatedTask[editIndex] = task;
        setTasks(updatedTask);


        seteditIndex(null);
        setTask("");
        }else{
        setTasks([task,...tasks]);
        setTask("");
        }
    }

    const deleteTask = () => {
        if(deleteIndex != null){
            setTasks(tasks.filter((_, i) => i !== deleteIndex));
        }
        setopenModal(false);

    };

    const editTask = (index:number) => {
        setTask(tasks[index]);
        seteditIndex(index);
    }

    // const handleConfirm = () =>{
    //     setopenModal(false);
    //     alert("confirmed")
    // }

    // const handleCancel = () =>{
    //     setopenModal(false);
    // }
    const handleDelete = (index:number) =>{
        setdeleteIndex(index);
        setopenModal(true);
    }
    return (
        <>
            <div className='todo-container'>
                <h1>To Do List</h1>
                <div style={{display: 'flex', alignItems: 'center' }}>
                    <input type='text' className="todo-input" value={task} placeholder='enter task' onChange={(e)=>setTask(e.target.value)}/>
                    <button onClick={addorUpdateTask} className='add-btn'>{editIndex!==null?"UPDATE":"ADD"}</button>
                </div>
                {error && <p className="error">{error}</p>}
                <ul className='todo-list'>
                {tasks.map((item,index) =>(
                    <li key={index} className='todo-item'>
                        {item}
                        <button onClick={()=>editTask(index)} className='edit-btn'>EDIT</button>
                        <button onClick={()=>handleDelete(index)} className='delete-btn'>DELETE</button>
                    </li>
                ))}
                </ul>
            </div>
            <Modal
                isOpen = {openModal}
                title = "Delete Task"
                message = "Are you sure want to delete this Task?"
                onConfirm = {deleteTask}
               onCancel={() => setopenModal(false)}
            />
        </>
    )
}
export default ToDo;