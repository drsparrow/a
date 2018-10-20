$(function () {
    var $container = $('.contact-me');

    var moveContainer = function (event) {
        if ($container.is(':hover')) {
            $container.position({
                my: "left-1 bottom+1",
                of: event,
                collision: "flipfit"
            });
            setTimeout(moveContainer);
        }
        return false;
    };

    $(document).mousemove(moveContainer);

    var email = atob("YXJpYnJlbm5lckBnbWFpbC5jb20=");

    $(".contact-me-link").click(moveContainer);

    var log = function (message, style) {
        setTimeout(console.log.bind(console, "\n%c " + message, style));
    };

    log('Email me:', "font-size: 18px; font-weight: bold;");
    log(email, "color: green; font-size: 30px; font-weight: bold;");
});