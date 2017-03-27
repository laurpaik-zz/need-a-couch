import DS from 'ember-data';

export default DS.Model.extend({
  location: DS.attr('string'),
  dateNeeded: DS.attr('date'),
  couchFound: DS.attr('string'),
});
