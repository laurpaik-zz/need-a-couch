import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users', function() {});
  this.route('couchposts', function() {
    this.route('new');
  });
  this.route('couchpost', { path: '/couchposts/:couchpost_id' }, function() {
    this.route('edit');
  });

  this.route('user', { path: '/users/:profile_id' }, function() {
    this.route('edit');
  });
});

export default Router;
