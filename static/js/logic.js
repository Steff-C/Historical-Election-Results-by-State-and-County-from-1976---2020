// function optionChanged(newYear) {

// buildmap(newID);
// buildLineChart(newID);

// console.log("hello")
// }

// “Candidate XXX beatCandidate YYY in the electoral college by a scoreof AAA - BBB or by %.”

function writestatetext(data) {
    if (!(data && data.length > 0)) {
    throw "No data passed into write state text";
    }
    
    var statename = data[0].state;
    var year = data[0].year;
    
    var partyVotes = {};
    
    for (var i = 0; i < data.length; i++) {
    if (partyVotes.hasOwnProperty(data[i].party)) {
    partyVotes[data[i].party] += data[i].votes;
    } else {
    partyVotes[data[i].party] = data[i].votes;
    }
    }
    
    var text1 = `<h2> In ${year} ${statename} voted: </h2>`;
    var text2 = '<p>';
    for(var partyName in partyVotes) {
    text2 += partyName + ': ' + partyVotes[partyName] + '<br/>';
    }
    text2 += '</p>';
    
    document.getElementById("yearstate").innerHTML = text1;
    document.getElementById("prctwonloss").innerHTML = text2;
    
    //d3.select(".text1").text(info);
    //d3.select(".text2").text(approximateInfo);
    }
    