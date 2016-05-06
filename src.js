var canvas = document.createElement('canvas')
var w = canvas.width = window.innerWidth
var h = canvas.height = window.innerHeight

document.body.appendChild(canvas)

var ctx = canvas.getContext('2d')

var circles = []

function add(x, r) {
  var y = h/2
  var target = y

  function find(Y, lower) {
    var intersectors = circles.filter(
      c => intersect(c.x,c.y,c.r,x,Y,r)
    )

    if(!intersectors.length) return Y

    var [low,high] = intersectors
      .map(
        c => ys(c.x,c.y,c.r,x,Y,r)
      )
      .reduce(
        ([a,b], [a1,b1]) => [
          Math.min(a,a1), Math.max(b, b1)
        ],
        [Y,Y]
      )

    return lower ? find(low, true) : find(high)

  }


  low = find(y, true)
  high = find(y)
  y = (Math.abs(low - y) < Math.abs(high - y)) ?
    low : high


  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI*2)

  ctx.lineWidth = 3

  ctx.stroke()
  // ctx.fill()


  circles.push({
    x: x,
    y: y,
    r: r
  })
}


// add(50, 5)
// add(100, 6)
// add(150, 10)
// add(155, 15)
// add(170, 12)
// add(180, 12)
// add(190, 12)
// add(195, 12)

// ctx.fillStyle = '#fff'

// for(var i = 0; i < 1000; i++) {
//
//   add((1 - (Math.random() * Math.random())) * w, (Math.random() * 5) + 1)
// }

// for(var i = 0; i < w; i+= 3) {
//   add(i, 12)
//   add(i, 14)
//   add(i, 5)
// }
//
// for(var i = 0; i < w; i+= 7) {
//   add(i, 5)
// }
//
// for(var i = 0; i < w; i+= 12) {
//   add(i, 3)
// }
//
//
//
for(var i = 0; i < w; i += Math.random() * 4) {
  setTimeout(function(i){
    add(i, (Math.random() * 10) + 2)
  }, i * 2, i)
}

// function r(w) {
//   Math.random() * Math.random()
//
// }


function intersect(x1, y1, r1, x2, y2, r2) {
  return Math.sqrt(
    Math.pow(x1 - x2, 2) +
    Math.pow(y1 - y2, 2)
  ) < r1 + r2
}

// find the points that y2 would have to be
// so that the circle doesn't touch others
// TODO: there is an equation for this
function ysIter(x1, y1, r1, x2, y2, r2) {
  if(!intersect(x1, y1, r1, x2, y2, r2))
    return null

  var ymin = y2, ymax = y2

  var step = r2 / 30

  while(intersect(x1, y1, r1, x2, ymin, r2))
    ymin -= step

  while(intersect(x1, y1, r1, x2, ymax, r2))
    ymax += step


  return [ymin,ymax]

}



function ys(x1, y1, r1, x2, y2, r2) {
  // if(!intersect(x1, y1, r1, x2, y2, r2))
  //   return null

  var x = x2 - x1,
      r = r1 + r2,
      y = Math.abs(Math.sqrt((x*x) + (r*r)))
  return [y1 - y, y1 + y]
}

//
console.log(ys(0,0,5,5,5,10))
console.log(ysIter(0,0,5,5,5,10))





/*
  retweets as lines
comments as lines
*/
