// import "./a.css"
// import "./b.less"3
// import './d' //缺省后缀名
import '@/d' //"配置@"


//代理请求接口
console.log('100')

fetch('/api/pro/search')
  .then(res => res.json())
  .then(res => {
    console.log(res.data)
  })

  //测试垫片打包文件区别
  const obj = { a: 1 };
  const newObj = Object.assign({}, obj, { b: 2 });

  console.log(newObj);
  