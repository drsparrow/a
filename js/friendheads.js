$(function () {

    var ariHeads = new Friendheads('ari');

    ariHeads.add(3);

    $('.ari-face').click(function () {
        ariHeads.add();
    });

});