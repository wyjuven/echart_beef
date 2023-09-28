var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

//var ROOT_PATH = 'https://echarts.apache.org/examples';
//import * as echarts from 'echarts';
//var chartDom = document.getElementById('main');
//var myChart = echarts.init(chartDom);
var option;

(function () {
  const prepared = document.createElement('template')
  prepared.innerHTML = `
      <style>chart_dom
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
    class SamplePrepared extends HTMLElement {
      constructor () {
        super()
  
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(prepared.content.cloneNode(true))
  
        this._root = this._shadowRoot.getElementById('root')
  
        this._props = {}
  
        this.render()
      }
  
      async render () {
        await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.4.3/echarts.min.js')
  
        const chart = echarts.init(this._root)
        $.get('https://wyjuven.github.io/echart_beef/beef_cuts_france.svg', function (svg) {
          echarts.registerMap('beef_cuts_france', { svg: svg });
          option = {
            tooltip: {},
            visualMap: {
              left: 'center',
              bottom: '10%',
              min: 0,
              max: 10000,
              orient: 'horizontal',
              text: ['', '数量'],
              realtime: true,
              calculable: true,
              inRange: {
                color: ['#dbac00', '#db6e00', '#cf0000']
              }
            },
            series: [
              {
                name: 'French Beef Cuts',
                type: 'map',
                map: 'beef_cuts_france',
                roam: true,
                emphasis: {
                  label: {
                    show: false
                  }
                },
                selectedMode: false,
                data: [
                  { name: '牛尾', value: 15 },
                  { name: '牛舌', value: 35 },
                  { name: '脸颊板', value: 15 },
                  { name: '前胸', value: 25 },
                  { name: '前腱F1', value: 45 },
                  { name: '衣架牛排', value: 85 },
                  { name: '牛霖', value: 25 },
                  { name: '后腿嫩肩肉', value: 15 },
                  { name: '牛腿心', value: 55 },
                  { name: "下后腰脊肉", value: 25 },
                  { name: '小米龙', value: 65 },
                  { name: '尾龙扒', value: 45 },
                  { name: '牛五花', value: 85 },
                  { name: '牛腩', value: 35 },
                  { name: '膈肌', value: 75 },
                  { name: '牛小排', value: 65 },
                  { name: '后胸', value: 65 },
                  { name: '前腱F2', value: 85 },
                  { name: '去盖针扒', value: 75 },
                  { name: '西冷', value: 65 },
                  { name: '眼肉', value: 55 },
                  { name: '上脑', value: 45 },
                  { name: '牛颈', value: 85 },
                  { name: '牛内肩', value: 15 },
                  { name: '牛板腱', value: 65 },
                  { name: '保乐肩', value: 45 },
                  { name: '后腱H1', value: 85 },
                  { name: '臀腰肉心', value: 65 },
                  { name: '菲力', value: 95 }
                ]
              }
            ]
          };
        
        chart.setOption(option)
      });
      option && myChart.setOption(option);
    }}

  customElements.define('com-standard-echarts', SamplePrepared)
})()
