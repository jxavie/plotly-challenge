var datasource = "samples.json";

// select div for displaying demographic info
var demo_div = d3.select("#sample-metadata");

d3.json(datasource).then((dataset) => {

    // assign samples object to variable
    var sample_ids = dataset.names;
    console.log(sample_ids);

    // populate Test Subject ID No. dropdown
    var select = d3.select("#selDataset");
    for (var i=0; i < sample_ids.length; i++ ){
        select.append("option")
            .attr("value", sample_ids[i])
            .text(sample_ids[i]);
    };

    // dynamically determine default id
    var selDefault = d3.select("#selDataset").property("value");
    console.log(selDefault);

    // assign dataset metadata array to variable
    var demographics = dataset.metadata;

    // define function to filter dataset based on selected id
    function selFilter(record) {
        return record.id == selDefault;
    };

    // use filter function to extract metadata object for selected id
    var selDemo = demographics.filter(selFilter);
    console.log(selDemo);

    // create arrays of keys and values in metadata object
    var selDemo_keys = Object.keys(selDemo[0]);
    var selDemo_values = Object.values(selDemo[0]);

    // create an array of key-value pairs for dashboard
    var selDemo_entries = [];
    for (var i=0; i < selDemo_keys.length; i++) {
        var key = selDemo_keys[i];
        var value = selDemo_values[i];
        selDemo_entries.push(`${key}: ${value}`);        
    };
    console.log(selDemo_entries);

    // append <ul> tag to html
    var ul = demo_div.append("ul")
        .attr("style","padding: 0; list-style-type:none;")

    // bind key-value pair data to list tags and append to html
    ul.selectAll("li")
        .data(selDemo_entries)
        .enter()
        .append("li")
        .text(d => d);

    // assign dataset samples array to variable
    var samples = dataset.samples;

    // declare arrays to store OTU data
    var selIDs = [];
    var selLabels = [];
    var selSamples = [];

    // extract samples data for default id
    samples.forEach((record) => {
        if (record.id == selDefault) {
            selIDs = record.otu_ids;
            selLabels = record.otu_labels;
            selSamples = record.sample_values;
        };
    });

    // create an array of arrays with the id, label, and sample value for each OTU
    // sort resulting array based on sample value and extract top 10
    var otu_data = selIDs.map((i, j) => [i, selLabels[j], selSamples[j]]);
    var otu_top10 = otu_data.sort((a, b) => (b[2] - a[2]))
        .slice(0,10)
        .sort((a, b) => (a[0] - b[0]))
        .sort((a, b) => (a[2] - b[2]));
    console.log(otu_top10);
    
    // declare arrays to store plot data
    var bar_ids = [];
    var bar_labels = [];
    var bar_samples = [];

    // create a separate array for ids, labels, and sample values for top 10 OTU
    otu_top10.forEach(function(record) {
        bar_ids.push(`OTU ${record[0]}`);
        bar_labels.push(record[1]);
        bar_samples.push(record[2]);
    });
    // console.log(selDemo.wfreq);
    console.log(bar_ids);
    console.log(bar_labels);
    console.log(bar_samples);

    // define function for bar chart of top 10 OTUs for selected id
    function displayBar() {
        var trace = {
            type: "bar",
            x: bar_samples,
            y: bar_ids,
            text: bar_labels,
            orientation: "h"
        };

        var data = [trace];

        layout = {
            title: "Top 10 OTUs"
        };

        Plotly.newPlot("bar", data, layout);
    };

    // define function for bubble chart of top 10 OTUs for selected id
    function displayBubble() {
        var trace = {
            x: selIDs,
            y: selSamples,
            text: selLabels,
            mode: "markers",
            marker: {size: selSamples}
        };

        var data = [trace];

        layout = {
            // title: "Top 10 OTUs",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", data, layout);
    };

    // render plots
    displayBar();
    displayBubble();

    // render gauge by calling function from bonus.js
    displayGauge(selDemo[0].wfreq);
    
});

// tasks to perform when a different id is selected 
function optionChanged(selection){
    
    // print selected id
    console.log(selection);

    d3.json(datasource).then((dataset) => {
        
        // delete previous tables
        d3.select("ul").html("");

        // assign dataset metadata array to variable
        var demographics = dataset.metadata;
        console.log(demographics);

        // define function to filter dataset based on selected id
        function selFilter(record) {
            return record.id == selection;
        };

        // use filter function to extract metadata object for selected id
        results_demo = demographics.filter(selFilter);
        console.log(results_demo);

        // create arrays of keys and values in metadata object
        var demo_keys = Object.keys(results_demo[0]);
        var demo_values = Object.values(results_demo[0]);

        // create an array of key-value pairs for dashboard
        var demo_entries = [];
        for (var i=0; i<demo_keys.length; i++) {
            var key = demo_keys[i];
            var value = demo_values[i];
            demo_entries.push(`${key}: ${value}`);
        };
        console.log(demo_entries);

        // bind key-value pair data to list tags
        selDemo = demo_div.select("ul")
            .selectAll("li")
            .data(demo_entries);

        // append list tags to html
        selDemo.enter()
            .append("li")
            .merge(selDemo)
            .text((d) => d);

        // assign dataset samples array to variable
        var samples = dataset.samples;
        
        // declare arrays to store OTU data
        var selIDs = [];
        var selLabels = [];
        var selSamples = [];

        // extract samples data for default id
        samples.forEach((record) => {
            if (record.id == selection) {
                selIDs = record.otu_ids;
                selLabels = record.otu_labels;
                selSamples = record.sample_values;
            };
        });

        // create an array of arrays with the id, label, and sample value for each OTU
        // sort resulting array based on sample value and extract top 10
        var otu_data = selIDs.map((i, j) => [i, selLabels[j], selSamples[j]]);
        var otu_top10 = otu_data.sort((a, b) => (b[2] - a[2]))
            .slice(0,10)
            .sort((a, b) => (a[0] - b[0]))
            .sort((a, b) => (a[2] - b[2]));
        console.log(otu_top10);

        // declare arrays to store plot data
        var bar_ids = [];
        var bar_labels = [];
        var bar_samples = [];

        // create a separate array for ids, labels, and sample values for top 10 OTU
        otu_top10.forEach(function(record) {
            bar_ids.push(`OTU ${record[0]}`);
            bar_labels.push(record[1]);
            bar_samples.push(record[2]);
        });
        console.log(bar_ids);
        console.log(bar_labels);
        console.log(bar_samples);

        // update bar chart with data for selected id
        Plotly.restyle("bar", "x", [bar_samples]);
        Plotly.restyle("bar", "y", [bar_ids]);
        Plotly.restyle("bar", "text", [bar_labels]);

        // update bar chart with data for selected id
        Plotly.restyle("bubble", "x", [selIDs]);
        Plotly.restyle("bubble", "y", [selSamples]);
        Plotly.restyle("bubble", "text", [selLabels]);
        Plotly.restyle("bubble", "size", [selSamples]);

    });

}