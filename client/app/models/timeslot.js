import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  start: DS.attr('date'),
  end: DS.attr('date'),
  tags: DS.attr(),
  description: DS.attr('string'),
  comment: DS.attr('string')
});
