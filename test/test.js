const expect = require('chai').expect
const circleFns = require('../lib/circle.fns.js')
const circlepack = require('../circlepack.js')

describe('Circle Pack', () => {
  describe('non intersecting circles', () => {
    var circles = [
      {x: 0, r: 5},
      {x: 10, r: 5},
      {x: 20, r: 2}
    ]

    it('should put them all at 0', () => {
      expect(circlepack(circles)).to.eql([0,0,0])
    })
  })

  describe('two circles', () => {
    var circles = [
      {x: 0, r: 2},
      {x: 4, r: 3}
    ]

    it('should put them all at 0', () => {
      expect(circlepack(circles)).to.eql([0,3])
    })
  })

  describe('three circles', () => {
    var circles = [
      {x: 0, r: 2},
      {x: 4, r: 3},
      {x: 4, r: 3}
    ]

    it('should fit them in', () => {
      expect(circlepack(circles)).to.eql([0,3,-3])
    })
  })



  describe('circles with same x', () => {
    var circles = [
      {x: 0, r: 1},
      {x: 0, r: 1},
      {x: 0, r: 1},
      {x: 0, r: 1},
      {x: 0, r: 1}
    ]

    it('should stack up', () => {
      expect(circlepack(circles)).to.eql([0, 2, -2, 4, -4])
    })
  })
})


describe('circleFns', () => {
  describe('intersect', () => {
    it('returns false for non-intersecting circles', () => {
      expect(circleFns.intersect(0,0,1, 2,0,1)).to.be.false
    })
    it('returns true for intersecting circles', () => {
      expect(circleFns.intersect(0,0,1.5, 2,0,1.3)).to.be.true
    })
  })

  describe('constraints', () => {
    it('gives null if there are no constraints made',  () => {
      expect(circleFns.constraints(0,0,1, 3,1)).to.equal(null)
    })

    it('gives +/- for simple case',  () => {
      expect(circleFns.constraints(0,0,3, 3,2)).to.eql([-4,4])
    })

    it('works for non-origin circles', () => {
      expect(circleFns.constraints(10,5,3, 13,2)).to.eql([1,9])
    })
  })

  describe('constraint intersect', () => {

    it('does basic intersect', function(){
      expect(circleFns.c_intersect([0,2],[1,3])).to.eql(true)
      expect(circleFns.c_intersect([0,2],[3,4])).to.eql(false)
    })

    it('works with bigger constraints', function(){
      expect(circleFns.c_intersect([5,100],[50,51])).to.eql(true)
    })

    it('works with exact constraints', function(){
      expect(circleFns.c_intersect([5,10],[10,15])).to.eql(true)
    })

  })

  describe('constraint reducer', () => {

    it('filters out non-constraints', () => {
      expect(circleFns.combine([null, [1,2], null]))
        .to.eql([[1,2]])
    })

    it('combines constraints', () => {
      expect(circleFns.combine([[1,2], [1.5,3]]))
        .to.eql([[1,3]])
    })

    it('doesnt combine constraints', () => {
      expect(circleFns.combine([[1,2], [5,7]]))
        .to.eql([[1,2], [5,7]])
    })

    it('combines mulitple constraints', () => {
      expect(circleFns.combine([
        [-1,2],
        [1,3],
        [2,5],
        [4,6],
      ]))
        .to.eql([[-1,6]])
    })

    it('leaves others be', () => {
      expect(circleFns.combine([
        [-1,2],
        [1,3],
        [100,200],
        [2,5],
        [4,6],
      ]))
        .to.eql([[100,200], [-1,6]])
    })
  })
})
