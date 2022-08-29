const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const cors= require('cors')
const bodyParser = require('body-parser') 



const app = express()



const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'admin',
    database: 'my_db_01'
})

db.connect()

let str='select username from users'
let content=''
db.query(str,function(err,res){
    if(err){
        console.log('err:'+err.message)
    }
    else{

        content= res
        // console.log(content[0].username)
    }
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/user',function(req,res){
    res.end(content[0].username)
})

router.post('/add',function(req,res){
    console.log(req.body)
    // console.log(req.query)
    res.end('11')
})

app.use(cors())
app.use('/api',router)


app.listen(8081,function(){
    console.log('服务启动....')
})