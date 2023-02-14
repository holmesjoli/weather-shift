
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

//
function addTerms(data) {
    let container = d3.select("#drag-container");

    let groups = container.selectAll("div")
        .data(data)
        .join("g")
        .attr("class", "drag-item")
        .attr("id", d => "drag"+d.id)
        .attr("draggable", "true")
        .attr("ondragstart", "drag(event)");

    groups
        .append("img")
        .attr("src", d => `assets/images/ccef/${d.gif}.gif`)

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