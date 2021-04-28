(()=>{
  // ===========================存取器
  class Person {
    firstName:string
    lastName:string
    constructor(firstName:string,lastName:string){
      this.firstName=firstName
      this.lastName=lastName
    }
    get fullName(){
      return this.firstName+'_'+this.lastName
    }
    set fullName(value){
      let val=value.split('_')
      this.firstName=val[0]
      this.lastName=val[1]
    }
  }
  let p1=new Person('刘','德华')
  console.log(p1.fullName)
  console.log(p1.fullName='周_润发')

  // ===============================静态属性
  // 这些属性存在于类本身，而非类的实例上，所以实例上不能访问静态成员
  class Person1{
    static name1:string='刘德华'
    constructor(){

    }
  }
  console.log(Person1.name1)
  Person1.name1='周润发'
  
})()