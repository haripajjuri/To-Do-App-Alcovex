import ReactModal from "react-modal";
import CreateForm from "./CreateForm";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import { useReducer } from "react";


export default function TaskComponent({id,tasks,status,refun}){

    const[visible,setVisible] = useState(false);
    

    function changeState(val){
        setVisible(val);
    }

    return(

        <div>
             <div className="mx-4 flex">
                <p className={`bg-${status}-primary py-1 mt-2 mb-1 px-3 text-${status}-textPrimary rounded-md text-xs`}>{status}</p>
            </div>
            {
                tasks.map(task=>(
                    <div>
                        <div className="flex flex-col gap-4 mt-3">
                            <TaskCard name={task.name} start_date={task.start_date} end_date={task.end_date} status={task.status} task_id={task.id} parent_id={id} refun={refun}/>
                        </div>

                    </div>
                ))
                
            }
            <div className={`bg-${status}-primary rounded-xl flex justify-center items-center h-10 gap-2 text-lg cursor-pointer m-4`} onClick={()=>setVisible(true)} >
                <p className={`text-${status}-textPrimary font-medium pb-0.5`}>+</p>
                <p className={`text-${status}-textPrimary text-sm`} >Add New</p>
            </div>

            <ReactModal isOpen={visible} className="h-screen">
                <CreateForm id={id} changeState={changeState} status={status} refun={refun} />
            </ReactModal>
        </div>
    )
}