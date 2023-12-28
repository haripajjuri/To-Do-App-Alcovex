import {  useState } from "react";
import axios from "axios";
import moment from 'moment';

export default function CreateForm({changeState,name,start_date,end_date,status,task_id}){

    const [send,setData] = useState({
        name:`${name}`,
        start_date:`${moment(start_date).format('YYYY-MM-DD')}`,
        end_date:`${moment(end_date).format('YYYY-MM-DD')}`,
        status:`${status}`
    })

    const[errors,setErrors] = useState({})

    const postSubmit=async(e)=>{
        e.preventDefault();

        if(send.name===""){
            setErrors({name:'please enter name'});
        }

        if(send.name!=""){
            axios.put(`http://localhost:3001/${task_id}/update`,send).then(res=>{
                window.alert(res.data);
                window.location.reload()
                changeState(false);
            })
        }
   
    }

    const handleChange = (e) =>{
        setData((PrevState)=>({
            ...PrevState,
            [e.target.name]:e.target.value
        })
        )
    }

    
    return(
        <div className="h-screen flex justify-center items-center bg-opacity-70 bg-black">

            <form className="flex flex-col bg-white rounded w-1/2 h-2/4 gap-6 p-9" onSubmit={postSubmit} id="createForm">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">enter the task name</label>
                        <input type="text" name="name" placeholder="taskname" value={send.name} className=" h-10 border-2 p-2 rounded" onChange={handleChange}/>
                        {errors.name && <p className="text-red-600 text-sm ml-1 mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex gap-4">

                    <div className="flex flex-col gap-1 w-3/5">
                        <label htmlFor="start_date">start date</label>
                        <input type="date" name="start_date" className="h-10 border-2 p-3 rounded" onChange={handleChange} value={send.start_date}/>
                        {errors.start_date && <p className="text-red-600 text-sm ml-1 mt-1">{errors.start_date}</p>}
                    </div>

                    <div className="flex flex-col gap-1 w-3/5">
                        <label htmlFor="end_date">end date</label>
                        <input type="date" name="end_date" className="h-10 border-2 p-3 rounded" onChange={handleChange} value={send.end_date}/>
                        {errors.end_date && <p className="text-red-600 text-sm ml-1 mt-1">{errors.end_date}</p>}
                    </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="status">status</label>

                        <select name="status" className="h-10 border-2 p-2 rounded " value={send.status} onChange={handleChange}>
                            <option value="todo">to do</option>
                            <option value="inProgress">in progress</option>
                            <option value="inReview">in review</option>
                            <option value="completed">completed</option>
                        </select>
                    </div>

                    <div className="flex gap-4 justify-end mt-5">
                        <button onClick={()=>changeState(false)} className="bg-blue-400 rounded text-white px-4 py-1">cancel</button>
                        <button form="createForm" className="bg-blue-400 rounded text-white px-5 py-1">save</button>
                    </div>
                </form>
        </div>
    )
}