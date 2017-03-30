import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  deserialize(serialized) {
    return moment.utc(serialized).format('MMMM Do YYYY');
  },

  serialize(deserialized) {
    return deserialized;
  }
});
