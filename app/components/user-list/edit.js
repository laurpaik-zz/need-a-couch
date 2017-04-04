import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save () {
      let date = new Date (this.get('profile.dob'));
      this.set('profile.dob', date);
      console.log(this.get('profile'), 'PROFILE');
      this.sendAction('save', this.get('profile'));
    },
    cancel () {
      this.get('profile').rollbackAttributes();
      this.sendAction('cancel');
    },
  },
});
