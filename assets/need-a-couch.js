"use strict";



define('need-a-couch/adapters/application', ['exports', 'need-a-couch/config/environment', 'active-model-adapter', 'ember'], function (exports, _needACouchConfigEnvironment, _activeModelAdapter, _ember) {
  exports['default'] = _activeModelAdapter['default'].extend({
    host: _needACouchConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),

    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('need-a-couch/adapters/profile', ['exports', 'need-a-couch/adapters/application'], function (exports, _needACouchAdaptersApplication) {
  exports['default'] = _needACouchAdaptersApplication['default'].extend({
    createRecord: function createRecord(store, type, record) {
      var api = this.get('host');
      var serialized = this.serialize(record, { includeId: true });
      var url = api + '/sign-up';
      var data = { credentials: serialized,
        profile: serialized };

      return this.ajax(url, 'POST', { data: data });
    }
  });
});
define('need-a-couch/app', ['exports', 'ember', 'need-a-couch/resolver', 'ember-load-initializers', 'need-a-couch/config/environment'], function (exports, _ember, _needACouchResolver, _emberLoadInitializers, _needACouchConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _needACouchConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _needACouchConfigEnvironment['default'].podModulePrefix,
    Resolver: _needACouchResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _needACouchConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('need-a-couch/components/change-password-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    init: function init() {
      this._super.apply(this, arguments);
      this.set('passwords', {});
    },

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
      }
    }
  });
});
define('need-a-couch/components/couchpost-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('need-a-couch/components/couchpost-list/couchpost', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'li',
    actions: {
      'delete': function _delete() {
        this.sendAction('delete', this.get('couchpost'));
      }
    }
  });
});
define('need-a-couch/components/couchpost-list/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      save: function save() {
        var date = new Date(this.get('couchpost.dateNeeded'));
        this.set('couchpost.dateNeeded', date);
        this.sendAction('save', this.get('couchpost'));
      },
      cancel: function cancel() {
        this.get('couchpost').rollbackAttributes();
        this.sendAction('cancel');
      }
    }
  });
});
define('need-a-couch/components/email-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('need-a-couch/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('need-a-couch/components/hamburger-menu', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define('need-a-couch/components/my-application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      signOut: function signOut() {
        this.sendAction('signOut');
      }
    }
  });
});
define('need-a-couch/components/navbar-header', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['navbar-header']
  });
});
define('need-a-couch/components/password-confirmation-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('need-a-couch/components/password-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('need-a-couch/components/profile-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal']
  });
});
define('need-a-couch/components/sign-in-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('need-a-couch/components/sign-up-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    init: function init() {
      this._super.apply(this, arguments);
      this.set('credentials', {});
    },

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('need-a-couch/components/user-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('need-a-couch/components/user-list/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      save: function save() {
        var date = new Date(this.get('profile.dob'));
        this.set('profile.dob', date);
        this.sendAction('save', this.get('profile'));
      },
      cancel: function cancel() {
        this.get('profile').rollbackAttributes();
        this.sendAction('cancel');
      }
    }
  });
});
define('need-a-couch/components/user-list/user', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('need-a-couch/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('need-a-couch/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('need-a-couch/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('need-a-couch/helpers/app-version', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _needACouchConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _needACouchConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('need-a-couch/helpers/is-after', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/is-after'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersIsAfter) {
  exports['default'] = _emberMomentHelpersIsAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/is-before', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/is-before'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersIsBefore) {
  exports['default'] = _emberMomentHelpersIsBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/is-between', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/is-between'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersIsBetween) {
  exports['default'] = _emberMomentHelpersIsBetween['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/is-same-or-after', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/is-same-or-after'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersIsSameOrAfter) {
  exports['default'] = _emberMomentHelpersIsSameOrAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/is-same-or-before', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/is-same-or-before'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersIsSameOrBefore) {
  exports['default'] = _emberMomentHelpersIsSameOrBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/is-same', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/is-same'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersIsSame) {
  exports['default'] = _emberMomentHelpersIsSame['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-add', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/moment-add'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersMomentAdd) {
  exports['default'] = _emberMomentHelpersMomentAdd['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-calendar', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('need-a-couch/helpers/moment-format', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-from-now', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-from', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/moment-from'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersMomentFrom) {
  exports['default'] = _emberMomentHelpersMomentFrom['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-subtract', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/moment-subtract'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersMomentSubtract) {
  exports['default'] = _emberMomentHelpersMomentSubtract['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-to-date', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/moment-to-date'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersMomentToDate) {
  exports['default'] = _emberMomentHelpersMomentToDate['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-to-now', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-to', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/helpers/moment-to'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentHelpersMomentTo) {
  exports['default'] = _emberMomentHelpersMomentTo['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('need-a-couch/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define('need-a-couch/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _emberMomentHelpersMoment) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMoment['default'];
    }
  });
});
define('need-a-couch/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _emberMomentHelpersNow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersNow['default'];
    }
  });
});
define('need-a-couch/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('need-a-couch/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('need-a-couch/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define("need-a-couch/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('need-a-couch/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'need-a-couch/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _needACouchConfigEnvironment) {
  var _config$APP = _needACouchConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('need-a-couch/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('need-a-couch/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('need-a-couch/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('need-a-couch/initializers/export-application-global', ['exports', 'ember', 'need-a-couch/config/environment'], function (exports, _ember, _needACouchConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_needACouchConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _needACouchConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_needACouchConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('need-a-couch/initializers/flash-messages', ['exports', 'ember', 'need-a-couch/config/environment'], function (exports, _ember, _needACouchConfigEnvironment) {
  exports.initialize = initialize;
  var deprecate = _ember['default'].deprecate;

  var merge = _ember['default'].assign || _ember['default'].merge;
  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _needACouchConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('need-a-couch/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('need-a-couch/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('need-a-couch/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('need-a-couch/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});
define('need-a-couch/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("need-a-couch/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('need-a-couch/models/couchpost', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    location: _emberData['default'].attr('string'),
    dateNeeded: _emberData['default'].attr('custom-date'),
    couchFound: _emberData['default'].attr('boolean'),
    profile: _emberData['default'].belongsTo('profile', { async: true }),
    editable: _emberData['default'].attr('boolean')
  });
});
define('need-a-couch/models/profile', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    givenName: _emberData['default'].attr('string'),
    surname: _emberData['default'].attr('string'),
    gender: _emberData['default'].attr('string'),
    dob: _emberData['default'].attr('date'),
    couchposts: _emberData['default'].hasMany('couchpost'),
    user: _emberData['default'].belongsTo('user'),
    editable: _emberData['default'].attr('boolean')
  });
});
define('need-a-couch/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    profile: _emberData['default'].belongsTo('profile'),
    couchposts: _emberData['default'].hasMany('couchpost', { async: true })
  });
});
define('need-a-couch/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('need-a-couch/router', ['exports', 'ember', 'need-a-couch/config/environment'], function (exports, _ember, _needACouchConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _needACouchConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users', function () {});
    this.route('couchposts', function () {
      this.route('new');
    });
    this.route('couchpost', { path: '/couchposts/:couchpost_id' }, function () {
      this.route('edit');
    });

    this.route('user', { path: '/users/:profile_id' }, function () {
      this.route('edit');
    });
  });

  exports['default'] = Router;
});
define('need-a-couch/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.get('store').unloadAll();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
      },

      error: function error(reason) {
        var unauthorized = reason.errors && reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      }
    }
  });
});
define('need-a-couch/routes/change-password', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords).then(function () {
          return _this.get('auth').signOut();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('need-a-couch/routes/couchpost', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('couchpost', params.couchpost_id)
      // .then(() => JSON.stringify(this.get('store').findRecord('profile')))
      ;
    }
  });
});
define('need-a-couch/routes/couchpost/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    actions: {
      saveCouchpost: function saveCouchpost(couchpost) {
        var _this = this;

        couchpost.save().then(function () {
          return _this.transitionTo('couchposts');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Did you enter a date?');
        });
      },

      cancel: function cancel() {
        history.back();
      }
    }
  });
});
define('need-a-couch/routes/couchposts', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('couchpost');
    },
    actions: {
      deleteCouchpost: function deleteCouchpost(couchpost) {
        var _this = this;

        couchpost.destroyRecord().then(function () {
          return _this.transitionTo('couchposts');
        });
      }
    }
  });
});
define('need-a-couch/routes/couchposts/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('need-a-couch/routes/couchposts/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').createRecord('couchpost', {});
    },

    actions: {
      createCouchpost: function createCouchpost(couchpost) {
        var _this = this;

        couchpost.save().then(function () {
          return _this.transitionTo('couchposts');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Did you enter a date?');
        });
      },
      cancel: function cancel() {
        history.back();
      }
    }
  });
});
define('need-a-couch/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('need-a-couch/routes/sign-in', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return _rsvp['default'].Promise.resolve({});
    },

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('need-a-couch/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        this.get('auth').signUp(credentials).then(function () {
          return _this.get('auth').signIn(credentials);
        }).then(function () {
          credentials.password = null;
          credentials.email = null;
          credentials.passwordConfirmation = null;
          credentials.givenName = null;
          credentials.surname = null;
          credentials.gender = null;
          credentials.dob = null;
          _this.transitionTo('application');
        }).then(function () {
          _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('need-a-couch/routes/user', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('profile', params.profile_id);
    }
  });
});
define('need-a-couch/routes/user/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    actions: {
      saveProfile: function saveProfile(profile) {
        var _this = this;

        profile.save().then(function () {
          return _this.transitionTo('users');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Try again.');
        });
      },

      cancel: function cancel() {
        history.back();
      }
    }
  });
});
define('need-a-couch/routes/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('profile');
    }
  });
});
define('need-a-couch/routes/users/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('need-a-couch/serializers/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({});
});
define('need-a-couch/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'need-a-couch/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _needACouchConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _needACouchConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('need-a-couch/services/auth', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          },
          profile: {
            given_name: credentials.given_name || null,
            surname: credentials.surname || null,
            gender: credentials.gender || null,
            dob: credentials.dob || null
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    }
  });
});
define('need-a-couch/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('need-a-couch/services/moment', ['exports', 'ember', 'need-a-couch/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _needACouchConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_needACouchConfigEnvironment['default'], 'moment.outputFormat')
  });
});
define('need-a-couch/storages/auth', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define("need-a-couch/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ukHH7AME", "block": "{\"statements\":[[\"append\",[\"helper\",[\"my-application\"],null,[[\"signOut\"],[\"signOut\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/application.hbs" } });
});
define("need-a-couch/templates/change-password", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "+5oHtvwP", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"change-password-form\"],null,[[\"submit\"],[\"changePassword\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/change-password.hbs" } });
});
define("need-a-couch/templates/components/change-password-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "b/ms5T1K", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"previous\"],[\"flush-element\"],[\"text\",\"Old Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"previous\",\"Old password\",[\"get\",[\"passwords\",\"previous\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"next\"],[\"flush-element\"],[\"text\",\"New Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"next\",\"New password\",[\"get\",[\"passwords\",\"next\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Change Password\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/change-password-form.hbs" } });
});
define("need-a-couch/templates/components/couchpost-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "CPm+Pj4s", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/couchpost-list.hbs" } });
});
define("need-a-couch/templates/components/couchpost-list/couchpost", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "uBYJlEp5", "block": "{\"statements\":[[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"profile\",\"givenName\"]]],null,13],[\"block\",[\"if\"],[[\"get\",[\"profile\",\"givenName\"]]],null,6],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\" Edit \"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"couchpost.edit\",[\"get\",[\"couchpost\"]]],[[\"class\"],[\"btn btn-xs btn-primary\"]],0],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-xs btn-warning\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"delete\"]],[\"flush-element\"],[\"text\",\"Delete\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"append\",[\"unknown\",[\"profile\",\"givenName\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"profile\",\"surname\"]],false],[\"text\",\" needs a couch near \"],[\"append\",[\"unknown\",[\"couchpost\",\"location\"]],false],[\"text\",\" on \"],[\"append\",[\"unknown\",[\"couchpost\",\"dateNeeded\"]],false],[\"text\",\"!\\n\"],[\"block\",[\"if\"],[[\"get\",[\"couchpost\",\"editable\"]]],null,1]],\"locals\":[]},{\"statements\":[[\"text\",\" Edit \"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"couchpost.edit\",[\"get\",[\"couchpost\"]]],[[\"class\"],[\"btn btn-xs btn-primary\"]],3],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-xs btn-warning\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"delete\"]],[\"flush-element\"],[\"text\",\"Delete\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"append\",[\"unknown\",[\"profile\",\"givenName\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"profile\",\"surname\"]],false],[\"text\",\" found a couch near \"],[\"append\",[\"unknown\",[\"couchpost\",\"location\"]],false],[\"text\",\" for \"],[\"append\",[\"unknown\",[\"couchpost\",\"dateNeeded\"]],false],[\"text\",\"!\\n\"],[\"block\",[\"if\"],[[\"get\",[\"couchpost\",\"editable\"]]],null,4]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"couchpost\",\"couchFound\"]]],null,5],[\"block\",[\"unless\"],[[\"get\",[\"couchpost\",\"couchFound\"]]],null,2]],\"locals\":[]},{\"statements\":[[\"text\",\" Edit \"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"couchpost.edit\",[\"get\",[\"couchpost\"]]],[[\"class\"],[\"btn btn-xs btn-primary\"]],7],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-xs btn-warning\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"delete\"]],[\"flush-element\"],[\"text\",\"Delete\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      User \"],[\"append\",[\"unknown\",[\"profile\",\"id\"]],false],[\"text\",\" needs a couch near \"],[\"append\",[\"unknown\",[\"couchpost\",\"location\"]],false],[\"text\",\" on \"],[\"append\",[\"unknown\",[\"couchpost\",\"dateNeeded\"]],false],[\"text\",\"!\\n\"],[\"block\",[\"if\"],[[\"get\",[\"couchpost\",\"editable\"]]],null,8]],\"locals\":[]},{\"statements\":[[\"text\",\" Edit \"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"couchpost.edit\",[\"get\",[\"couchpost\"]]],[[\"class\"],[\"btn btn-xs btn-primary\"]],10],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-xs btn-warning\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"delete\"]],[\"flush-element\"],[\"text\",\"Delete\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      User \"],[\"append\",[\"unknown\",[\"profile\",\"id\"]],false],[\"text\",\" found a couch near \"],[\"append\",[\"unknown\",[\"couchpost\",\"location\"]],false],[\"text\",\" for \"],[\"append\",[\"unknown\",[\"couchpost\",\"dateNeeded\"]],false],[\"text\",\"!\\n\"],[\"block\",[\"if\"],[[\"get\",[\"couchpost\",\"editable\"]]],null,11]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"couchpost\",\"couchFound\"]]],null,12],[\"block\",[\"unless\"],[[\"get\",[\"couchpost\",\"couchFound\"]]],null,9]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/couchpost-list/couchpost.hbs" } });
});
define("need-a-couch/templates/components/couchpost-list/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3o/hOvCH", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"save\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"location\"],[\"flush-element\"],[\"text\",\"Location\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"maxlength\",\"required\",\"value\"],[\"text\",\"location\",\"Location\",\"20\",\"required\",[\"get\",[\"couchpost\",\"location\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"date_needed\"],[\"flush-element\"],[\"text\",\"When do you need the couch?\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"value\"],[\"date\",\"date_needed\",[\"get\",[\"couchpost\",\"dateNeeded\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"couch_found\"],[\"flush-element\"],[\"text\",\"Found a Couch?\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"value\",\"placeholder\"],[\"boolean\",\"couch_found\",[\"get\",[\"couchpost\",\"couchFound\"]],\"Leave this blank if you haven't found a couch yet!\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-info\"],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"action\",\"save\"],[\"static-attr\",\"value\",\"submit\"],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-xs btn-danger\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"cancel\"]],[\"flush-element\"],[\"text\",\"Cancel\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/couchpost-list/edit.hbs" } });
});
define("need-a-couch/templates/components/email-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "/lm2fM9B", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"email\",\"email\",\"Email\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/email-input.hbs" } });
});
define("need-a-couch/templates/components/hamburger-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "D0jFNtCU", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/hamburger-menu.hbs" } });
});
define("need-a-couch/templates/components/my-application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "+mkFl1Uz", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,9],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,6,4],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Need A Couch?\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"isAuthenticated\"]]],null,1],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8 col-md-offset-2\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Please create an account and sign in to tell everyone where you need to crash for a night!\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign In\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-up\"],null,3],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-in\"],null,2],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,5],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Couchposts\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Users\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"users\"],null,8],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"couchposts\"],null,7],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/my-application.hbs" } });
});
define("need-a-couch/templates/components/navbar-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "i3LVdaoc", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hamburger-menu\"]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"application\"],[[\"class\"],[\"navbar-brand\"]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/navbar-header.hbs" } });
});
define("need-a-couch/templates/components/password-confirmation-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "o9io6+k1", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password-confirmation\"],[\"flush-element\"],[\"text\",\"Password Confirmation\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password-confirmation\",\"Password Confirmation\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/password-confirmation-input.hbs" } });
});
define("need-a-couch/templates/components/password-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Z6GDxNn0", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"kind\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password\",\"Password\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/password-input.hbs" } });
});
define("need-a-couch/templates/components/profile-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "XQ98um0P", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"save\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"given_name\"],[\"flush-element\"],[\"text\",\"Given Name\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"maxlength\",\"placeholder\",\"value\"],[\"text\",\"given_name\",\"10\",\"Given Name\",[\"get\",[\"given_name\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"surname\"],[\"flush-element\"],[\"text\",\"Surname\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"maxlength\",\"placeholder\",\"value\"],[\"text\",\"surname\",\"10\",\"Surname\",[\"get\",[\"surname\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"gender\"],[\"flush-element\"],[\"text\",\"Gender\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"maxlength\",\"placeholder\",\"value\"],[\"text\",\"gender\",\"10\",\"Gender\",[\"get\",[\"gender\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"dob\"],[\"flush-element\"],[\"text\",\"Date of Birth\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"data-provide\",\"value\"],[\"date\",\"dob\",\"Date of Birth\",\"datepicker\",[\"get\",[\"dob\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/profile-form.hbs" } });
});
define("need-a-couch/templates/components/sign-in-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "+DcEGSi4", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign In\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/sign-in-form.hbs" } });
});
define("need-a-couch/templates/components/sign-up-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "AuCWmtlC", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-confirmation-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"passwordConfirmation\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"profile-form\"],null,[[\"given_name\",\"surname\",\"gender\",\"dob\"],[[\"get\",[\"credentials\",\"given_name\"]],[\"get\",[\"credentials\",\"surname\"]],[\"get\",[\"credentials\",\"gender\"]],[\"get\",[\"credentials\",\"dob\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign Up\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/sign-up-form.hbs" } });
});
define("need-a-couch/templates/components/user-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "0NuzQhBo", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/user-list.hbs" } });
});
define("need-a-couch/templates/components/user-list/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "m1HWv9wI", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"save\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"given_name\"],[\"flush-element\"],[\"text\",\"Given Name\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"maxlength\",\"placeholder\",\"value\"],[\"text\",\"given_name\",\"10\",\"Given Name\",[\"get\",[\"profile\",\"givenName\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"surname\"],[\"flush-element\"],[\"text\",\"Surname\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"maxlength\",\"placeholder\",\"value\"],[\"text\",\"surname\",\"10\",\"Surname\",[\"get\",[\"profile\",\"surname\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"gender\"],[\"flush-element\"],[\"text\",\"Gender\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"maxlength\",\"placeholder\",\"value\"],[\"text\",\"gender\",\"10\",\"Gender\",[\"get\",[\"profile\",\"gender\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"dob\"],[\"flush-element\"],[\"text\",\"Date of Birth\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"data-provide\",\"value\"],[\"date\",\"dob\",\"Date of Birth\",\"datepicker\",[\"get\",[\"profile\",\"dob\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-info\"],[\"static-attr\",\"type\",\"submit\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"save\"]],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-xs btn-danger\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"cancel\"]],[\"flush-element\"],[\"text\",\"Cancel\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/user-list/edit.hbs" } });
});
define("need-a-couch/templates/components/user-list/user", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ziUDmBIQ", "block": "{\"statements\":[[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"user\",\"givenName\"]]],null,5],[\"block\",[\"unless\"],[[\"get\",[\"user\",\"givenName\"]]],null,2],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\" Edit \"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"block\",[\"link-to\"],[\"user.edit\",[\"get\",[\"user\"]]],[[\"class\"],[\"btn btn-xs btn-primary\"]],0],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    User \"],[\"append\",[\"unknown\",[\"user\",\"id\"]],false],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"user\",\"editable\"]]],null,1]],\"locals\":[]},{\"statements\":[[\"text\",\" Edit \"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"block\",[\"link-to\"],[\"user.edit\",[\"get\",[\"user\"]]],[[\"class\"],[\"btn btn-xs btn-primary\"]],3],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"append\",[\"unknown\",[\"user\",\"givenName\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"user\",\"surname\"]],false],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"user\",\"editable\"]]],null,4]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/components/user-list/user.hbs" } });
});
define("need-a-couch/templates/couchpost", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EWdvQwI4", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/couchpost.hbs" } });
});
define("need-a-couch/templates/couchpost/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "R8dSQpf8", "block": "{\"statements\":[[\"append\",[\"helper\",[\"couchpost-list/edit\"],null,[[\"couchpost\",\"save\",\"cancel\"],[[\"get\",[\"model\"]],\"saveCouchpost\",\"cancel\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/couchpost/edit.hbs" } });
});
define("need-a-couch/templates/couchposts", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "CwDtxepH", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"couchpost-list\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/couchposts.hbs" } });
});
define("need-a-couch/templates/couchposts/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ouxdW6RE", "block": "{\"statements\":[[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"list-group\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,2],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"couchposts.new\"],null,1],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Back\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Post a couch request!\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"couchpost-list/couchpost\"],null,[[\"couchpost\",\"profile\",\"delete\"],[[\"get\",[\"couchpost\"]],[\"get\",[\"couchpost\",\"profile\"]],\"deleteCouchpost\"]]],false],[\"text\",\"\\n\"]],\"locals\":[\"couchpost\"]}],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/couchposts/index.hbs" } });
});
define("need-a-couch/templates/couchposts/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "OgjPYopL", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Where do you need a couch?\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"couchpost-list/edit\"],null,[[\"couchpost\",\"save\",\"cancel\"],[[\"get\",[\"model\"]],\"createCouchpost\",\"cancel\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/couchposts/new.hbs" } });
});
define("need-a-couch/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5U3Kz7u2", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Need a Couch is here for everyone who has ever needed a place to crash*!\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"(We're like Couchsurfing, but for people who know each other)\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"footer\",[]],[\"flush-element\"],[\"text\",\"*We apologize to everyone who thought this was an app to let people buy physical couches.\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/index.hbs" } });
});
define("need-a-couch/templates/sign-in", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kdtQ9fdV", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\",\"reset\",\"credentials\"],[\"signIn\",\"reset\",[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/sign-in.hbs" } });
});
define("need-a-couch/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "PK9cbNDd", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-up-form\"],null,[[\"submit\"],[\"signUp\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/sign-up.hbs" } });
});
define("need-a-couch/templates/user", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "/CYMcTjw", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/user.hbs" } });
});
define("need-a-couch/templates/user/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2dVNAca/", "block": "{\"statements\":[[\"append\",[\"helper\",[\"user-list/edit\"],null,[[\"profile\",\"save\",\"cancel\"],[[\"get\",[\"model\"]],\"saveProfile\",\"cancel\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/user/edit.hbs" } });
});
define("need-a-couch/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "zpCEleUx", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Users\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"user-list\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/users.hbs" } });
});
define("need-a-couch/templates/users/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "tOK/dJxs", "block": "{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,1],[\"block\",[\"link-to\"],[\"index\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Back\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"user-list/user\"],null,[[\"user\"],[[\"get\",[\"user\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "need-a-couch/templates/users/index.hbs" } });
});
define('need-a-couch/transforms/custom-date', ['exports', 'ember-data', 'moment'], function (exports, _emberData, _moment) {
  exports['default'] = _emberData['default'].Transform.extend({
    deserialize: function deserialize(serialized) {
      return _moment['default'].utc(serialized).format('MMMM Do YYYY');
    },

    serialize: function serialize(deserialized) {
      return deserialized;
    }
  });
});


define('need-a-couch/config/environment', ['ember'], function(Ember) {
  var prefix = 'need-a-couch';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("need-a-couch/app")["default"].create({"name":"need-a-couch","version":"0.0.0+8d553d81"});
}
//# sourceMappingURL=need-a-couch.map
