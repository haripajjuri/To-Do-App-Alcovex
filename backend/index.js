const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
const mysql = require('mysql2');

app.get('/',(req,res)=>{
    res.json("hello")
})

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'todo'
}).promise()

app.get('/tasks',async(req,res)=>{
    const [results] = await conn.query("SELECT * FROM tasks");
    res.json(results);
})

app.get('/task/:taskName',async(req,res)=>{
    const {name} = req.params;
    const [result] = await conn.query(`SELECT * from tasks WHERE name='${name}'`)
    return res.json(result);
})

app.get('/projects',async(req,res)=>{
    const [results] = await conn.query("SELECT * FROM projects");
    res.json(results);
})

app.post('/createProject',async(req,res)=>{
    const {name} = req.body;
    const results = await conn.query(`insert into projects (name) values ('${name}')`);
    res.json("project created")
})

app.get('/projectName/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const [parent] = await conn.query(`select name from projects where id=${id}`);
        return res.json(parent[0]);
    }catch(err){
        res.json(err);
    }
})

app.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const [results] = await conn.query(`select * from tasks WHERE parent='${id}'`)
        
    res.json(results);
    }
    catch(err){
        return res.json(err);
    }
})

app.post('/:id/create',async(req,res)=>{
    const {id} = req.params;
    const {name,start_date,end_date,status} = req.body;
    try{
        await conn.query('insert into tasks (`name`,`start_date`,`end_date`,`status`,`parent`) values(?,?,?,?,?)',[name,start_date,end_date,status,id]);
        res.json("task created");
    }catch(err){
        return res.json(err);
    }
})

app.put('/:id/update',async(req,res)=>{
    const {id} = req.params;
    const {name,start_date,end_date,status} = req.body;
    try{
        await conn.query(`update tasks set name='${name}',start_date='${start_date}', end_date='${end_date}', status='${status}' WHERE id=${id}`);
        res.json("task updated");
    }catch(err){
        return res.json(err);
    }
})

app.listen(3001,()=>{
    console.log('server running on port 3001');
})