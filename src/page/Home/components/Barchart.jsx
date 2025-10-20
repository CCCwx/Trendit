//封装一个柱状图徐建，仅供Home使用

//1. 把功能代码都放在这个组件中
//2。 把可变的部分抽象成prop参数
import * as echarts from 'echarts';
import { useEffect } from 'react';

const Barchart = ({title,chartId}) =>{
     useEffect(()=>{
        //1. 获取渲染图表的dom节点，Echarts需要这个真是的DOM元素作为渲染容器
        //// 使用传入的 chartId 代替硬编码的 'main'
        const chartDom = document.getElementById(chartId);

        //2. 传入 DOM 节点，创建一个图表实例 (myChart)
        const myChart = echarts.init(chartDom);

        //3. 准备图表参数
        const option = {
            title:{
                text:title
            },
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
    },[chartId,title])

      return(
        <div>
           <div id = {chartId} style={{width:'500px', height:'400px'}}></div>
        </div>
    )
}

export default Barchart