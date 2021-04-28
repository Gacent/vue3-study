(()=>{
  // 函数
  // =============================================完整的函数写法
  // myAdd2===> 函数名
  // (x:number,y:number) => number ====> 函数类型
  // function (x:number,y:number):number{ return x+y} ======> 符合上面函数类型
  const myAdd2 :(x:number,y:number) => number = function (x:number,y:number):number{
    return x+y
  }
  // =============================================可选参数和默认参数
  // 可选参数:参数带问号的?
  // 默认参数:用户没传入参数时候的初始默认值
  // 需求:
  // 1. 什么都不传,只返回默认姓氏
  // 2. 只传入姓氏,那么就返回姓氏
  // 3. 传入姓氏和名字,就返回姓名
  const getFullName=function(firstName:string='东方',lastName?:string):string{
    if(lastName){
      return firstName+'_'+lastName
    } else {
      return firstName
    }
  }
  let result = getFullName('诸葛')
  console.log(result)

  // =============================================剩余参数
  // 放在函数声明的时候所有的参数的最后
  function showMessage(str:string,...args:string[]) {
    console.log(str)
    console.log(args)
  }
  showMessage('a','b','c','d')

  // =============================================函数重载
  // 函数名相同,而形参不同的多个函数
  function add(x:string,y:string):string
  function add(x:number,y:number):number
  function add(x:string|number,y:string|number):number|string{
    if(typeof x==='string'&&typeof y==='string'){
      return x+y
    } else if (typeof x === 'number' && typeof y === 'number') {
      return x + y
    }
  }
  console.log(add(1,2))
  console.log(add('1','2'))
  // add(1,'2')  // ERROR
})()