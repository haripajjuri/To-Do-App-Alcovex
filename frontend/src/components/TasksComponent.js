import ReactModal from "react-modal";
import CreateForm from "./CreateForm";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import { useReducer } from "react";


export default function TaskComponent(props){
        
    const[visible,setVisible] = useState(false);

    const[tasks,setTasks] = useState([]);
    

    function changeState(val){
        setVisible(val);
    }

    //const [reducerValue,foreceUpdate] = useReducer(x => x+1,0)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/${props.id}`).then(
            res=>{
                setTasks(res.data);
            }
        )
        //foreceUpdate();
    },[tasks]);

    const data = tasks.filter(task=>{
        return task.status === props.status;
    })
    return(
        <div className="">
            
            <div className="mx-4 flex">
                <p className={`bg-${props.status}-primary py-1 mt-2 mb-1 px-3 text-${props.status}-textPrimary rounded-md text-xs`}>{props.status}</p>
            </div>

                
            <div className="flex flex-col gap-4 mt-3">
            {
               data.map(task=>(
                <TaskCard name={task.name} start_date={task.start_date} end_date={task.end_date} status={task.status} task_id={task.id} parent_id={props.id}/>
               ))
            }

            </div>

            <div className={`bg-${props.status}-primary rounded-xl flex justify-center items-center h-10 gap-2 text-lg cursor-pointer m-4`} onClick={()=>setVisible(true)} >
                <p className={`text-${props.status}-textPrimary font-medium pb-0.5`}>+</p>
                <p className={`text-${props.status}-textPrimary text-sm`} >Add New</p>
            </div>

            <ReactModal isOpen={visible} className="h-screen">
                <CreateForm id={props.id} changeState={changeState} status={props.status} />
            </ReactModal>
            
        </div>
    )
}