import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  // model () {
  //   return this.get('store').createRecord('couchpost', {});
  // },

  actions: {
    createCouchpost(couchpost) {
      console.log(couchpost);
      couchpost.save()
      .then(() => this.transitionTo('couchposts'));
    },
    cancel () {
      history.back();
    }
  },
});
