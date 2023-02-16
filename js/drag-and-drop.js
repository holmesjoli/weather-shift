
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data)
    ev.target.appendChild(document.getElementById(data));
}

// shuffle Array
// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//
function addTerms(data) {
    let container = d3.select("#drag-container");

    let rowi = Array(data.length).fill(0).map(Number.call, Number);
    shuffleArray(rowi)

    let data2 = []
    for (let i of rowi) {
        data2.push(data[i])
    }

    let groups = container.selectAll("div")
        .data(data2)
        .join("g")
        .attr("class", "drag-item")
        .attr("id", d => "drag"+d.id)
        .attr("draggable", "true")
        .attr("ondragstart", "drag(event)");

    // console.log(data)
    groups
        .append("img")
        .attr("src", d => `assets/images/${d.folder}/${d.gif}.gif`)

    groups
        .append("div")
        .attr("class", "term-name")
        .text(d => d.name);
}

//
function addDefinitions(data) {

    let container = d3.select("#drop-container");

    let groups = container.selectAll("div")
        .data(data)
        .join("g")
        .attr("class", "drop-item")

    groups
        .append("p")
        .attr("class", "term-description")
        .text(d => d.description);

    groups
        .append("div")
        .attr("class", "drop")
        .attr("ondrop", "drop(event)")
        .attr("ondragover", "allowDrop(event)");
}

function main() {

    d3.csv("data/terms.csv").then(function (data) {

        addTerms(data);
        addDefinitions(data);
    
    });
}

main();