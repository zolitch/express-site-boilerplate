var Carousel = require('./carousel.js');

describe('Carousel', function() {
    var carousel = new Carousel(2,3);
    it('should have an add function', function() {
        expect(carousel.add).toBeDefined();
    });
    describe('Carousel functionality', function() {
        it('should expect pass values to equal 5', function() {
            expect(carousel.add()).toEqual(5);
        });
    });
});
