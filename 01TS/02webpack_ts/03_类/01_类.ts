(function () {
  // ==============================类：可以理解为模板，通过模板可以实例化对象
  // 面向对象编程思想
  class Person {
    // 定义属性
    name:string
    age:number
    gender:string
    // 定义构造函数
    constructor(name:string='xx',age:number=18,gender:string='男'){
      this.name=name
      this.age=age
      this.gender=gender
    }
    // 定义行为
    sayHi(str:string='wo'){
      console.log(`我是${this.name},今年${this.age}岁,${this.gender},${str}`);
    }
  }

  class Student extends Person{
    school:string
    constructor(name:string='xx',age:number=18,gender:string='男',school:string='省实验'){
      super(name,age,gender)
      this.school=school
    }
    sayHi(){
      super.sayHi(`我来自${this.school}`)
    }
  }
  let wo=new Student('jzs',25,'男','89中')
  wo.sayHi()

  // =============================多态：父类型的引用类型指向子类型的对象，不同类型的对象针对相同的方法，产生不同的行为
  class Animate{
    name:string
    constructor(name:string){
      this.name=name
    }
    run(distance:number=0){
      console.log(`走了${distance}米，${this.name}`)
    }
  }

  class Dog extends Animate{
    constructor(name:string){
      super(name)
    }
    run(distance:number=10){
      console.log(`走了${distance}米，${this.name}`)
    }
  }

  class Pig extends Animate{
    constructor(name:string){
      super(name)
    }
    run(distance:number=20){
      console.log(`走了${distance}米，${this.name}`)
    }
  }
  console.log('==================================')
  let dog1:Animate=new Dog('狗子')
  // dog1.run()
  let pig1:Animate=new Pig('猪')
  // pig1.run()
  function showRun(ani:Animate){
    ani.run()
  }
  showRun(dog1)
  showRun(pig1)

  // ============================================公共、私有和受保护的修饰符
  // public 修饰符---公共的，默认修饰符，本对象中可以访问，子类中可以访问，外部可以访问
  // protected 修饰符---保护的，本对象可以访问，子类中可以访问，外部不能访问
  // private 修饰符---私有的,本对象可以访问，子类中不能访问，外部不能访问
  class Flower {
    public name:string
    protected leafLong:number
    private isFlower:Boolean
    public constructor(name:string,leafLong:number,isFlower:Boolean){
      this.name=name
      this.leafLong=leafLong
      this.isFlower=isFlower
    }
    public say(){
      console.log(`我是${this.name}`)
    }
  }
  class Rose extends Flower{
    public constructor(name:string,leafLong:number,isFlower:Boolean){
      super(name,leafLong,isFlower)
    }
    public say(){
      this.leafLong++
      console.log(`我是${this.name},romance,长${this.leafLong}m`)
    }
    
  }
  console.log('==================================')
  let flower1=new Rose('玫瑰🌹',20,true)
  console.log(flower1.name)
  // console.log(flower1.leafLong) // error 因为属于private
  // console.log(flower1.isFlower) // error 因为属于protected
  flower1.say()

  // ============================================readonly修饰符
  // readonly修饰符: 对类中的属性成员进行修饰,修饰后,该属性成员就不能被外部修改
  // 构造函数中，可以对只读属性成员的数据进行修改
  // 构造函数中的参数可以使用readonly进行修饰，一旦修饰了，那么该类就有了这个只读属性的成员了
  // 同理public等都一样
  class Teacher{
    // readonly name:string
    // constructor(name:string){
    //   this.name=name
    // }
    // 构造之后，类中就已经存在了只读的name属性
    // constructor(readonly name:string){
    //   // this.name=name
    // }
    // 构造之后，类中就已经存在了public的name属性
    constructor(public name:string){
      // this.name=name
    }
  }
  class Gongban extends Teacher{
    // readonly name:string
    // constructor(name:string){
    //   this.name=name
    // }
    constructor(readonly name:string){
      // this.name=name
      super(name)
    }
    say(){
      // this.name='test' // error 因为屎readonly
    }
  }

  let tc=new Teacher('鸣人')
  console.log(tc.name)
  // tc.name='佐助'  // error 因为属于readonly

})()