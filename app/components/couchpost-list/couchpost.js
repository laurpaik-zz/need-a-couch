import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  actions: {
    delete () {
      this.sendAction('delete', this.get('couchpost'));
    }
  },
});
