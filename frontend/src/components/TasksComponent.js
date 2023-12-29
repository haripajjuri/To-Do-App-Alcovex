import ReactModal from "react-modal";
import CreateForm from "./CreateForm";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";


export default function TaskComponent({id,status}){

    const[visible,setVisible] = useState(false);

    const[tasks,setTasks] = useState([]);

    function changeState(val){
        setVisible(val);
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/${id}`).then(
            res=>{
                setTasks(res.data);
            }
        )
    },[id]);

    const data = tasks.filter(task=>{
        return task.status === status;
    })

    return(
        <div className="">

            
            <div>
            
            {
               data.map(task=>(
                <TaskCard name={task.name} start_date={task.start_date} end_date={task.end_date} status={task.status} task_id={task.id} />
               ))
            }

            </div>


            <ReactModal isOpen={visible} className="h-screen">
                <CreateForm id={id} changeState={changeState} status={status} />
            </ReactModal>

            <div className="rounded-xl flex justify-center items-center h-10 gap-2 text-lg cursor-pointer m-4 bg-blue-100" onClick={()=>setVisible(true)} >
                <p className="text-blue-600 font-medium pb-0.5">+</p>
                <p className="text-blue-600 text-sm" >Add New</p>
            </div>
            
        </div>
    )
}