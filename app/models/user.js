import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  profile: DS.hasOne('profile', { async: true }),
  couchposts: DS.hasMany('couchpost', { async: true })
});
