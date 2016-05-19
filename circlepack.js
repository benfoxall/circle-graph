const fns = require('./lib/circle.fns.js')


function fill(arr, v) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = v
  }
}

const circlepack = (circles) => {
  var ys = new Array(circles.length)

  fill(ys, 0)

  var a,b,intersectors

  for (var i = 0; i < circles.length; i++) {

    // place this circle
    a = circles[i]

    // find the constraints for the circle
    var intersectors = []
    for (var j = 0; j < i; j++) {
      b = circles[j]
      if(possibleIntersect(
        a.x, a.r,
        b.x, b.r
      )) {
        // console.log(">>>>" , fns.constraints(b.x, ys[j], b.r, a.x, a.r))
        intersectors.push(
          fns.constraints(b.x, ys[j], b.r, a.x, a.r)
        )
      }
    }

    //
    if(intersectors.length) {
      intersectors = fns.combine(intersectors)

      var match = intersectors.filter(m =>
        ys[i] > m[0] && ys[i] < m[1]
      )[0]

      // it can't be where it should, so
      // move it to the closest possible
      if(match) {

        ys[i] = Math.abs(match[0] - ys[i]) < Math.abs(match[1] - ys[i]) ?
                match[0] : match[1]

      }

    }

  }

  return ys


}

function possibleIntersect(x1, r1, x2, r2) {
  return x1 - r1 < x2 + r2 &&
         x1 + r1 > x2 - r2
}



module.exports = circlepack
