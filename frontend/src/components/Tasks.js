import axios from "axios";
import {  useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import TaskComponent from "./TasksComponent";

export default function Tasks(){
    const navigate = useNavigate();
    const {id} = useParams();

    const[projectName, setProjectName]= useState('');
    const[tasks,setTasks] = useState([]);

    const [re,setRe] = useReducer(x=>x+1,0);

    function refun(val){
        setRe(val);
    }

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/projectName/'${id}'`).then(res=>{
            setProjectName(res.data.name);
        })

        axios.get(`${process.env.REACT_APP_URL}/${id}`).then(
            res=>{
                setTasks(res.data);
            }
        )
        
    },[id,re])

    




    function deleteProject(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if(result.isConfirmed){
                axios.delete(`${process.env.REACT_APP_URL}/${id}/delete`).then(res=>{
            if(res.data==="project deleted"){
                navigate('/')
                Swal.fire(
                    'project deleted',
                    'project deleted successfully',
                    'success'
                ).then(()=>window.location.reload())
            }else{
                Swal.fire(
                    'Something went wrong',
                    `${res.data}`,
                    'error'
                )
            }
        })
    }
    }
    )     
    }
    const todoData = [];
    const inProgressData = [];
    const inReviewData = [];
    const completedData = [];

    tasks.map(task=>{
        if(task.status==='todo')todoData.push(task);
        if(task.status==='inProgress')inProgressData.push(task);
        if(task.status==='inReview')inReviewData.push(task);
        if(task.status==='completed')completedData.push(task);
        return true;
    })
    
    return(
        <div>


        <div className=" h-screen grid grid-rows-[1fr,12fr] ">

            <div className="flex items-center text-lg font-medium pl-4 justify-between">
                <p className="font-semibold">{projectName}</p>
                <p className="mr-10 px-2 py-1 rounded-md bg-red-400 text-white text-sm cursor-pointer hover:bg-red-500" onClick={deleteProject}>delete</p>
            </div>

            <div className="grid grid-cols-4 px-3">

            <TaskComponent id={id} status={'todo'} tasks={[...todoData]} refun={refun}/>
            <TaskComponent id={id} status={'inProgress'} tasks={[...inProgressData]} refun={refun}/>
            <TaskComponent id={id} status={'inReview'} tasks={[...inReviewData]} refun={refun}/>
            <TaskComponent id={id} status={'completed'} tasks={[...completedData]} refun={refun}/>
            </div>
        </div>

        </div>
    )
}