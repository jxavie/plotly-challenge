// alternate definition of function for gauge to display frequency of washing
// function displayGauge(frequency) {
//     var trace = {
//         domain: {
//             x: [0, 1],
//             y: [0, 1]
//         },
//         value: frequency,
//         title: {text: "Belly Button Washing Frequency \n "},
//         type: "indicator",
//         mode: "gauge+number",
//         delta: {reference: frequency},
//         gauge: {axis: {range: [0, 9]}}
//     };

//     var data = [trace];

//     var layout = {width: 600, height: 400};

//     Plotly.newPlot("gauge", data, layout);
// };


// define function for gauge to display frequency of washing
function displayGauge(frequency) {
  
  // set style
  d3.select("#gauge")
    .attr("style", "max-height: calc(300px + 20px) !important; overflow: hidden; padding: 0; margin: 0;")

  // calculate pointer tip position
  var degrees = 180 - (frequency / 9) * 180, radius = 0.5;
  var radians = degrees * Math.PI / 180;
  var xTip = radius * Math.cos(radians);
  var yTip = radius * Math.sin(radians);

  console.log(degrees);

  // calculate position of bottom verteces of triangular pointer
  var xLeft = 0.025 * Math.cos((degrees - 90) * Math.PI / 180);
  var yLeft = 0.025 * Math.sin((degrees - 90) * Math.PI / 180);
  var xRight = -0.025 * Math.cos((degrees - 90) * Math.PI / 180);
  var yRight = -0.025 * Math.sin((degrees - 90) * Math.PI / 180);

  console.log(`xLeft: ${xLeft}`);
  console.log(`yLeft: ${yLeft}`);
  console.log(`xRight: ${xRight}`);
  console.log(`yRight: ${yRight}`);

  // create triangular pointer based on calculated coordinates
  var path = 'M ' + xLeft + ' ' + yLeft +
    ' L ' + xRight + ' ' + yRight +
    ' L ' + xTip + ' ' + yTip +
    ' Z';

  // define trace for pie chart (gauge values)
  var trace_pie = {
    values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
    rotation: 90,
    text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
    textinfo: "text",
    textposition: "inside",
    marker: {
      colors: [
        '#99ff99',
        '#b3ff99',
        '#ccff99',
        '#e6ff99',
        '#ffff99',
        '#ffe699',
        '#ffcc99',
        '#ffb399',
        '#ff9999',
        '#ffffff'
      ],
    },
    labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
    // hoverinfo: "label",
    hoverinfo: "none",
    hole: .5,
    type: "pie",
    showlegend: false,
  };

  // define trace for pointer dot
  trace_dot = {
    type: "scatter",
    x: [0,],
    y: [0],
    marker: {
      size: 20,
      color: '850000'
    },
    name: "scrubs",
    text: frequency,
    hoverinfo: "text+name",
    showlegend: false
  };
  
  var data = [trace_pie, trace_dot];
  
  var layout = {
    title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
    shapes: [{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
        color: '850000'
      }
    }],
    height: 500,
    width: 500,
    xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        fixedrange: true,
        range: [-1, 1]
    },
    yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        fixedrange: true,
        range: [-1, 1]
    }
  };
  
  Plotly.newPlot("gauge", data, layout);

};