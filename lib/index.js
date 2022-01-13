////////////////////////
// Phase 1
////////////////////////
// var tmpl = `<div>
// My name is <%=name%> and i am <%=age%> years old.
// </div>`
// var data = {
//     name:"ckl",
//     age:18
//  }

// var res = tmpl.replace(/[\r\t\n]/g, " ").replace(/<%=([\s\S]+?)%>/g,(p1,p2,p3)=>{
//     console.log(p1);
//     console.log(p2);
//     console.log(p3);
//     return data[p2]
// })

// console.log("============")
// console.log(res);
// console.log("============")


//////////////////////////////
// Phase 2
/////////////////////////////
// var tmpl = `<div>
// My name is <%=name%> and i am <%=age%> years old.
// I live in <%=contact.address%> and my phone number is <%=contact.phone%>.
// </div>`
// var data =   {
//     name:"ckl",
//     age:18,
//     contact:{
//         address:"xxxxxxxx",
//         phone:888
//     },
//  }

// var res = tmpl.replace(/[\r\t\n]/g, " ").replace(/<%=([\s\S]+?)%>/g,(p1,p2,p3)=>{
//     console.log(p1);
//     console.log(p2);
//     console.log(p3);
//     // return data[p2]
//     return "' + obj."+ p2 +" + '"
// })

// var fn = new Function('obj', 'return ' + "'"+res+"'"); 
// console.log("============")
// console.log(fn(data));
// console.log("============")


//////////////////////////////
// Phase 3
//////////////////////////////
// var tmpl = `<div>
// My name is <%=name%> and i am <%=age%> years old.
// I live in <%=contact.address%> and my phone number is <%=contact.phone%>.
// My favorite coins are:
// <ul>
// <% coins.forEach(function(item){ %>
//     <li><%= item %></li>
// <% }); %>
// </ul>
// </div>`
// var data =   {
//     name:"ckl",
//     age:18,
//     contact:{
//         address:"xxxxxxxx",
//         phone:888
//     },
//     coins:["ETH","BTC"]
//  }
// tmpl = tmpl.replace(/[\r\t\n]/g, " ")
// var scpt = []
// var index = 0

// var patt = new RegExp(/<%=([\s\S]+?)%>|<%([\s\S]+?)%>/,"g");
// while(match=patt.exec(tmpl)){
//     scpt.push("arr.push('"+tmpl.slice(index,match.index)+"');")
//     if(match[1]){
//         scpt.push("arr.push(" + match[1] +");")
//     }
//     if(match[2]){
//         scpt.push(match[2])
//     }
//     index = match.index + match[0].length
// }
// // var res = tmpl.replace(/<%=([\s\S]+?)%>|<%([\s\S]+?)%>/g,(p1,p2,p3,p4)=>{
// //     scpt.push("arr.push('"+tmpl.slice(index,p4)+"');")
// //     if(p2){
// //         scpt.push("arr.push(" + p2 +");")
// //     }
// //     if(p3){
// //         scpt.push(p3)
// //     }
// //     index = p4 + p1.length
// //     return `___`
// // })
// scpt.push("arr.push('"+ tmpl.substring(index,tmpl.length) +"');")
// var fn = new Function("var arr=[]; with(this){"+ scpt.join("") +"}; return arr.join('');"); 

// console.log("============")
// console.log(scpt);
// console.log(fn.apply(data))
// console.log("============")


//////////////////////////////
// Phase 4
//////////////////////////////
// var tmpl = `<div>
// My name is <%=name%> and i am <%=age%> years old.
// I live in <%=contact.address%> and <%my phone number is <%=contact.phone%>.
// My favorite coins are:
// <ul>
// <% coins.forEach(function(item){ %>
//     <li><%= item %></li>
// <% }); %>
// </ul>
// </div>`
// var data =   {
//     name:"ckl",
//     age:18,
//     contact:{
//         address:"xxxxxxxx",
//         phone:888
//     },
//     coins:["ETH","BTC"]
//  }
// tmpl = tmpl.replace(/[\r\t\n]/g, " ")
// var scpt = []
// var index = 0

// var patt = new RegExp(/<%=([^<%=]+?)%>|<%([^<%=]+?)%>/,"g");
// while(match=patt.exec(tmpl)){
//     scpt.push("arr.push('"+tmpl.slice(index,match.index)+"');")
//     if(match[1]){
//         scpt.push("arr.push(" + match[1] +");")
//     }
//     if(match[2]){
//         scpt.push(match[2])
//     }
//     index = match.index + match[0].length
// }
// scpt.push("arr.push('"+ tmpl.substring(index,tmpl.length) +"');")
// var fn = new Function("var arr=[]; with(this){"+ scpt.join("") +"} return arr.join('');"); 

// console.log("============")
// console.log(scpt);
// console.log(fn.apply(data))
// console.log("============")



(function(){
    var option = {
        openDelimiter:"<%",
        closeDelimiter:"%>"
    }
    var engine = {
        config : (opt)=>{
            option.openDelimiter = opt.openDelimiter || option.openDelimiter
            option.closeDelimiter = opt.closeDelimiter || option.closeDelimiter
            return true
        },
        render : (tmpl,data)=>{
            tmpl = tmpl.replace(/[\r\t\n]/g, "")
            let scpt = []
            let index = 0
            
            // let patt = new RegExp(/<%=([^<%=]+?)%>|<%([^<%=]+?)%>/,"g");
            let patt = new RegExp(`${option.openDelimiter}=([^${option.openDelimiter}=${option.closeDelimiter}]+?)${option.closeDelimiter}|${option.openDelimiter}([^${option.openDelimiter}=${option.closeDelimiter}]+?)${option.closeDelimiter}`,"g");
            while(match=patt.exec(tmpl)){
                scpt.push("arr.push('"+tmpl.slice(index,match.index)+"');")
                if(match[1]){
                    scpt.push("arr.push(" + match[1] +");")
                }
                if(match[2]){
                    scpt.push(match[2])
                }
                index = match.index + match[0].length
            }
            scpt.push("arr.push('"+ tmpl.substring(index,tmpl.length) +"');")
            let fn = new Function("var arr=[]; with(this){"+ scpt.join("") +"} return arr.join('');"); 
    
            return fn.apply(data)
        }
    }
    if(typeof window != 'undefined'){
        window.te = engine
    }else{
        const extendFn = {
            __express:(filePath, data, callback)=>{
                const fs = require('fs')
                fs.readFile(filePath, function (err, content) {
                    if (err) return callback(err)
                    return callback(null, engine.render(content.toString(),data))
                  })
            }
        }
        for (const key in extendFn) {
            if (Object.hasOwnProperty.call(extendFn, key)) {
                engine[key] = extendFn[key]
            }
        }
        module.exports = engine
    }
})()