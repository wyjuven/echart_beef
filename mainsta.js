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
        await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')
  
        const chart = echarts.init(this._root)
        $.get('https://wyjuven.github.io/echart_beef/beef_cuts_france.svg', function (svg) {
          echarts.registerMap('beef_cuts_france', { svg: svg });
          option = {
            tooltip: {},
            visualMap: {
              left: 'center',
              bottom: '10%',
              min: 5,
              max: 100,
              orient: 'horizontal',
              text: ['', 'Price'],
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
                  { name: 'Queue', value: 15 },
                  { name: 'Langue', value: 35 },
                  { name: 'Plat de joue', value: 15 },
                  { name: 'Gros bout de poitrine', value: 25 },
                  { name: 'Jumeau à pot-au-feu', value: 45 },
                  { name: 'Onglet', value: 85 },
                  { name: 'Plat de tranche', value: 25 },
                  { name: 'Araignée', value: 15 },
                  { name: 'Gîte à la noix', value: 55 },
                  { name: "Bavette d'aloyau", value: 25 },
                  { name: 'Tende de tranche', value: 65 },
                  { name: 'Rond de gîte', value: 45 },
                  { name: 'Bavettede de flanchet', value: 85 },
                  { name: 'Flanchet', value: 35 },
                  { name: 'Hampe', value: 75 },
                  { name: 'Plat de côtes', value: 65 },
                  { name: 'Tendron Milieu de poitrine', value: 65 },
                  { name: 'Macreuse à pot-au-feu', value: 85 },
                  { name: 'Rumsteck', value: 75 },
                  { name: 'Faux-filet', value: 65 },
                  { name: 'Côtes Entrecôtes', value: 55 },
                  { name: 'Basses côtes', value: 45 },
                  { name: 'Collier', value: 85 },
                  { name: 'Jumeau à biftek', value: 15 },
                  { name: 'Paleron', value: 65 },
                  { name: 'Macreuse à bifteck', value: 45 },
                  { name: 'Gîte', value: 85 },
                  { name: 'Aiguillette baronne', value: 65 },
                  { name: 'Filet', value: 95 }
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
