(function () {
  /**
   * 基本语法：
   * let 变量名:数据类型=值
   */
  // =======================布尔值
  let flag:boolean=true
  // flag=10 报错
  console.log(flag)

  // null和undefined
  let stud:null=null
  let numbers:number=undefined
  console.log(stud,numbers)

  // ======================数组和元组
  let arr:number[]=[11,22,33,44]
  let arr2:Array<number>=[11,22,33,44] // 数组泛型
  let arr3:[string,number]=['a,a',123]
  console.log(arr,arr2,arr3[0].split(','))

  // =============================枚举
  enum Color{
    red=1,
    blue,
    green
  }
  let color:Color=Color.green
  console.log(color)
  console.log(Color[3]);

  // ========================any，任何类型
  // 有优点也有缺点，缺点就是调用不是对应的方法的时候，没有错误提示信息
  let anyCon:any=['1','2',3]
  let anyCon2:any[]=['1','2',3]
  anyCon=['2']
  console.log(anyCon,anyCon2)
  
  // ========================void，没有任何类型
  function showVoid():void{
    console.log('void')
    // return 123 //报错
  }
  console.log(showVoid()) // undefined
  let voidValue:void=undefined // 只能赋值undefined和null，没有多大意义
  console.log(voidValue)

  // ========================object类型
  function showObj(obj:object):object{
    console.log(obj)
    return {
      name:'zjs',
      age:18
    }
  }
  console.log(showObj({name:'a',age:1}))

  //=========================联合类型(union type) ，表示取值可以为多种类型的一种
  // 需求1: 定义一个一个函数得到一个数字或字符串值的字符串形式值
  function getString(x:number|string):string{
    return x.toString()
  }
  console.log(getString(123))

  // ========================类型断言
  // 这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。
  // 语法方式1：<类型>变量
  // 语法方式2：变量 as 类型  tsx中只能用这种方式
  // 需求2: 定义一个一个函数得到一个数字或字符串值的长度
  function getString2(x:number|string):number{
    if((<string>x).length){
      return (x as string).length
    } else {
      return x.toString().length
    }
  }
  console.log(getString2(123253245))

  // ========================类型推断
  // 在没有明确类型的时候推测出一个类型
  // 1.定义变量时候没有对应的类型，推断为对应类型
  // 2.定义变量时候没赋值，推断为any类型
  let tui1=100  // 推断为number类型
  // tui1='2'  // error
  let tui2  // 推断为any类型
  tui2='2'
})()