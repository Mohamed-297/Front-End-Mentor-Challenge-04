let btn=document.querySelector(".logo")
let yearInp=document.querySelector(".labels .years ")
let monthInp=document.querySelector(".labels .months ")
let dayInp=document.querySelector(".labels .days ")
let yearRes=document.querySelector(".age .years span")
let monthRes=document.querySelector(".age .months span")
let dayRes=document.querySelector(".age .days span")
let errY=document.querySelector(".labels .errorY ")
let errM=document.querySelector(".labels .errorM")
let errD=document.querySelector(".labels .errorD")
let labelY=document.querySelector(".years")
let labelM=document.querySelector(".months")
let labelD=document.querySelector(".days")
let dText=document.querySelector(".day p")
let mText=document.querySelector(".month p")
let yText=document.querySelector(".year p")
let date = new Date()

btn.addEventListener("click",()=>{
    btn.style.cssText="background-color:hsl(0, 0%, 8%);"
    // if is empty
    isEmpty(yearInp,errY)
    isEmpty(dayInp,errD)
    isEmpty(monthInp,errM)
    // if input year > this year 
    if((yearInp.value)> (date.getFullYear()) )
    {
        outOfRange(errY)
        
    }
    // if input month > 12 
    else if((monthInp.value)> 12||(monthInp.value)<=0)
    {
        outOfRange(errM)        
    }
    // if input day > 30 
    else if((dayInp.value)> 30||(dayInp.value)<=0)
    {
        outOfRange(errD)        
    }
    
    else if(yearInp.value==date.getFullYear()&&(monthInp.value>date.getMonth())){
        outOfRange(errY)
        yearRes.innerHTML="--"
        monthRes.innerHTML="--"
        dayRes.innerHTML="--"
    }
    else if(yearInp.value<=date.getFullYear()){
        calculateAge(yearInp.value,monthInp.value,dayInp.value)
    }
    
})
function calculateAge(year,month,day){
    
    
    //error//10-8-2000 =>should be 22y 11m 29d but its => age 23y -1m 29d 
    //error//7-8-2000 =>should be 23y 0m 2d but its => age 22y 12m 2d 
    //error//9-8-2000 =>should be 23y 0m 0d but its => age 22y 12m 0d 
    
    let Y= date.getFullYear()-year;  //2023-2000=23  
    
    let M=(date.getMonth()+1)-month;// 8-9=-1
    
    let D=date.getDate()-day; // 9-10=-1
    if(/*8*/month==/*8*/(date.getMonth()+1))
    {
        Y--; //22
        M=12+M; //12 
        if(day>date.getDate()){//10>9
            D=day-date.getDate();//1
            D=30-D+1;//29
            M--;//11
        }
        if(day<date.getDate()){//7<10
            D=date.getDate()-day;//9-7=2
            Y++;//2023
            M=M-M;//0
        }
        if(day==date.getDate()){//9=9
                D=date.getDate()-day; //0
                Y++;//23
                M=M-M;//0
            }
        }
        
        //error//9-9-2000 =>should be 22y 11m 0d  
        //error//7-9-2000 =>should be 22y 11m 2d  
        //error//10-9-2000 =>should be 22y 10m 30d  
        if(/*9*/month>/*8*/(date.getMonth()+1)){//9>8
            if(day>date.getDate()){//10>9
                D=30+D+1//=>9-10
                Y--;//22
                M=12+M-1;//11
            }
            if(day<date.getDate()){
                D=date.getDate()-day;
                Y--;
                M=12+M
            }
            
            if(day==date.getDate()){
                D=date.getDate()-day;
                Y--;
                M=12+M;
            }
            
        }
    //error//9-7-2000 =>should be 23y 1m 0d  
    //error//7-7-2000 =>should be 23y 1m 2d  
    //error//10-7-2000 =>should be 23y 0m 30d  <=====
    if(/*7*/month</*8*/(date.getMonth()+1)){//7<8
        if(day>date.getDate()){
            M--;
            D=30+D+1;
        }
        if(day<date.getDate()){
            D=date.getDate()-day;
        }
        if(day==date.getDate()){
            D=date.getDate()-day;
        }
    }
    
    if(  isEmpty(yearInp)||isEmpty(dayInp)||isEmpty(monthInp))
    {
        yearRes.innerHTML=""
        monthRes.innerHTML=""
        dayRes.innerHTML=""
    }
    else{
            yearRes.innerHTML=Y
            monthRes.innerHTML=M
            dayRes.innerHTML=D
        }
    
    }
        
    function outOfRange(err){
        yText.style.cssText="color: hsl(0, 100%, 67%);" // اللى مكتوب فوق
        mText.style.cssText="color: hsl(0, 100%, 67%);" // اللى مكتوب فوق
        dText.style.cssText="color: hsl(0, 100%, 67%);" // اللى مكتوب فوق
        err.style.cssText="display:block;" // الرساله بتاعت الايرور
        labelD.style.cssText="border:solid 1px hsl(0, 100%, 67%);"// المستطيل
        labelM.style.cssText="border:solid 1px hsl(0, 100%, 67%);"// المستطيل
        labelY.style.cssText="border:solid 1px hsl(0, 100%, 67%);"// المستطيل
        
    }
    function isEmpty(input,err){
        if( input.value===""){// input for check the empty inputs
            err.innerHTML="This field is required " // الرساله
            outOfRange(err)      
        }
    }
    
    
    
    
