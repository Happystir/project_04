// ajaxData{
//     method:'请求类型',
//     url:'请求地址',
//     data:{},
//     success:function(res){console.log(res)}
// }

function resolveData(data){
    let arr=[]
    for(let k in data)
    {
        arr.push(k+'='+data[k])
    }
    return arr.join('&')
}

function ajax(ajaxData){
    let xhr
    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest()
    }
    else{
        xhr= new ActiveXObject("Microsoft.XMLHTTP")
    }

    let qs= resolveData(ajaxData.data)

    if(ajaxData.method.toUpperCase()==='GET'){
        xhr.open(ajaxData.method,ajaxData.url+'?'+qs)
        xhr.send()
    }
    else if(ajaxData.method.toUpperCase()==='POST'){
        xhr.open(ajaxData.method,ajaxData.url)
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(qs)
    }

    xhr.onreadystatechange= function(){
        if(xhr.readyState===4 && xhr.status===200){
        var result= JSON.parse(xhr.responseText)
        ajaxData.success(result)
        }
    }
        
}