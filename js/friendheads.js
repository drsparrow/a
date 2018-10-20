$(function () {
    setTimeout(function () {
        var ariHeads = new Friendheads('ari');

        ariHeads.opacity(0);
        ariHeads.add(2);

        setTimeout(function () {
            ariHeads.opacity(1);
        }, 2000);

        $('.more-ari, .ari-face').click(function () {
            ariHeads.add();
            return false;
        });

    }, 1000);
});