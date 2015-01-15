var App = require('../scripts/app.js');

describe('App', function() {
    var app = new App();
    it('should have a start function', function() {
        expect(app.start).toBeDefined();
    });

    describe('app.start', function() {
        beforeEach(function() {
            app.start();
        });

        // it('should have a views object', function() {
        //     expect(App.views).toBeDefined();
        // });
    });
});
