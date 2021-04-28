/**
 * 1. 类型注解
 * 2. 接口
 * 3. 类
 */
(function () {
  let str="asdasd"
  interface IPerson{
    firstName:String,
    lastName:String
  }

  let person={
    firstName:'jason',
    lastName:'john'
  }

  class User{
    firstName:string
    lastName:string
    fullName:string
    constructor(firstName:string,lastName:string){
      this.firstName=firstName
      this.lastName=lastName
    }
  }

  function setStr(str:String){
    console.log('out'+str)
  }
  function setPerson(person:IPerson){
    console.log(person.firstName+'_'+person.lastName)
  }

  setStr(str)
  setPerson(person)
  let user=new User('jason','johns')
  setPerson(user)
})()