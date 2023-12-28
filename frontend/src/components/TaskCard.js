import { useState } from "react";
import ReactModal from "react-modal";
import EditForm from './EditForm';

export default function TaskCard({name,status,start_date,end_date,task_id}){

    const[visible,setVisible] = useState(false);

    function changeState(val){
        setVisible(val);
    }

    return(
        <div>
            <div className="border-2 h-10 m-2 cursor-pointer" onClick={()=>setVisible(true)}>
                <h2>{name}</h2>
            </div>

            <ReactModal isOpen={visible} className="h-screen">
                <EditForm changeState={changeState} name={name} start_date={start_date} end_date={end_date} status={status} task_id={task_id} />
            </ReactModal>
        </div>
    )
}