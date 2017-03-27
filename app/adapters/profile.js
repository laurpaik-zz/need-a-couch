import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  createRecord (store, type, record) {
    let api = this.get('host');
    let serialized = this.serialize(record, { includeId: true});
    let url = `${api}/sign-up`;
    let data = { credentials: serialized,
                 profile: serialized };

    return this.ajax(url, 'POST', { data });
  }
});
