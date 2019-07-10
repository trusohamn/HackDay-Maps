const { generateUniqueId, getAverageRating } = require('./dataHandling');
const assert = require('assert');

describe('generateUniqueId', () => {
    it('no space', () => {
        const name = 'single'
        const id = generateUniqueId(name);
        assert.ok(id.includes(name));
    });
    it('with space', () => {
        const name = 'with space'
        const id = generateUniqueId(name);
        assert.ok(id.includes('with-space'));
    });
    it('unique', () => {
        const name = 'with space'
        const id = generateUniqueId(name);
        const id2 = generateUniqueId(name);
        assert.ok(id != id2);
    });
})

describe('getAverageRating', () => {
    it('no reviews', () => {
        const data = [];
        assert.equal(10, getAverageRating(data, 10));
    });
    it('2 reviews', () => {
        const data = [
            {
                "title": "no sleeping allowed",
                "description": "",
                "rating": 2
            },
            {
                "title": "its awsesome anyway",
                "description": "",
                "rating": 10
            }
        ];
        assert.equal(7.3, getAverageRating(data, 10));
    });


})