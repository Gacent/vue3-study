(()=>{
  // 抽象类：包含抽象方法（抽象方法不能有具体的实现），也可以包含实例方法，
  // 抽象类不能被实例化，为了让子类进行实例化及实现内部的抽象方法
  // 抽象类的目的最终为子类服务
  abstract class Animate{
    abstract eat()
    name:string
    constructor(name:string){
      this.name=name
    }
    say(){
      console.log('hi')
    }
  }
  class Dog extends Animate{
    constructor(name:string){
      super(name)
    }
    eat(){
      console.log(`${this.name}吃吃吃吃`)
    }
  }
  // let dog=new Animate() // error 抽象类不能被实例化
  let dog=new Dog('狗子')
  dog.eat()
})()