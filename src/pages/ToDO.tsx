import { useState } from 'react'
import Modal from '../components/modal';
import { CheckCircle } from 'react-bootstrap-icons';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

function ToDo(){
    interface Task{
        text:string,
        completed:boolean
    }
    const [task,setTask] = useState<string>("");
    const [tasks,setTasks] = useState<Task[]>([]);
    const [editIndex,seteditIndex] = useState<number|null>(null);
    const [error,setError] = useState<string>("");
    const [openModal,setopenModal] = useState(false);
    const [deleteIndex,setdeleteIndex] = useState<number|null>(null);
    // const [isDisabled,setIsDisabled] = useState(false);
    const addorUpdateTask = ()=>{
        if(task.trim()===""){
            setError("Enter Tasks");
            return;
        }
        
        if(editIndex!=null){
            const updatedTask = [...tasks];
            updatedTask[editIndex].text = task;
            setTasks(updatedTask);

            seteditIndex(null);
            setTask("");
        }else{
            setTasks([{text:task,completed:false},...tasks]);
            setTask("");
        }
    }

    const deleteTask = () => {
        if(deleteIndex != null){
            setTasks(tasks.filter((_, i) => i !== deleteIndex));
        }

        if(editIndex == deleteIndex){
            seteditIndex(null);
            setTask("");
        }
        setopenModal(false);

    };

    const editTask = (index:number) => {
        setTask(tasks[index].text);
        seteditIndex(index);
    }

    const handleDelete = (index:number) =>{
        setdeleteIndex(index);
        setopenModal(true);
    }

    const handleDragEnd = (result:any) =>{
        const updatedTask = [...tasks]
        const [movedItem] = updatedTask.splice(result.source.index,1)
        updatedTask.splice(result.destination.index,0,movedItem)
        setTasks(updatedTask);
    }

    const handleCompleteTask = (index:number) =>{
        setTasks(prev =>
            prev.map((task,i) =>
                i==index ? {...task,completed:true}:task
            )
            
        )          
    }

    const handleUndoTask = (index:number) =>{
        const updatedTask = [...tasks]
        updatedTask[index].completed = false;
        setTasks(updatedTask);
    }
    
    return (
        <>
            <div className='todo-container'>
                <h1>To Do List</h1>
                <div className='input-div'>
                    <input type='text' className="todo-input" value={task} placeholder='enter task' onChange={(e)=>setTask(e.target.value)}/>
                    <button onClick={addorUpdateTask} className='add-btn'>{editIndex!==null?"UPDATE":"ADD"}</button>
                </div>
                {error && <p className="error">{error}</p>}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId='tasks'>
                        {(provided) => (
                            
                        <ul className='todo-list' {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((item,index) =>(
                            <Draggable key={index} draggableId={`${item}-${index}`}index={index}>
                                {(provided) => (
                                <li className='todo-item' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                    {item.text}
                                    <FaEdit onClick={()=>editTask(index)} className='edit-btn'/>
                                    <FaTrash onClick={()=>handleDelete(index)} className='delete-btn'/>
                                    <button onClick={()=>handleCompleteTask(index)} className='status-btn' disabled ={item.completed}>{item.completed?"completed":"Mark as completed"}</button>               
                                    { item.completed &&<CheckCircle size={20} color="green" />}
                                    {item.completed && <button onClick={()=>handleUndoTask(index)} className='undo-btn'>Undo</button>}
                                </li>
                                )}
                            </Draggable>
                        ))}
                            {provided.placeholder}
                        </ul>
                    )}
                    </Droppable>
                </DragDropContext>
            </div>
            <Modal
                isOpen = {openModal}
                message = "Are you sure want to delete this Task?"
                onConfirm = {deleteTask}
               onCancel={() => setopenModal(false)}
            />
        </>
    )
}
export default ToDo;