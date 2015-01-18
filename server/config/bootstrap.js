/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

function addFixturesToDb() {
	console.log('[bootstrap] Fixtures ...');

	var timeslots = [];

	timeslots.push({
		date: '2015-01-07',
		start: '2015-01-07T09:01:14',
		end: '2015-01-07T10:32:44',
		tags: ['general'],
		description: 'Mails'
	});

	timeslots.push({
		date: '2015-01-07',
		start: '2015-01-07T10:32:44',
		end: '2015-01-07T12:32:44',
		tags: ['meeting'],
		description: 'Weekly jour fixe meeting'
	});

	timeslots.push({
		date: '2015-01-07',
		start: '2015-01-07T12:32:44',
		end: '2015-01-07T13:00:44',
		tags: ['break'],
		description: 'Lunch'
	});

	for (var idx = 0; idx < timeslots.length; idx++) {
		var timeslot = timeslots[idx];

		Timeslots.create(timeslot, function(err, record) {
			record.save(function() {
				console.log('Created timeslot for date: ' + record.description);
			});
		});
	};
}

module.exports.bootstrap = function(cb) {

	Timeslots.find().exec(function(err, timeslots) {
		// console.log('timeslots: ' + JSON.stringify(timeslots, null, 4));

		if (timeslots.length) {
			console.log('[bootstrap] ... already created.')
			return cb();
		}

		addFixturesToDb();
		cb();
	});
};