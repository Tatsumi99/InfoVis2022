var ctx = document.getElementById("myRadarChart");
var myRadarChart = new Chart(ctx, {
  //グラフの種類
  type: 'radar',
  //データの設定
　data: {
    labels: ['英語', '国語', '数学', '理科', '社会'],
    datasets: [{
      label: '科目',
      //グラフのデータ
      data: [80, 60, 40, 90, 50],
      // データライン
      borderColor: 'red',
    }],
  },
  //オプションの設定
  options: {
    scales: {
      r: {
        //グラフの最小値・最大値
        min: 0,
        max: 100,
        //背景色
        backgroundColor: 'snow',
        //グリッドライン
        grid: {
          color: 'pink',
        },
        //アングルライン
        angleLines: {
          color: 'green',
        },
        //各項目のラベル
        pointLabels: {
          color: 'blue',
        },
      },
    },
  }, 
});
 