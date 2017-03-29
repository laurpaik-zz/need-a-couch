import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save () {
      this.sendAction('save', this.get('profile'));
    },
    cancel () {
      this.get('profile').rollbackAttributes();
      this.sendAction('cancel');
    },
  },
});
