import { useState } from "react";
import ReactModal from "react-modal";
import EditForm from './EditForm';
import moment from "moment";

export default function TaskCard({name,status,start_date,end_date,task_id}){

    const[visible,setVisible] = useState(false);

    function changeState(val){
        setVisible(val);
    }

    return(
            
            <div className="flex flex-col cursor-pointer shadow-lg rounded-lg mx-3 py-4 pl-3.5" onClick={()=>setVisible(true)}>

                <div className="font-regular text-lg pl-1">
                    <p>{name}</p>
                </div>

                <div className="flex gap-2.5 pb-3 pt-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-400 pl-1">Start Date</p>
                        <p className="bg-blue-100 text-blue-700 text-xs  py-1.5 px-2.5 rounded-md">{moment(start_date).format('DD/MM/YYYY')}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-400 pl-1">Deadline</p>
                        <p className="bg-blue-100 text-blue-700 text-xs font-normal py-1.5 px-2.5 rounded-md">{moment(end_date).format('DD/MM/YYYY')}</p>
                    </div>
                </div>

            <ReactModal isOpen={visible} className="h-screen">
                <EditForm changeState={changeState} name={name} start_date={start_date} end_date={end_date} status={status} task_id={task_id} />
            </ReactModal>
        </div>
    )
}