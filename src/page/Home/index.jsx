import * as echarts from 'echarts';
import { useEffect } from 'react';


const Home = () =>{
    //useEffect 里的代码是在 React 已经完成 DOM 渲染和挂载之后才执行的。
    //只有在 DOM 节点存在之后，我们才能安全地调用 document.getElementById('main') 来获取到这个元素，并将其传递给 echarts.init()。
    useEffect(()=>{
        //1. 获取渲染图表的dom节点，Echarts需要这个真是的DOM元素作为渲染容器
        const chartDom = document.getElementById('main');

        //2. 传入 DOM 节点，创建一个图表实例 (myChart)
        const myChart = echarts.init(chartDom);

        //3. 准备图表参数
        const option = {
        xAxis: {
            type: 'category',
            data: ['view', 'react','Angular']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [10,40,70],
            type: 'bar'
            }
        ]
        };

        //4. 使用图表参数完成图表的渲染
        option && myChart.setOption(option);
    },[])
    return(
        <div>
           <div id = 'main' style={{width:'500px', height:'400px'}}></div>
        </div>
    )
}

export default Home