function animate(obj, target, fun) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var tem = (target - window.pageYOffset) / 10;
        var step = tem > 0 ? Math.ceil(tem) : Math.floor(tem);
        if (window.pageYOffset == target) {
            clearInterval(obj.timer);
            fun && fun();
        }
        //obj.style.top = obj.offsetTop + step + 'px';
        window.scroll(0, window.pageYOffset + step)

    }, 15)
}