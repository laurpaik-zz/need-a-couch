import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveProfile (profile) {
      profile.save()
      .then(() => this.transitionTo('users'))
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Try again.');
      })
      ;
    },

    cancel () {
      history.back();
    }
  },
});
