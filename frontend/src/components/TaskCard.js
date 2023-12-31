import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import EditForm from './EditForm'

import moment from "moment";

export default function TaskCard({name,status,start_date,end_date,task_id,parent_id}){
    const [visible,setVisible] = useState(false);
    
    function changeState(val){
        setVisible(val);
    }

  
    return(
        <div >
               
            <div className="flex flex-col cursor-pointer shadow-lg rounded-lg mx-3 py-4 pl-3.5" onClick={()=>setVisible(true)}>
                <div className="font-regular text-lg pl-1">
                    <p>{name}</p>
                </div>

                <div className="flex gap-2.5 pb-3 pt-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-400 pl-1">Start Date</p>
                        <p className={`bg-${status}-primary text-${status}-textPrimary text-xs  py-1.5 px-2.5 rounded-md`}>{moment(start_date).format('DD/MM/YYYY')}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-400 pl-1">Deadline</p>
                        <p className={`bg-${status}-primary text-${status}-textPrimary text-xs font-normal py-1.5 px-2.5 rounded-md`}>{moment(end_date).format('DD/MM/YYYY')}</p>
                    </div>
                </div>
            </div>
            
            <ReactModal isOpen={visible} className="h-screen">
                <EditForm changeState={changeState} status={status} name={name} task_id={task_id} start_date={moment(start_date).format('YYYY-MM-DD')} end_date={moment(end_date).format('YYYY-MM-DD')} parent_id={parent_id}/>
            </ReactModal>
        </div>
    )
}