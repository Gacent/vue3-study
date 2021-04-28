(()=>{
  // ==========================================================================泛型
  // function createArray(value:any,count:number):any[] {
  //   let arry:any[]=[]
  //   for(let i=0;i<count;i++){
  //     arry[i]=value
  //   }
  //   return arry
  // }
  // let arr1=createArray('22',5) 
  // let arr2=createArray(999.22,5)
  // console.log(arr1[0].split('')) // 虽然能实现,但是没有对应类型(字符串)的方法智能提示,以及错误信息 
  // console.log(arr2[0].toFixed(2)) // 虽然能实现,但是没有对应类型(数字)的方法智能提示,以及错误信息 

  function createArray2<T>(value:T,count:number):T[] {
    let arry:Array<T>=[]
    for(let i=0;i<count;i++){
      arry[i]=value
    }
    return arry
  }
  let arr1:string[]=createArray2<string>('22',5)
  let arr2:number[]=createArray2<number>(999.22,5)
  console.log(arr1[0].split('')) // 智能提示
  console.log(arr2[0].toFixed(2))


  // ===================================================================多个泛型参数的函数:函数中有多个泛型参数
  function showMsg<K,V>(value1:K,value2:V):[K,V]{
    return [value1,value2]
  }
  let msg=showMsg<string,number>('222',2222)
  console.log(msg[0].split(''))
  console.log(msg[1].toFixed(2))

  // ===================================================================泛型接口
  // 定义的时候,为接口的属性或方法定义泛型类型
  // 在使用接口的时候,再指定具体的泛型类型
  class User{
    id?:number
    constructor(public name:string,public age:number){}
  }
  interface IBaseCRUD<T>{
    data:Array<T>
    add:(t:T)=>T
    getUserId:(id:number)=>T
  }
  class UserCRUD implements IBaseCRUD<User>{
    data:Array<User>=[] // 必须要有个[]初始化,不然会报错
    add(user:User):User{
      user.id=Date.now()
      this.data.push(user)
      return user
    }
    getUserId(id:number):User{
      return this.data.find(item=>item.id===id)
    }
  }
  let userCRUD:UserCRUD=new UserCRUD()  // 创建CRUD类
  userCRUD.add(new User('里斯',12))
  userCRUD.add(new User('赵四',22))
  userCRUD.add(new User('刘能',32))
  userCRUD.add(new User('李飞',52))
  let {id}=userCRUD.add(new User('奥萨蒂',14))
  console.log(userCRUD.data)
  console.log(userCRUD.getUserId(id))

  // ===================================================================泛型类.
  // 在定义类时, 为类中的属性或方法定义泛型类型 在创建类的实例时, 再指定特定的泛型类型
  class GenerateT<T>{
    defaultKey:T
    add:(x:T,y:T)=>T
  }
  let g1=new GenerateT<number>()
  g1.defaultKey=12
  g1.add=function (x,y) {
    return x+y
  }
  let g2=new GenerateT<string>()
  g2.defaultKey='12'
  g2.add=function (x,y) {
    return x+y
  }
  console.log(g2.add(g2.defaultKey,'12'))

  // ===================================================================泛型约束
  // function fn(x):number{  // 没有约束
  //   return x.length
  // }

  // console.log(fn(1)) // undefined
  interface ILength{
    length:number
  }
  // 继承了接口ILength的约束,即fn传值只能是有length属性的值的约束
  function fn<T extends ILength>(x:T):number{
    return x.length
  }
  // fn(2)  //error
  fn('123')
})()