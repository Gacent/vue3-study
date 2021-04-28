(function () {
  
  // ===================需求: 创建人的对象, 需要对人的属性进行一定的约束

  // id是number类型, 必须有, 只读的
  // name是string类型, 必须有
  // age是number类型, 必须有
  // sex是string类型, 可以没有
  
  // 定义接口
  interface IPerson{
    readonly id:number,
    name:string,
    age:number,
    sex?:string
  }
  let person:IPerson={
    id:1,
    name:'张山',
    age:12,
  }
  console.log(person)

  // =========================函数类型
  interface ISearchFunc{
    (source:string,subString:string) : Boolean
  }
  const mySearch:ISearchFunc=function(source:string,subString:string):Boolean{
    return source.search(subString)>-1
  }
  console.log(mySearch('帅道闸','帅'))

  // ========================类类型
  // 接口和接口之间的叫继承(extends)，类和接口之间的叫实现(implements)
  interface IFly{
    fly()
  }
  interface ISwim{
    swim()
  }
  interface IFlyAndSwim extends IFly,ISwim{}
  class Person implements IFlyAndSwim{
    fly(){
      console.log('我会飞')
    }
    swim(){
      console.log('我会游泳')
    }
  }
  let xiaoming=new Person()
  xiaoming.fly()
  xiaoming.swim()
})()