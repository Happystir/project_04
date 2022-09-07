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

// let str='select * from users'
// let content
// db.query(str,function(err,res){
//     if(err){
//         console.log('err:'+err.message)
//     }
//     else{

//         content= res
//     }
// })



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

function resolveUrl(url)
{
    let strat=url.indexOf('?')+1
    let end=url.length
    let str=url.slice(strat,end)
    let arr=str.split('&')
    let object={}
        for(let i=0;i<arr.length;i++)
        {
            arr[i]=arr[i].split('=')
            object[arr[i][0]]=arr[i][1]
        }
        return object
}

function resolveData1(data){
    let arr=[]
  
    for(let k in data)
    {   if(data[k]!=''){
        arr.push(k+'='+'"'+data[k]+'"')
        }
       
    }
    return arr.join(' and ')
    // console.log(arr.join(' and '))
}


function resolveData2(data){

    let arr=[]
    for(let k in data)
    {   if(data[k] !=''){
        arr.push(data[k])
        }
    }
    // console.log(arr)
    return arr
}




router.get('/index',function(req,res){
    // console.log(content)
    let str='select * from users'
    let content
    db.query(str,function(err,result){
        if(err){
            console.log('err:'+err.message)
        }
        else{
            content= result
            res.end(JSON.stringify(result))
        }
    })


})

router.get('/user',function(req,res){

    let data=resolveUrl(req.url)
    console.log(resolveUrl(req.url))

    let str1=resolveData1(data)
    let str2=resolveData2(data)

    // let str='select * from users where username="zs" and password=123456'
    let str
    if(str1==='')
    {
        str='select * from users'
    }
    else{
        str='select * from users where'+' '+str1
    }

    // let str='select * from users where'+' '+str1
    console.log(str)
      db.query(str,function(err,result){
        if(err){
            console.log('err:'+err.message)
        }
        else{
            console.log(result)
            res.end(JSON.stringify(result))
        }
    })


    // db.query(str,[data.username,data.password],function(err,result){
    //     if(err){
    //         console.log('err:'+err.message)
    //     }
    //     else{
    //         console.log(result)
    //         res.end(JSON.stringify(result))
    //     }
    // })
})

router.post('/add',function(req,res){

    // console.log(req.body)
    // res.end('1112')

    let str='insert into users(username,password) values(?,?) '

        db.query(str,[req.body.username,req.body.password],function(err,result){
        if(err){
            console.log('err:'+err.message)
        }
        else if(result.affectedRows===1){
            console.log('插入成功')
        }
    })


})


router.post('/del',function(req,res){

    console.log(req.body)
    // res.end('1112')

    let str='delete from  users where id=? '

        db.query(str,[req.body.id],function(err,result){
        if(err){
            console.log('err:'+err.message)
        }
        else if(result.affectedRows===1){
            console.log('删除成功')
        }
    })
})

router.post('/update',function(req,res){

    console.log(req.body)
    res.end('1112')

    let str='update users set ? where id=?'

        db.query(str,[req.body,req.body.id],function(err,result){
        if(err){
            console.log('err:'+err.message)
        }
        else if(result.affectedRows===1){
            console.log('更新成功')
            console.log(result)
        }
    })
})





app.use(cors())


app.use('/api',router)


app.listen(8081,function(){
    console.log('服务启动....')
})