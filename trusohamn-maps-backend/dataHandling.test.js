const dataHandling = require('./dataHandling');
const assert = require('assert');

describe('', () => {
    it('no space', () => {
        const name = 'single'
        const id = dataHandling.generateUniqueId(name);
        assert.ok(id.includes(name));
    });
    it('with space', () => {
        const name = 'with space'
        const id = dataHandling.generateUniqueId(name);
        assert.ok(id.includes('with-space'));
    });
    it('unique', () => {
        const name = 'with space'
        const id = dataHandling.generateUniqueId(name);
        const id2 = dataHandling.generateUniqueId(name);
        assert.ok(id != id2);
    });
})