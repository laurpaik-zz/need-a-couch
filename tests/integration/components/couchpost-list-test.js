import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('couchpost-list', 'Integration | Component | couchpost list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{couchpost-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#couchpost-list}}
      template block text
    {{/couchpost-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
