$('.dropdown').on('click', function () {
    $('.dropdown-menu').stop().slideToggle();
})
$('.dropdown-toggle').on('blur', function () {
    $('.dropdown-menu').stop().slideUp();
})
$('#login').on('click', function () {
    $('.modal').show();
})
$('.cancelbtn').on('click', function () {
    $('.modal').hide();
})
$('#moveto').on('click', function () {
    animate(window, 440);
})