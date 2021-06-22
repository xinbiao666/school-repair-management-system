if ($('#p1')[0].checked == true) {
    $('#daly').css('display', 'flex').siblings('.lit').css('display', 'none');
}

$('#p1').focus(function () {
    $('#daly').css('display', 'flex').siblings('.lit').css('display', 'none');
});
$('#p2').focus(function () {
    $('#net').css('display', 'flex').siblings('.lit').css('display', 'none');
});
$('#p3').focus(function () {
    $('#water').css('display', 'flex').siblings('.lit').css('display', 'none')
})
$('#p4').focus(function () {
    $('#fire').css('display', 'flex').siblings('.lit').css('display', 'none');
});
$('#p5').focus(function () {
    $('#air').css('display', 'flex').siblings('.lit').css('display', 'none');
});
$('#p6').focus(function () {
    $('#window').css('display', 'flex').siblings('.lit').css('display', 'none');
});
$('#p7').focus(function () {
    $('#hot').css('display', 'flex').siblings('.lit').css('display', 'none');
});

var file = document.querySelector('#file');
var box = document.querySelector('#box');
var form = document.querySelector('#form');
var btn = document.querySelector('.normal');
var param = {};
file.onchange = function () {
    var formdata = new FormData();
    formdata.append('attrName', this.files[0]);
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost/handle/delinformationImg');
    xhr.send(formdata);
    xhr.onload = function () {
        if (xhr.status == 200) {
            var result = JSON.parse(xhr.responseText);
            var img = document.createElement('img');
            console.log(result.path);
            var path = 'http://localhost' + result.path.split('public')[1].replace('\ ', '/');
            param.path = path;
            img.src = path;
            img.style.height = 160 + 'px';
            img.style.width = 220 + 'px';
            img.onload = function () {
                box.appendChild(img);
            }
        }
    }
}
console.log($('#file').val())
btn.addEventListener('click', function () {
    if ($('input[name="dorm"]').val() == '') {
        alert('请输入必填信息！');
    } else if ($('input[name="littles"]').val() == '' || $('#file').val() == '' || $('textarea').val() == '') {
        alert('请输入必填信息！');
    } else {
        var userid = document.querySelector('#userid').innerText.split(':')[1].trim();
        var name = document.querySelector('#name').innerText.split(':')[1].trim();
        var phonenumber = document.querySelector('#phonenumber').innerText.split(':')[1].trim();
        var time = new Date().format("yyyy-MM-dd hh:mm:ss");
        var formdata = new FormData(form);
        formdata.append('userid', userid);
        formdata.append('name', name);
        formdata.append('phoneNumber', phonenumber);
        formdata.append('infordate', time);
        formdata.append('imgpath', param.path);
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost/handle/delinformation');
        xhr.send(formdata);
        xhr.onload = function () {
            if (xhr.status == 200) {
                if (xhr.responseText == 'ok') {
                    alert('提交成功!');
                    window.location = 'http://localhost/user/userindex'
                } else {
                    alert('提交失败,请重新填写!');
                }
            }
        }
    }
})

