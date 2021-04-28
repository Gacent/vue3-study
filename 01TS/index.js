/**
 * 
 * @param {object} opt
 *  列數：opt.columns
 *  右間距：opt.marginRight
 *  下間距：opt.marginTop
 *  item類：opt.item
 *  
 */
function waterFall(opt){
  // 屏幕寬度-滾動條寬度=頁面真實寬度
  let pageWidth=getClient().width - 8
  let columns=opt.columns||3 // 列數，默認三
  let marginRight=opt.marginRight||10 // 右間距，默認10
  let marginTop=opt.marginTop||10 // 下間距，默認10
  let itemWidth = parseInt(pageWidth/columns - marginRight); //得到item的宽度
  let item=Array.from(opt.item)
  item.map(i=>{ //设置到item的宽度
    i.style.width=itemWidth+'px'
  })
  let arr=[] // 記錄高度
  item.map((i,idx)=>{
    let height=i.getElementsByTagName('img')[0].getBoundingClientRect().height
    if (idx < columns) {
        // 2 第一行按序布局
        i.style.top=0+'px'
        i.style.left=((itemWidth) * idx+marginRight*idx)+'px'
        //将行高push到数组
        arr.push(height);
    } else {
        // 其他行
        // 3 找到数组中最小高度  和 它的索引
        var minHeight = arr[0];
        var index = 0;
        for (var j = 0; j < arr.length; j++) {
            if (minHeight > arr[j]) {
                minHeight = arr[j];
                index = j;
            }
        }
        // 4 设置下一行的第一个盒子位置
        // top值就是最小列的高度
        i.style.top=arr[index]+marginTop+'px'
        i.style.left=item[index].getBoundingClientRect().left+'px'
        // 5 修改最小列的高度
        // 最小列的高度 = 当前自己的高度 + 拼接过来的高度
        arr[index] = arr[index] + height+marginTop;//设置30的距离
    }
  })
}
//clientWidth 处理兼容性
function getClient() {
  return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}