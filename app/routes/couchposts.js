import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('couchpost');
  },
  actions: {
    editCouchpost () {
      this.transitionTo('couchpost.edit');
    },
    deleteCouchpost (couchpost) {
      couchpost.destroyRecord()
      .then(() => this.transitionTo('couchposts'));
    },
  },
});
