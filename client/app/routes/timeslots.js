import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.find('timeslot');
	},

	setupController: function(controller, model) {
		controller.set('timeslots', model); // transform the model into something semantically richer...
		controller.set('model', model);
	}
});
