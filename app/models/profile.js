import DS from 'ember-data';

export default DS.Model.extend({
  givenName: DS.attr('string'),
  surname: DS.attr('string'),
  gender: DS.attr('string'),
  dob: DS.attr('date'),
  couchposts: DS.hasMany('couchpost', { async: true }),
  user: DS.belongsTo('user'),
});
