// import "./a.css"
// import "./b.less"3
import './d.stylus'

//代理请求接口
console.log('100')

fetch('/api/pro/search')
  .then(res => res.json())
  .then(res => {
    console.log(res.data)
  })