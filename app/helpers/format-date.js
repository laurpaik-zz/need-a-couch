import Ember from 'ember';

export function formatDate(params) {
  let day = params.toString();
  return day.slice(0, 15);
}

export default Ember.Helper.helper(formatDate);
