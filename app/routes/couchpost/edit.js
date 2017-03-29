import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveCouchpost (couchpost) {
      couchpost.save()
      .then(() => this.transitionTo('couchposts'));
    },

    cancel () {
      history.back();
    }
  },
});
