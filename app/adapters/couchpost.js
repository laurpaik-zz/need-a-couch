import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  createRecord (store, type, record) {
    let api = this.get('host');
    let serialized = this.serialize(record, { includeId: true});
    let url = `${api}/couchposts`;
    let data = { couchpost: serialized };

    return this.ajax(url, 'POST', { data });
  }
});
