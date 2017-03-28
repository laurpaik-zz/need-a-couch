import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('couchpost-list/post', 'Integration | Component | couchpost list/post', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{couchpost-list/post}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#couchpost-list/post}}
      template block text
    {{/couchpost-list/post}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
