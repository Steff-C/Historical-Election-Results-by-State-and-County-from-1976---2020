console.log("Loaded main.js");

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

    d3.json("http://127.0.0.1:5000/electionresults").then(data => {
        //console.log(data);
        let niceData = countVotes(data);

        //console.log(niceData);

        let graphData = Object.keys(niceData).map(year => {
            let otherCount = 0;

            for (let party in niceData[year]) {
                if (party !== 'democrat' && party !== 'republican') {
                    otherCount += niceData[year][party];
                }
            }

            return {
                year: +year,
                decmocrat: niceData[year].democrat,
                republican: niceData[year].republican,
                other: otherCount,
            };
        })

        //console.log(graphData);

        Plotly.newPlot('chart', [
            {
                x: graphData.map(x => x.year),
                y: graphData.map(x => x.republican),
                mode: 'lines+markers',
                marker: { size: 12, opacity: .5 },
            },
            {
                x: graphData.map(x => x.year),
                y: graphData.map(x => x.decmocrat),
                mode: 'lines+markers',
                marker: { size: 12, opacity: .5 },
            },
            {
                x: graphData.map(x => x.year),
                y: graphData.map(x => x.other),
                mode: 'lines+markers',
                marker: { size: 12, opacity: .5 },
            },
        ], {
            title:'Line and Scatter Plot',
            height: 400,
            width: 480
        });

        // Plotly.newPlot('myDiv', data, layout);


        // var years = [];
        // var demVotes = [];

        // // Make separate arrays based on party affiliation
        // var demsArray = data.filter(d => d.party === "democrat");
        // var repubsArray = data.filter(d => d.party === "republican");
        // var othersArray = data.filter(d => d.party !== "republican" && d.party !== "democrat");

        // // Make array for all unique 'year' values
        // data.forEach((d) => {
        //     if (!years.includes(d.year)) {
        //         years.push(d.year);
        //     }
        // });

        // // Get total votes for democrats in year 2000
        // var dems2000 = demsArray.filter(d => d.year === 2000);
        // var dems2000tot = dems2000.map(d => d.votes).reduce((prev, next) => prev + next);
        // console.log(dems2000tot);

        // console.log(demVotes);
        // console.log(years);
        // console.log(demsArray);
        // console.log(repubsArray);
        // console.log(othersArray);
    });
}
buildLineChart();