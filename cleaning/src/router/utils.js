export function debounce(fn,wait){
    let timeOut=null;
    wait=wait||600;
    return function(){
        let that=this;
        if(timeOut!=null) cleanTimeout(timeOut);
        timeOut=setTimeout(()=>{
            fn.apply(that);
        },wait);
    }
}