$("#btnCreate").click(function (event) {

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
    });

    event.preventDefault();

    document.getElementById("name").value = null;
    document.getElementById("country").value = null;
    document.getElementById("founded").value = null;

});