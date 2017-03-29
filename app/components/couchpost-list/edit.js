import Ember from 'ember';
export default Ember.Component.extend({

  actions: {
    save () {
      let date = new Date (this.get('couchpost.dateNeeded'));
      this.set('couchpost.dateNeeded', date);
      this.sendAction('save', this.get('couchpost'));
    },
    cancel () {
      this.get('couchpost').rollbackAttributes();
      this.sendAction('cancel');
    },
  },
});
