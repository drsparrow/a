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
    };

    $(document).mousemove(moveContainer);

    var email = atob("YXJpYnJlbm5lckBnbWFpbC5jb20=");

    $(".contact-me-link").click(function () {
        alert("Email me: " + email);
        return false;
    });

    console.log("%c " + email, "color: blue; font-size: 30px;");
});