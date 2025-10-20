import Barchart from "./components/Barchart"

const Home = () =>{
    //useEffect 里的代码是在 React 已经完成 DOM 渲染和挂载之后才执行的。
    //只有在 DOM 节点存在之后，我们才能安全地调用 document.getElementById('main') 来获取到这个元素，并将其传递给 echarts.init()。
   return(
    <div>
        <Barchart title={'bbbb'} chartId={'1'}/>
        <Barchart title={'bbab'} chartId={'2'}/>
    </div>
   )
  
}

export default Home