$(function(){

  var Headface = function(domObject){
    this.jqueryObject = $(domObject)
    this.width = this.jqueryObject.width()
    this.height = this.jqueryObject.height()
    this.perimeter = this.width + this.height
    this.seed = Math.random()
    Headface.headfaces.push(this)
  }

  Headface.multiplier = 2
  Headface.headfaces = []

  Headface.last = function () {
    var arr = Headface.headfaces;
    return arr[arr.length - 1];
  }

  Headface.moveAll = function () {
    Headface.headfaces.forEach(function(cart) { cart.react() })
  }

  Headface.prototype.left = function () { return this.jqueryObject.position().left }
  Headface.prototype.top = function () { return this.jqueryObject.position().top }
  Headface.prototype.centerX = function () { return this.left() + this.width/2 }
  Headface.prototype.centerY = function () { return this.top() + this.height/2 }

  Headface.prototype.move = function() {
    if(!this.canMove()) { return }
    this.jqueryObject.css('left', this.left() + this.compareX())
    this.jqueryObject.css('top', this.top() + this.compareY())
  }

  Headface.prototype.react = function () {
    this.resize();
    if(mouseX && mouseY) { this.move(); }
  };

  Headface.prototype.resize = function () {
    var d = new Date();
    var n = d.getMilliseconds();
    var change = Math.sin((n/1000)*(2*Math.PI) + this.seed)
    var changeTo = this.width + (change * Math.pow(Headface.multiplier,2))
    this.jqueryObject.width(changeTo)
    this.jqueryObject.height(changeTo)
  }

  Headface.prototype.canMove = function () {
    var headfaces = Headface.headfaces
    for(var i = 0; i < headfaces.length; i++){
      var other = headfaces[i]
      if (other.perimeter < this.perimeter) {
        if (this.overlappingSmaller(other)) { return false  }
      }
    }
    return true
  };

  Headface.prototype.overlappingSmaller = function(other) {
    return (Math.abs(other.centerX() - this.centerX()) < other.width/2 &&
            Math.abs(other.centerY() - this.centerY()) < other.height/2)
  }

  Headface.prototype.compareX = function() {
    var diff = this.left() + this.width/2 - mouseX
    if (Math.abs(diff) < this.width/2) { return 0 }
    var dir = ((diff < 0) ? 1 : -1)
    this.maybeFlip(dir)
    return this.distanceFromDir(dir)
  }

  Headface.prototype.compareY = function() {
    var diff = this.top() + this.height/2 - mouseY
    if (Math.abs(diff) < this.height/2) { return 0 }
    var dir = ((diff < 0) ? 1 : -1)
    return this.distanceFromDir(dir)
  }

  Headface.prototype.maybeFlip = function (dir) {
    if (dir == 1) {
      this.jqueryObject.addClass('flipped')
    } else {
      this.jqueryObject.removeClass('flipped')
    }
  }

  Headface.prototype.distanceFromDir = function(dir) {
    return (dir + dir*400/this.perimeter)/2
  }

  var mouseX, mouseY;
  var $followers = $('.follower')
  $followers.each(function() { new Headface(this) })

  var $addition = $('.js-addition')
  var flopped = false
  var $headfaceHeadsContent = $('.headface-heads-content')

  $addition.click(function(){
    var size = Headface.last() ? Headface.last().width * 3/4 : 380
    if(size <= 20) {
      $addition.addClass('disabled')
      return
    }
    var $newHeadface = $('<img>', {class: "follower", src:"js-image/cart0.png"})
    if (flopped) { $newHeadface.addClass('flopped') }
    $newHeadface.width(size)
    $newHeadface.height(size)

    $headfaceHeadsContent.append($newHeadface)
    new Headface($newHeadface)
  })

  $(document).mousemove(function(e){
    if(!$headfaceHeadsContent.is(':hover')) { return }
    var offset = $headfaceHeadsContent.offset()
    mouseX = e.clientX - offset.left + $(document).scrollLeft()
    mouseY = e.clientY - offset.top + $(document).scrollTop()
  })

  $('.js-flop').click(function(){
    flopped = !flopped
    if (flopped) {
      $('img.follower').addClass('flopped')
    } else {
      $('img.follower').removeClass('flopped')
    }
  })

  $('.js-multiplier').on('input', function(){
    Headface.multiplier = this.value
  })

  $('.js-remove-border').click(function(){
    $headfaceHeadsContent.css('border-color', 'transparent')
    $(this).addClass('disabled')
  })

  setInterval(Headface.moveAll, 10)

})
