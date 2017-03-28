import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').createRecord('couchpost', {});
  },

  actions: {
    createCouchpost(couchpost) {
      couchpost.save()
      .then(() => this.transitionTo('couchposts'));
    },
    cancel () {
      history.back();
    }
  },
});
