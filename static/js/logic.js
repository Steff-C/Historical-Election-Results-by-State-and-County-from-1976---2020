function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
function writestatetext(data) {
    if (!(data && data.length > 0)) {
        throw "No data passed into write state text";
    }
    var statename = data[0].state;
    var year = data[0].year;
    var partyVotes = {};
    for (var i = 0; i < data.length; i++) {
        var party = data[i].party;
        if (party !== 'democrat' && party !== 'republican') {
            party = "other";
        }
        if (partyVotes.hasOwnProperty(party)) {
            partyVotes[party] += data[i].votes;
        } else {
            partyVotes[party] = data[i].votes;
        }
    }
    var text1 = `<h2> In ${year} ${statename} voted: </h2>`;
    var text2 = '<p>';
    for (var partyName in partyVotes) {
        text2 += partyName + ': ' + formatNumber(partyVotes[partyName]) + '<br/>';
    }
    text2 += '</p>';
    document.getElementById("yearstate").innerHTML = text1;
    document.getElementById("prctwonloss").innerHTML = text2;
    //d3.select(".text1").text(info);
    //d3.select(".text2").text(approximateInfo);
}