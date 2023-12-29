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
        <div>
            <div className="p-1 px-3 m-2 grid grid-cols-2 grid-rows-2 gap-1 cursor-pointer pb-4 shadow-lg rounded-lg" onClick={()=>setVisible(true)}>

                <div className="col-span-full flex items-center">
                    <p className="text-xl font-semibold pt-1">{name}</p>
                </div>

                <div className="flex flex-col items-start">
                    <p className="text-xs px-1 pb-1 text-gray-400">Start Date</p>
                    <p className="bg-blue-100 text-blue-700 text-sm font-normal py-1 px-2 rounded-lg">{moment(start_date).format('DD/MM/YYYY')}</p>
                </div>

                <div className="flex flex-col items-start ">
                    <p className="text-xs px-1 pb-1 text-gray-400">Deadline</p>
                    <p className="bg-blue-100 text-blue-700 text-sm font-normal py-1 px-2 rounded-lg">{moment(end_date).format('DD-MM-YYYY')}</p>
                </div>
            </div>

            <ReactModal isOpen={visible} className="h-screen">
                <EditForm changeState={changeState} name={name} start_date={start_date} end_date={end_date} status={status} task_id={task_id} />
            </ReactModal>
        </div>
    )
}