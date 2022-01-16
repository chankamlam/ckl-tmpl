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