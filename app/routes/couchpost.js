import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('couchpost', params.couchpost_id)
    // .then(() => JSON.stringify(this.get('store').findRecord('profile')))
    ;
  }
});
