console.log("Loaded main.js");
function init(){
makecountrymap(2000);
htmlchosenstate="";
}
function makecountrymap(year){
var queryUrl = `/stateelectionresults/${year}`;
d3.json(queryUrl).then(function(data) {
for (i=0; i<statesData.features.length; i++)
{
statesData.features[i].properties['DemocratPercent']=data.filter(d => (d.state === statesData.features[i].properties.name.toUpperCase() && d.party === "DEMOCRAT"))[0].percentage;
statesData.features[i].properties['DemocratCandidate']=data.filter(d => (d.state === statesData.features[i].properties.name.toUpperCase() && d.party === "DEMOCRAT"))[0].candidate;
statesData.features[i].properties['RepublicanPercent']=data.filter(d => (d.state === statesData.features[i].properties.name.toUpperCase() && d.party === "REPUBLICAN"))[0].percentage;
statesData.features[i].properties['RepublicanCandidate']=data.filter(d => (d.state === statesData.features[i].properties.name.toUpperCase() && d.party === "REPUBLICAN"))[0].candidate;
}
function getColor(d) {
return d > 0.15 ? '#001666' :
d > 0.1 ? '#244999' :
d > 0.05 ? '#577CCC' :
d > 0 ? '#8AAFFF' :
d > -0.05 ? '#FF8B98' :
d > -0.1 ? '#FF5865' :
d > -0.15 ? '#D22532' :
'#9F0000';
}
function onEachFeature(feature, layer) {
layer.on({
mouseover: highlightFeature,
mouseout: resetHighlight,
click: createstatemap
});
}
function highlightFeature(e) {
var layer = e.target;
layer.setStyle({
weight: 5,
color: '#666',
dashArray: '',
fillOpacity: 0.7
});
if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
layer.bringToFront();
}
info.update(layer.feature.properties);
}
function resetHighlight(e) {
geojson.resetStyle(e.target);
info.update();
}
var graymap=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + MapboxAPI, {
id: 'mapbox/light-v9',
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
zoomOffset: -1,
maxzoom: 18
});
if (L.DomUtil.get('map') !== undefined) { 
L.DomUtil.get('map')._leaflet_id = null; 
}
var map = L.map('map', {zoomControl: false}).setView([37.8, -96], 3);
var zoom_bar = new L.Control.ZoomBar({position: 'topleft'}).addTo(map);
graymap.addTo(map)
function style(feature) {
repubpercent=data.filter(d => (d.state === feature.properties.name.toUpperCase() && d.party === "REPUBLICAN"))[0].percentage;
dempercent=data.filter(d => (d.state === feature.properties.name.toUpperCase() && d.party === "DEMOCRAT"))[0].percentage;
return {
fillColor: getColor(dempercent-repubpercent),
weight: 2,
opacity: 1,
color: 'white',
dashArray: '3',
fillOpacity: 0.7
};
}
var geojson=L.geoJson(statesData, {style: style, onEachFeature: onEachFeature}).addTo(map);
var info = L.control();

info.onAdd = function (map) {
//I received this code from stackoverflow which can remove an element from our HTML page
function removeElementsByClass(infoclassName){
const elements = document.getElementsByClassName(infoclassName);
while(elements.length > 0){
elements[0].parentNode.removeChild(elements[0]);
}
}
removeElementsByClass('info');
info._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
info.update();
return info._div;
};

//method that we will use to update the control based on feature properties passed
info.update = function (props) {
if(props)
{
republicanpercent=Math.round(props.RepublicanPercent*10000)/100;
democratpercent = Math.round(props.DemocratPercent*10000)/100;
otherpercent = Math.round((100-republicanpercent-democratpercent)*100)/100;
}
info._div.innerHTML = '<h6>' + year + ' Presidential Election</h6>' + (props ?
'<b>' + props.name + '</b><br />' + '(D) ' + props.DemocratCandidate + ': ' + democratpercent + '%' +
'<br />' + '(R) ' + props.RepublicanCandidate + ': ' + republicanpercent + '%' +
'<br />' + 'Other: ' + otherpercent + '%'
: 'Hover over a state');
};
info.addTo(map);
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend'),
grades = [0.15, 0.1, 0.05, 0, -0.05, -0.1, -0.15, -0.2],
gradeslabels = ['>15% (D)', '10% - 15% (D)','5%-10% (D)','0%-5% (D)','0%-5% (R)','5%-10% (R)',
'10%-15% (R)','>15% (R)'];
div.innerHTML += '<b> Margin of Victory </b> <br>';
// loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
div.innerHTML +=
'<i style="background:' + getColor(grades[i]+0.01) + '"></i> ' +
gradeslabels[i] + (gradeslabels[i + 1] ? '<br>' : '');
}

return div;
};

legend.addTo(map);
});
}
function updateCountryMap() {
// Use D3 to select the dropdown menu
var dropdownMenu = d3.select("#selDataset");
// Assign the value of the dropdown menu option to a variable
var dataset = dropdownMenu.property("value");
makecountrymap(dataset);
}
init();
d3.selectAll("#selDataset").on("change", updateCountryMap);
function createstatemap(stateclicked) {
statename = stateclicked.target.feature.properties.name;
mapbounds=stateclicked.target.getBounds();
var dropdownMenu = d3.select("#selDataset");
var year = dropdownMenu.property("value");
var queryUrl = `/electionresults/${statename}/${year}`
d3.json(queryUrl).then(function(data) {
writestatetext(data);
totalcounties = {};
fipsarray=[];
for (i=0; i<data.length; i++)
{
if (typeof totalcounties[data[i].FIPS] === 'undefined'){
totalcounties[data[i].FIPS] = {}
totalcounties[data[i].FIPS]["TotalVotes"] = 0;
totalcounties[data[i].FIPS]["County"]=data[i].county;
fipsarray.push(data[i].FIPS)
}
totalcounties[data[i].FIPS][data[i].party] = {};
totalcounties[data[i].FIPS][data[i].party]["Votes"]=data[i].votes;
totalcounties[data[i].FIPS][data[i].party]["Candidate"]=data[i].candidate;
totalcounties[data[i].FIPS]["TotalVotes"] += data[i].votes;
}
copyofcountiesdata={...countiesdata};
copyofcountiesdata.features=countiesdata.features.filter(d => fipsarray.includes(d.properties.GEOID));

for (i=0; i<copyofcountiesdata.features.length; i++)
{
countyid=copyofcountiesdata.features[i].properties.GEOID;
copyofcountiesdata.features[i].properties['DemocratPercent']=totalcounties[countyid].democrat.Votes/totalcounties[countyid].TotalVotes;
copyofcountiesdata.features[i].properties['DemocratCandidate']=totalcounties[countyid].democrat.Candidate;
copyofcountiesdata.features[i].properties['RepublicanPercent']=totalcounties[countyid].republican.Votes/totalcounties[countyid].TotalVotes;
copyofcountiesdata.features[i].properties['RepublicanCandidate']=totalcounties[countyid].republican.Candidate;
}

function getColor(d) {
return d > 0.15 ? '#001666' :
d > 0.1 ? '#244999' :
d > 0.05 ? '#577CCC' :
d > 0 ? '#8AAFFF' :
d > -0.05 ? '#FF8B98' :
d > -0.1 ? '#FF5865' :
d > -0.15 ? '#D22532' :
'#9F0000';
}
function onEachFeature(feature, layer) {
layer.on({
mouseover: highlightFeature,
mouseout: resetHighlight,
});
}
function highlightFeature(e) {
var layer = e.target;
layer.setStyle({
weight: 5,
color: '#666',
dashArray: '',
fillOpacity: 0.7
});
if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
layer.bringToFront();
}
info.update(layer.feature.properties);
}
function resetHighlight(e) {
geojson.resetStyle(e.target);
info.update();
}
var graymap=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + MapboxAPI, {
id: 'mapbox/light-v9',
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
zoomOffset: -1,
maxzoom: 18
});
if (L.DomUtil.get('countymap') !== undefined) { 
L.DomUtil.get('countymap')._leaflet_id = null; 
}
var countymap = L.map('countymap').setView([37.8, -96], 4);
countymap.fitBounds(mapbounds);
graymap.addTo(countymap)
function style(feature) {
repubpercent=feature.properties.RepublicanPercent;
dempercent=feature.properties.DemocratPercent;
return {
fillColor: getColor(dempercent-repubpercent),
weight: 2,
opacity: 1,
color: 'white',
dashArray: '3',
fillOpacity: 0.7
};
}
var geojson=L.geoJson(copyofcountiesdata, {style: style, onEachFeature: onEachFeature, draggable: true}).addTo(countymap);
var info = L.control();

info.onAdd = function (map) {
function removeElementsByClass(infoclassName){
const elements = document.getElementsByClassName(infoclassName);
while(elements.length > 0){
elements[0].parentNode.removeChild(elements[0]);
}
}
removeElementsByClass('countyinfo');
info._div = L.DomUtil.create('div', 'countyinfo'); // create a div with a class "info"
info.update();
return info._div;
};

//method that we will use to update the control based on feature properties passed
info.update = function (props) {
if(props)
{
republicanpercent=Math.round(props.RepublicanPercent*10000)/100;
democratpercent = Math.round(props.DemocratPercent*10000)/100;
otherpercent = Math.round((100-republicanpercent-democratpercent)*100)/100;
}
info._div.innerHTML = '<h6>' + year + ' Presidential Election</h6>' + (props ?
'<b>' + props.COUNTY_STATE_CODE + '</b><br />' + '(D) ' + props.DemocratCandidate + ': ' + democratpercent + '%' +
'<br />' + '(R) ' + props.RepublicanCandidate + ': ' + republicanpercent + '%' +
'<br />' + 'Other: ' + otherpercent + '%'
: 'Hover over a county');
};
info.addTo(countymap);
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend'),
grades = [0.15, 0.1, 0.05, 0, -0.05, -0.1, -0.15, -0.2],
gradeslabels = ['>15% (D)', '10% - 15% (D)','5%-10% (D)','0%-5% (D)','0%-5% (R)','5%-10% (R)',
'10%-15% (R)','>15% (R)'];
div.innerHTML += '<b> Margin of Victory </b> <br>';
// loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
div.innerHTML +=
'<i style="background:' + getColor(grades[i]+0.01) + '"></i> ' +
gradeslabels[i] + (gradeslabels[i + 1] ? '<br>' : '');
}

return div;
};

legend.addTo(countymap);
//countymap.dragging.enable();
});
}