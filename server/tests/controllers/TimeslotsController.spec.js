var Sails = require('sails'),
    assert = require('chai').assert;

before(function(done) {

    // Lift Sails and start the server
    Sails.lift({

        log: {
            level: 'error'
        },

    }, function(err, sails) {
        app = sails;
        done(err, sails);
    });
});

// Global after hook
after(function(done) {
    app.lower(done);
});

describe('The fixture timeslot models', function() {
    describe('after the app is bootstrapped', function() {
        it('should show three timeslot records', function(done) {
            // console.log('ts: ' + JSON.stringify(Timeslots, null, 4));
            Timeslots.find().exec(function(err, timeslots) {
                if (err) assert(false);

                assert.lengthOf(timeslots, 3, 'timeslots` value has a length of 3');
                done();
            });
        });
    });
});;