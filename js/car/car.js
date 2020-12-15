let cars = [];

$(document).ready(function () {

    loadDataSource();

});
function refresh() {

    $("#table").load("index.html #table");
    loadDataSource();

}

function loadDataSource() {

    $.getJSON("https://webtechcars.herokuapp.com/api/cars",
        function (data) {
            cars = data;
            let car = '';
            $('#table').append(
                '<tr>' +
                ' <th th > Név</th >' +
                '<th>Fogyasztás</th>' +
                '<th>Szín</th>' +
                '<th>Gyártó</th>' +
                ' <th>Elérhető (db)</th>' +
                '<th>Évjárat</th>' +
                ' <th>Lóerő</th>' +
                '<th>Módosítás</th>' +
                '<th>Törlés</th>' +
                '</tr >'
            )
            $.each(data, function (key, value) {
                car += '<tr>';
                car += '<td>' + value.name + '</td>';
                car += '<td>' + value.consumption + '</td>';
                car += '<td>' + value.color + '</td>';
                car += '<td>' + value.manufacturer + '</td>';
                car += '<td>' + value.available + " db" + '</td>';
                car += '<td>' + value.year + '</td>';
                car += '<td>' + value.horsepower + '</td>';
                car += '<td><button class="bluebutton" onclick="onEdit(' + key + ')">Módosítás</button></td>';
                car += '<td><button class="redbutton" onclick="onDelete(' + key + ')">Törlés</button></td>';
                car += '</tr>';
            });
            $('#table').append(car);
        });
}

function onEdit(i) {
    localStorage.clear();
    localStorage.setItem('id', cars[i]._id);
    localStorage.setItem('name', cars[i].name);
    localStorage.setItem('consumption', cars[i].consumption);
    localStorage.setItem('color', cars[i].color);
    localStorage.setItem('manufacturer', cars[i].manufacturer);
    localStorage.setItem('available', cars[i].available);
    localStorage.setItem('year', cars[i].year);
    localStorage.setItem('horsepower', cars[i].horsepower);
    window.location = "html/car/editCar.html";
}

function onDelete(index) {
    let id = cars[index]._id;
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
            200: setTimeout(function handle200() {
                alert('Sikeres törlés');
                refresh();
            }, 1000),
        },
    });

}