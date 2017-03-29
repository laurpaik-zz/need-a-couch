import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  auth: Ember.inject.service(),
  userId: JSON.parse(window.localStorage.getItem('storage:auth')).id,
  location: DS.attr('string'),
  dateNeeded: DS.attr('date'),
  couchFound: DS.attr('string'),
  profileId: DS.attr('number'),
  profile: DS.belongsTo('profile'),
  editable: DS.attr('boolean'),
});
