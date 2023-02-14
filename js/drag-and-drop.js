
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

function addDefinitions() {

    let container = d3.select("#drop-container");

    d3.csv("data/terms.csv").then(function (data) {
        console.log(data)

        let groups = container.selectAll("div")
            .data(data)
            .join("g")
            .attr("class", "drop-item")

        groups
            .append("p")
            .attr("class", "term-description")
            .text(d => d.description)

        groups
            .append("div")
            .attr("class", "drop")
            .attr("ondrop", "drop(event)")
            .attr("ondragover", "allowDrop(event)")
    });

}

addDefinitions();