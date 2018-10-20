$(function () {

    var ariHeads = new Friendheads('ari');

    ariHeads.add(2);

    $('.more-ari, .ari-face').click(function () {
        ariHeads.add();
        return false;
    });

});