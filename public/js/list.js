$('.complete').on('click', function (e) {
    var id = $(e.target).attr('data-num').substr(1, $(e.target).attr('data-num').length - 2);
    var xhr = new XMLHttpRequest();
    var form = new FormData();
    form.append('_id', id);
    xhr.open('post', 'http://localhost/handle/history');
    xhr.send(form);
    xhr.onload = function () {
        if (xhr.status == 200) {
            if (xhr.responseText == 'ok') {
                $('#his').append($(e.target).parent().parent());
                $(e.target).parent().parent().remove();
                location.reload();
            }
        }
    }
})
$('#delete').on('click', function (e) {
    var id = $(e.target).attr('data-num').substr(1, $(e.target).attr('data-num').length - 2);
    var xhr = new XMLHttpRequest();
    var form = new FormData();
    form.append('_id', id);
    xhr.open('post', 'http://localhost/handle/delete');
    xhr.send(form);
    xhr.onload = function () {
        if (xhr.status == 200) {
            if (xhr.responseText == 'ok') {
                $(e.target).parent().parent().remove();
            }
        }
    }
})