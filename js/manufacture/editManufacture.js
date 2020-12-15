window.onload = function () {
    document.getElementById("name").value = localStorage.getItem('name');
    document.getElementById("country").value = localStorage.getItem('country');
    document.getElementById("founded").value = localStorage.getItem('founded');
}

$("#btnEdit").click(function (event) {
    event.preventDefault();

    let id = localStorage.getItem('id');
    var data = {};

    data._id = id;
    data.name = document.getElementById("name").value;
    data.country = document.getElementById("country").value;
    data.founded = document.getElementById("founded").value;
    deleteManufacture(id);

});

function create() {
    var data = {};

    data.name = document.getElementById("name").value;
    data.country = document.getElementById("country").value;
    data.founded = document.getElementById("founded").value;

    $.ajax({
        type: 'POST',
        url: "https://webtechcars.herokuapp.com/api/manufacturers",
        data: JSON.stringify(data),
        error: function (e) {
            console.log(e);
        },
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            201: handle201,
        },
    });

    document.getElementById("name").value = null;
    document.getElementById("country").value = null;
    document.getElementById("founded").value = null;
};
var handle201 = function () {
    alert('Sikeres módosítás.');
    window.location.href = 'manufacture.html'
};

function deleteManufacture(id) {
    var data = {};
    let url = `https://webtechcars.herokuapp.com/api/manufacturers/${id}`;
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

var handle200 = function () {
    create();
};