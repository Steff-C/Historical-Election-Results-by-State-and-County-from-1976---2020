// console.log("Loaded main.js");

function countVotes(data) {
    let byYear = {};
    data.forEach((d) => {
        let yearObj = byYear[d.year];
        if (yearObj === undefined) {
            //set yearObj and byYear[d.year] to the new empty object (only if d.year hadn't been seen before)
            yearObj = byYear[d.year] = {};
        }

        if (yearObj[d.party] === undefined)
            yearObj[d.party] = d.votes;
        else
            yearObj[d.party] += d.votes;
    });
    return byYear;
}

function buildLineChart() {

    d3.json("/electionresults").then(data => {
        // console.log(data);
        let niceData = countVotes(data);

        // console.log(niceData);

        let graphData = Object.keys(niceData).map(year => {
            let otherCount = 0;

            for (let party in niceData[year]) {
                if (party !== 'democrat' && party !== 'republican') {
                    otherCount += niceData[year][party];
                }
            }
            return {
                year: +year,
                democrat: niceData[year].democrat.toPrecision(2),
                republican: niceData[year].republican.toPrecision(2),
                other: otherCount.toPrecision(2),
            };
        })

        // console.log(graphData);

        var layout = {
            title: '<b>Total Party Votes per Election Year</b>',
            font: {
                family: 'Lucida Sans',
                size: 16
            },
            xaxis: {
                title: 'Election year',
                mirror: 'ticks',
                gridcolor: 'grey',
                gridwidth: 1,
                tickvals: [2000, 2004, 2008, 2012, 2016],
                linewidth: 2,
                    tickfont: {
                        family: 'Lucida Sans',
                        size: 12,  
                    }
            },
            yaxis: {
                title: 'Total Votes',
                mirror: 'ticks',
                gridcolor: 'grey',
                linewidth: 2,
                tickfont: {
                    family: 'Lucida Sans',
                    size: 12,
                }
            },
        };

        var config = { responsive: true }

        Plotly.newPlot('chart', [
            {
                x: graphData.map(x => x.year),
                y: graphData.map(x => x.republican),
                name: 'Republican',
                mode: 'lines+markers',
                marker: {
                    color: 'red',
                    size: 12,
                    opacity: .5
                },
            },
            {
                x: graphData.map(x => x.year),
                y: graphData.map(x => x.democrat),
                name: 'Democrat',
                mode: 'lines+markers',
                marker: {
                    color: 'blue',
                    size: 12,
                    opacity: .5
                },
            },
            {
                x: graphData.map(x => x.year),
                y: graphData.map(x => x.other),
                name: 'Other',
                mode: 'lines+markers',
                marker: {
                    color: 'black',
                    size: 12,
                    opacity: .5
                },
            },
        ], layout, config);
    }); 
}
buildLineChart();