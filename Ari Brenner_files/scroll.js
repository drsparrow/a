$(function(){
  var sections = [$('.top'), $('.skills'), $('.projects'), $('.contact')]

  var scrollChange = function () {
    var scroll = $(document).scrollTop();
    var offsetScroll = scroll + 3*$('header').outerHeight(); // just below header
    chooseSelected(offsetScroll)
  }

  var chooseSelected = function (y) {
    for(var i = sections.length - 1; i >= 0; i-- ) {
      if ( y >= sections[i].offset().top) {
        changeSelected(i)
        return
      }
    }
  }

  var changeSelected = function (idx) {
    for (var i = 0; i < sections.length; i ++ ){
      var selector = '#nav-links a:nth-child('+(1+i)+')';
      i == idx ? $(selector).addClass('selected ') : $(selector).removeClass('selected')
    }
  }

  $(document).scroll(scrollChange)
  $(scrollChange)
})
