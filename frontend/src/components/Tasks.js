import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";

import TaskComponent from "./TasksComponent";

export default function Tasks(){

    const {id} = useParams();

    const[projectName, setProjectName]= useState('');

    useEffect(()=>{
        axios.get(`http://localhost:3001/projectName/'${id}'`).then(res=>{
            setProjectName(res.data.name);
        })

    },[id])
    

    return(
        <div className="border-2 h-screen grid grid-rows-[1fr,12fr]">

            <div className="flex items-center text-lg font-medium pl-4">
                <p className="font-medium">{projectName}</p>
            </div>

            <div className="grid grid-cols-[1fr,1fr,1fr,1fr] gap-1 p-1">

            <TaskComponent id={id} status={'todo'}/>

            {/* <TaskComponent id={id} status={'inProgress'}/>

            <TaskComponent id={id} status={'inReview'}/>

            <TaskComponent id={id} status={'completed'}/> */}

            </div>



        </div>
    )
}