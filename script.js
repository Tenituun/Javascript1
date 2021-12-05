var drop = document.getElementById("selectTheater");
var timeTable = document.getElementById("timeTable");

var data = {};

const schedules = new URL("https://www.finnkino.fi/xml/Schedule/?nrOfDays=1")
var xhr = new XMLHttpRequest();

xhr.open("GET", schedules, true);  
xhr.send();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var xmlDoc = xhr.responseXML;
    
        var theaters = new Set();
        var showNodes = xmlDoc.getElementsByTagName("Show");

        for (var i = 0, il = showNodes.length; i < il; ++i) {
            var showNode    = showNodes[i];
            var showTitle   = showNode.getElementsByTagName("Title")[0].innerHTML;
            var showStart   = showNode.getElementsByTagName("dttmShowStart")[0].innerHTML;
            var showGenre   = showNode.getElementsByTagName("Genres")[0].innerHTML;
            var showTheater = showNode.getElementsByTagName("Theatre")[0].innerHTML;
            var showCover   = showNode.getElementsByTagName("EventSmallImagePortrait")[0].innerHTML;
            var showImage   = showNode.getElementsByTagName("EventSmallImageLandscape")[0].innerHTML;
        
            theaters.add(showTheater);

            if (!data[showTheater]) {
                data[showTheater] = {};
            }

            if (!data[showTheater][showTitle]) {
                data[showTheater][showTitle] = {}
                data[showTheater][showTitle]["Genres"] = showGenre;
                data[showTheater][showTitle]["Cover"] = showCover;
                data[showTheater][showTitle]["Image"] = showImage;
                data[showTheater][showTitle]["Times"] = []
            }

            data[showTheater][showTitle]["Times"].push(showStart);
        }

        for (var theater of theaters) {
            var option = new Option(theater, theater);
            drop.add(option);
        }
    }
}

function selected(theater) {
    var shows = data[theater];

    timeTable.innerHTML = "";

    for (var show in shows) {
        var title = show;
        var genre = shows[show]["Genres"];
        var times = shows[show]["Times"];
        var Cover = shows[show]["Cover"];
        var image = shows[show]["Image"];

        timeTable.innerHTML += "<p>" + title + ", " + genre + ", " + times.join(",") + "</p>";
        timeTable.innerHTML += "<img src='" + Cover + "'>";
    
    }
}