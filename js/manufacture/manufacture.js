let manufactures = [];

$.getJSON("http://webtechcars.herokuapp.com/api/manufacturers",
    function (data) {

        manufactures = data;
        loadDataSource(data);

    });

function refresh() {

    $("#table").load("# #table");
    loadDataSource();

}

function loadDataSource(data) {

    $.getJSON("http://webtechcars.herokuapp.com/api/manufacturers",
        function (data) {
            manufactures = data;
            var manufacture = '';
            $('#table').append(
                '<tr>' +
                ' <th th > Név</th >' +
                '<th>Ország</th>' +
                ' <th>Alapítva</th>' +
                '<th>Módosítás</th>' +
                '<th>Törlés</th>' +
                '  </tr > '
            )
            $.each(data, function (key, value) {
                manufacture += '<tr>';
                manufacture += '<td>' + value.name + '</td>';
                manufacture += '<td>' + value.country + '</td>';
                manufacture += '<td>' + value.founded + '</td>';
                manufacture += '<td><button class="bluebutton" onclick="onEdit(' + key + ')">Módosítás</button>';
                manufacture += '<td><button class="redbutton" onclick="onDelete(' + key + ')">Törlés</button></td>';
                manufacture += '</tr>';
            });
            $('#table').append(manufacture);
        });
}

function onEdit(index) {
    localStorage.clear();
    localStorage.setItem('id', manufactures[index]._id);
    localStorage.setItem('name', manufactures[index].name);
    localStorage.setItem('country', manufactures[index].country);
    localStorage.setItem('founded', manufactures[index].founded);
    window.location = "editManufacture.html";
}

function onDelete(index) {
    let id = manufactures[index]._id;
    var data = {};
    let url = `https://webtechcars.herokuapp.com/api/manufacturers/${id}`;
    $.ajax({
        url: url,
        type: 'DELETE',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            200: setTimeout(function handle200() {
                alert('Sikeres törlés.');
                refresh();
            }, 1000),
        },
    });

}