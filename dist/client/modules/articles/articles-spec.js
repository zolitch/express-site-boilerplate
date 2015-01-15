var Articles = require('./articles.js');

describe('Articles', function() {
    var articles = new Articles(2,3);
    it('should have an add function', function() {
        expect(articles.add).toBeDefined();
    });
    describe('Articles functionality', function() {
        it('should expect pass values to equal 5', function() {
            expect(articles.add()).toEqual(5);
        });
    });
});
