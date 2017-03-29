import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save () {
      let date = new Date (this.get('couchpost.dateNeeded'));
      let profileId = this.get('couchpost.userId');
      this.set('couchpost.profileId', profileId);
      this.set('couchpost.dateNeeded', date);
      this.sendAction('save', this.get('couchpost'));
    },
    cancel () {
      this.get('couchpost').rollbackAttributes();
      this.sendAction('cancel');
    },
  },
});
