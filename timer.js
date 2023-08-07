const one=document.querySelector('.one');
const timer=function(){
    return new Promise(function(resolve,reject){
        const x=setInterval()
    })
}
function Timer(){
    let time=10;
    let x=setInterval(function(){
        let min=Math.floor(time/60);
        let sec=time%60;
        one.innerHTML=(`${String(min).padStart(2,'0')}:${String(sec).padStart(2,`0`)}`);
        if(time===0){
            one.textContent='Times Up ! ! !'
            one.style.background=`linear-gradient(to top left, #39b385, #9be15d)`;
            one.style.color=`white`
            clearInterval(x);
        }
        time--;
    },1000)
}
Timer();
