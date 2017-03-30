import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signUp (credentials) {
      this.get('auth').signUp(credentials)
      .then(() => this.get('auth').signIn(credentials))
      .then(() => {
        credentials.password = null;
        credentials.email = null;
        credentials.passwordConfirmation = null;
        credentials.givenName = null;
        credentials.surname = null;
        credentials.gender = null;
        credentials.dob = null;
        this.transitionTo('application');
      })
      .then(() => {
        this.get('flashMessages')
        .success('Successfully signed-up! You have also been signed-in.');
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
  },
});
