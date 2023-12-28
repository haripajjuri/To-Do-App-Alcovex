import ReactModal from "react-modal";
import CreateForm from "./CreateForm";
import { useEffect, useState } from "react";
import axios from "axios";

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
        <div className="border-2">
            
            <div>
            {
               data.map(task=>(
                <h3>{task.name}</h3>
               ))
            }
            </div>

            <ReactModal isOpen={visible} className="h-screen">
                <CreateForm id={id} changeState={changeState} status={status} />
            </ReactModal>

            <div className=" p-2.5 rounded-lg text-m flex items-center gap-3 cursor-pointer border-2" >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                </svg>
                <button className="text-blue-500" onClick={()=>setVisible(true)}>Add New task</button>
            </div>

        </div>
    )
}