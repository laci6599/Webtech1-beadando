$.getJSON("http://webtechcars.herokuapp.com/api/manufacturers",
    
function (manufactures) {

        let dropdown = document.getElementById("manufacturer");
        let option;

        for (var i = 0; i < manufactures.length; i++) {
            option = document.createElement("option");
            option.value = manufactures[i].name;
            option.text = manufactures[i].name;
            dropdown.appendChild(option);
        }

    });

$("#btnCreate").click(function (event) {
    event.preventDefault();

    var data = {};

    data.name = document.getElementById("name").value;
    data.manufacturer = document.getElementById("manufacturer").value;
    data.consumption = document.getElementById("consumption").value;
    data.color = document.getElementById("color").value;
    data.available = document.getElementById("available").value;
    data.year = document.getElementById("year").value;
    data.horsepower = document.getElementById("horsepower").value;

    $.ajax({
        type: 'POST',
        url: "https://webtechcars.herokuapp.com/api/cars",
        data: JSON.stringify(data),
        statusCode: {
            201: handle201,
        },
        dataType: "json",
        contentType: "application/json",
    });


    document.getElementById("name").value = null;
    document.getElementById("manufacturer").value = null;
    document.getElementById("consumption").value = null;
    document.getElementById("color").value = null;
    document.getElementById("available").value = null;
    document.getElementById("year").value = null;
    document.getElementById("horsepower").value = null;

});

function handle201() {
    alert('Sikeres létrehozás.');
    window.location.href = '../../index.html'

};