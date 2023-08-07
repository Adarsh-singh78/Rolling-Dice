// //--data------
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    movementsDates: [
      '2019-11-18T21:31:17.178Z',
      '2019-12-23T07:42:02.383Z',
      '2020-01-28T09:15:04.904Z',
      '2020-04-01T10:17:24.185Z',
      '2020-05-08T14:11:59.604Z',
      '2020-05-27T17:01:17.194Z',
      '2020-07-11T23:36:17.929Z',
      '2023-02-18T10:51:36.790Z',
    ],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    movementsDates: [
      '2019-11-01T13:15:33.035Z',
      '2019-11-30T09:48:16.867Z',
      '2019-12-25T06:04:23.907Z',
      '2020-01-25T14:18:46.235Z',
      '2020-02-05T16:33:06.386Z',
      '2020-04-10T14:43:26.374Z',
      '2020-06-25T18:49:59.371Z',
      '2020-07-26T12:01:20.894Z',
    ],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    movementsDates: [
      '2019-11-01T13:15:33.035Z',
      '2019-11-30T09:48:16.867Z',
      '2019-12-25T06:04:23.907Z',
      '2020-01-25T14:18:46.235Z',
      '2020-02-05T16:33:06.386Z',
      '2020-04-10T14:43:26.374Z',
      '2020-06-25T18:49:59.371Z',
      '2020-07-26T12:01:20.894Z',
    ],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    movementsDates: [
      '2019-11-18T21:31:17.178Z',
      '2019-12-23T07:42:02.383Z',
      '2020-01-28T09:15:04.904Z',
      '2020-04-01T10:17:24.185Z',
      '2020-05-08T14:11:59.604Z',
      '2020-05-27T17:01:17.194Z',
      '2020-07-11T23:36:17.929Z',
      '2020-07-12T10:51:36.790Z',
    ],
    interestRate: 1,
    pin: 4444,
  };
  
  const accounts = [account1, account2, account3, account4];
  /* selector-----------*/


  // ////-------function below will calculate the total days from now to the date of transection of money
  const display=document.querySelector('.movements')
  const total_days= function(d1,d2){
      return(Math.abs(d1-d2)/(1000*60*60*24));
    }  

////////---------------agar transaction 7 din ke andar ka h to uske according display ho other wise date of transaction display ho 
  function evaluate_dates(now){                             
        let total=total_days(new Date(),now);
        total=Math.round(total)
        if(total===0) return 'Today';
        if(total===1) return 'Yesterday';
        if(total<=7) return `${total} days ago`;
        else
        {
          const date=String(now.getDate()).padStart(2,'0');
           const month=String(now.getMonth()+1).padStart(2,'0');
           const year=now.getFullYear();
           return`${date}\/${month}\/${year}`;
        }
        
  }
const mov=function to_display(acc,sort=false){
    display.innerHTML='';
    const mov=sort?acc.movements.slice().sort((a,b)=>a-b):acc.movements;

    mov.forEach(function(element,i){
        const type=element>0?"deposit":"withdrawal";
        const now=new Date(acc.movementsDates[i])        //accounts me movementsDate h uske each element ko one by one access
        const dates=evaluate_dates(now)       // jo date mila previous code me usko call kia function in line 81
        
        const x=`<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__date">${dates}</div>          
        <div class="movements__value">${element} €</div>
      </div>`
      display.insertAdjacentHTML('afterbegin',x);
    })
}
/* mov(account1.movements);*/

const dollarmovment=account1.movements.map(function(element){
    return element*1.07;
});
// console.log(dollarmovment);

/*
const movedesc=account1.movements.map((element,i,array)=>{
  if(element>0)
    return `movements ${i+1} you deposited ${element}`;
  else 
    return `movements ${i+1} you withdraw ${Math.abs(element)}`;
})
console.log(movedesc);
*/



/*--------user credentials -------------------------*/
const user='Steven Thomas Williams';  
/* ------accounts array me object h and hrr object me ek new property add krr rhe h username naam se*/
function createUsername(acc){
  acc.forEach(
    function(element){
      /* aim of below function:: stw i.e take a string and give first letter of each word */
      element.username=element.owner.toLowerCase().split(' ').map( 
        (element) => {
          return element.slice(0,1) 
        }
      ).join('');
    }
  )
}
/*
accounts.forEach(function(element){
console.log(createUsername(element.owner));
})*/
createUsername(accounts);
// console.log(accounts);



/*-------implementation of filter ---------
 dont forget movements is the array of balance*/
// const withdral=account1.movements.filter((element)=>{
//   return element<0;
// })
// console.log(withdral);

/* ------implementation of reduce-----------
----------calculating balance---------*/

const balance_selector=document.querySelector('.balance__value');
function print_balance(accs){
  const balance=accs.movements.reduce((acc,element) => {
    return acc+=element;
  },0)
  accs.balance=balance;        //accounts
  // console.log(balance);
  balance_selector.textContent=`${balance} Euro`;
}
/*print_balance(account1.movements);*/



/* ---------footer part i.e summary of total 
deposited and withdral and total intrest applied----------*/

const total_income=document.querySelector('.summary__value--in');
const total_expense=document.querySelector('.summary__value--out');
const total_intrest=document.querySelector('.summary__value--interest');


function display_Summary(acc){

  /*=======================================income==========================================================*/
  const income=acc.movements.filter(element => element>0)
  .reduce((acc,element)=>acc+=element,0);
  // console.log(income);
  total_income.textContent=`${income}€`

 /*=======================================expense==========================================================*/
  const expense=Math.abs(acc.movements.filter(element=>element<0).reduce((acc,element)=>acc+=element,0))

  /*----maths.abs to avoid overlal -ve value 
  -------filter to select withdraw value
  -------map to convert euro to dollars
  --------reduce to get sum of withdraw---------- */
  // console.log(expense);
  total_expense.textContent=`${expense}€`;
  

   /*=======================================intrest==========================================================*/
   const intrest=acc.movements.filter( element=>element>0).map( element=>element*acc.interestRate/100).filter(element=>element>1).reduce((acc,element)=>acc+=element,0);
  //  console.log(intrest);
   total_intrest.textContent=`${intrest}€`
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*==============================================updateing User interface============================================*/
function update_ui(acc){
  // displaying movements--------------from ->mov(current_account.movements); ->
  mov(acc);

  // display balance -------------from ->print_balance(current_account.movements);->
   print_balance(acc);

   // --displaying summary---------from ->display_Summary(account1.movements) to ->
   display_Summary(acc)

}


/*====================================================implementing login==========================================================*/
/*display_Summary(account1.movements)*/

/* --------------------query selectors----------------------*/
const welcome=document.querySelector('.welcome');
const login=document.querySelector('.login__btn');
const users=document.querySelector('.login__input--user');
const password=document.querySelector('.login__input--pin');
const op=document.querySelector('.app');

/*---------implementing login---------------------*/

const timed=document.querySelector('.timer');
function timer(){
    let time=300;
   const ti=setInterval(function(){
    const min=Math.trunc(time/60);
    const sec=time%60;
      timed.textContent=`${min}:${sec}`;

      if(time===0){
        op.style.opacity='0';
        clearInterval(ti);
      }
      time--;
    },1000);
}

var current_account;

login.addEventListener('click',function(e){
  e.preventDefault();
  //-------below function me jo bhi username dalenge usse related sbkuch current_account me aajayega
  current_account=accounts.find(function(element){
    return element.username===users.value
  })
  console.log('hello');
  
  if(current_account?.pin===Number(password.value)){
    console.log('here');

    // ------displaying welcome
      welcome.innerHTML=(`Welcome back ${current_account.owner.split(' ')[0]}`)
      op.style.opacity='100'
    //-----------jaise hi login ho ui dekhne ke lia-------ui function--------------
    update_ui(current_account);
    timer();
    //  -----------removing id and password balue after safely enter of credentials----------------------
     users.value=password.value=''
  }
  // console.log(current_account);
})
console.log(current_account);



/* =======================================implementing transfer ==============================================================*/
const transfer_account=document.querySelector('.form__input--to');
const transfer_amount=document.querySelector('.form__input--amount');
const click_transfer=document.querySelector('.form__btn--transfer');

click_transfer.addEventListener('click',function(e){
  e.preventDefault();
  const amnt=Number(transfer_amount.value);
  const receiver=accounts.find(function(element){return element.username===transfer_account.value});
  console.log(amnt,receiver);
  // checking the amnt to tranfer is >0 and it must be less or eqaul to the amount available in the account
  // account logged in is stored in the current account and we attached a property with it called account_balance at line 104
  // transfer hone wala account should not be the current account
  
  if(amnt>0 && receiver && amnt<=current_account.balance && receiver?.username!==current_account.username){
    //  recerivre is used in above so that invalid user should not be true
    current_account.movements.push(-amnt);
    receiver.movements.push(amnt);
    current_account.movementsDates.push(new Date())
    update_ui(current_account)
  }
  transfer_account.value=transfer_amount.value='';
})


/* =======================================implementing closing of account ==============================================================*/
const to_close=document.querySelector('.form__btn--close');
const close_pin=document.querySelector('.form__input--pin');
const close_account=document.querySelector('.form__input--user');
to_close.addEventListener('click',function(e){
  e.preventDefault();
  // //-------if the account to be deleted is same as loged in account and correct password------------------------
  if(close_account.value===current_account?.username && Number(close_pin.value)===current_account?.pin){
    console.log('account deleted');
    let index=accounts.findIndex(function(element){
      return element.username===close_account.value;
    })
    // console.log(index);
    accounts.splice(index,1);  ////   ------to delete the last index--------------------
    op.style.opacity='0'        ////  ----------after deleting go back to login page
    to_close.value=close_pin.value='';     ////  -----set input fields to blank
  }
})

// =====================================requesting Loan =====================================================================
const apply_loan=document.querySelector('.form__btn--loan');
const loan_amount=document.querySelector('.form__input--loan-amount');
apply_loan.addEventListener('click',function(e){
  e.preventDefault();
  setTimeout(function()
  {
    const amnt=Number(loan_amount.value)
    if(amnt>0 &&current_account.movements.some((element) => {
      return element>=amnt*0.1;}))
        current_account.movements.push(amnt);
        current_account.movementsDates.push(new Date())
        update_ui(current_account)
       loan_amount.value='';


  },2500)
})

//-------trying to use every function-------------------------------------------nothing to do with the bank project--------
console.log(account1?.movements.every(element=>element%2==0));



// ==========collecting all the arrays of each elements together==============================================
const account_movements=accounts.map(function(element){
  return element.movements
});
console.log(account_movements);

// //////////////////////////////now each nested array will be made a single array by using flat method we didnt give any depth value because  level of depth is two
const combined_array=account_movements.flat();
console.log(combined_array);



////////////////////////adding up all these values together to have the record of entire balance in the bank////////
const bank_balance=combined_array.reduce((acc,element)=>{return acc+=element},0)
console.log(bank_balance);


/*
////////////////////////////// all the above can be easily done through chaining////////////////////////////////////
const total_bank_banalance=accounts.map(element=>element.movements).flat().reduce((acc,element)=>{return acc+=element},0);
console.log(total_bank_banalance);
*/

// ===========working of sort button=======================
const sort_button=document.querySelector('.btn--sort');
let sorted=false;
sort_button.addEventListener('click',function(e){
  e.preventDefault();
  mov(current_account.movements,!sorted);
  sorted=!sorted;
})
console.log(account1.movements.includes(-459021));



// ///////////-------------implementing dates--------------------------------------------------------------
const labelDate=document.querySelector('.date');
const now=new Date();
labelDate.textContent=now;
const date=String(now.getDate()).padStart(2,'0');
const month=String(now.getMonth()+1).padStart(2,'0');
const year=now.getFullYear();
const hour=String(now.getHours()).padStart(2,'00');
const min=String(now.getMinutes()).padStart(2,'00');
const present=`${date}\/${month}\/${year}, ${hour}:${min}`
labelDate.textContent=`${present}`;











// -----clock challange using setInterval function()---------------------------------------------------
// setInterval(function(){

  
// },1000)
