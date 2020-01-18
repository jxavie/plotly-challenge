// define function for gauge to display frequency of washing
// function displayGauge(frequency) {
//     var trace = {
//         domain: {
//             x: [0, 1],
//             y: [0, 1]
//         },
//         value: frequency,
//         title: {text: "Belly Button Washing Frequency"},
//         type: "indicator",
//         mode: "gauge+number",
//         // delta: {reference: 400},
//         gauge: {axis: {range: [0, 9]}}
//     };

//     var data = [trace];

//     var layout = {width: 600, height: 400};

//     Plotly.newPlot("gauge", data, layout);
// };


// define function for gauge to display frequency of washing
function displayGauge(frequency) {
    
    // calculate meter point
    var degrees = 180 - (frequency / 9)*180, radius = 0.5;
    var radians = degrees * Math.PI / 180;
    var aX = 0.025 * Math.cos((degrees - 90) * Math.PI / 180);
    var aY = 0.025 * Math.sin((degrees - 90) * Math.PI / 180);
    var bX = -0.025 * Math.cos((degrees - 90) * Math.PI / 180);
    var bY = -0.025 * Math.sin((degrees - 90) * Math.PI / 180);
    var cX = radius * Math.cos(radians);
    var cY = radius * Math.sin(radians);

    console.log(degrees);

    var path = 'M ' + aX + ' ' + aY +
      ' L ' + bX + ' ' + bY +
      ' L ' + cX + ' ' + cY +
      ' Z';

    var trace = {
        values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        rotation: 90,
        text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: [
            "rgba(14, 127, 0, .5)",
            "rgba(110, 154, 22, .5)",
            "rgba(170, 202, 42, .5)",
            "rgba(202, 209, 95, .5)",
            "rgba(210, 206, 145, .5)",
            "rgba(232, 226, 202, .5)",
            "rgba(202, 209, 95, .5)",
            "rgba(210, 206, 145, .5)",
            "rgba(232, 226, 202, .5)",
            "rgba(255, 255, 255, 0)"
          ]
        },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: "label",
        hole: .5,
        type: "pie",
        showlegend: false
    };
    
    var data = [trace];
    
    var layout = {
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
            color: '850000'
          }
        }],
        height: 400,
        width: 400,
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

    // set style
    // d3.select("#gauge").attr("style", "max-height: calc(200px + 20px) !important; overflow: hidden;")

};

// function updateGauge() {
//     Plotly.restyle()
// }