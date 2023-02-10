function updateDate() {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    var today = new Date();
    var dd = today.getDate();
    var yyyy = today.getFullYear();

    let day = weekday[today.getDay()];
    let month = months[today.getMonth()]

    d3.select("#date").text(`${day}, ${month} ${dd} ${yyyy}`)
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

updateDate();