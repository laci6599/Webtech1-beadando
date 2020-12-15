window.onload = function () {
    document.getElementById("name").value = localStorage.getItem('name');
    document.getElementById("manufacturer").value = localStorage.getItem('manufacturer');
    document.getElementById("consumption").value = localStorage.getItem('consumption');
    document.getElementById("color").value = localStorage.getItem('color');
    document.getElementById("available").value = Number(localStorage.getItem('available'));
    document.getElementById("year").value = Number(localStorage.getItem('year'));
    document.getElementById("horsepower").value = Number(localStorage.getItem('horsepower'));
}

$.getJSON("http://webtechcars.herokuapp.com/api/manufacturers",
    function (manufactures) {

        let dropdown = document.getElementById("manufacturer");
        let option;
        option = document.createElement("option");
        option.value = localStorage.getItem('manufacturer');
        option.text = localStorage.getItem('manufacturer');
        dropdown.appendChild(option);
        for (var i = 0; i < manufactures.length; i++) {
            option = document.createElement("option");
            option.value = manufactures[i].name;
            option.text = manufactures[i].name;
            dropdown.appendChild(option);
        }
    });

$("#btnEdit").click(function (event) {
    event.preventDefault();

    let id = localStorage.getItem("id");

    var data = {};

    data._id = id;
    data.name = document.getElementById("name").value;
    data.manufacturer = document.getElementById("manufacturer").value;
    data.consumption = document.getElementById("consumption").value;
    data.color = document.getElementById("color").value;
    data.available = document.getElementById("available").value;
    data.year = document.getElementById("year").value;
    data.horsepower = document.getElementById("horsepower").value;
    deleteCar(id);
});
function deleteCar(id) {

    var data = {};
    let url = `https://webtechcars.herokuapp.com/api/cars/${id}`;
    $.ajax({
        url: url,
        type: 'DELETE',
        data: JSON.stringify(data),
        error: function (e) {
            console.log(e);
        },
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            200: handle200,
        },
    });

}
function create() {

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
};
var handle201 = function () {
    alert('Sikeres módosítás.');
    window.location.href = '../../index.html'
};
var handle200 = function () {
    create();

};