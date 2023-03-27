const BNumber = require('bignumber.js');
const assert = require('assert-plus');

class BigNumber {
    constructor(number) {
        this.number = new BNumber(number);
    }

    multiply(value) {
        this.number = this.number.times(value);
        return this;
    }

    sumFromArray(array, key) {
        assert.array(array, 'array');
        array.forEach(item => {
            this.plus(item[key]);
        });
        return this;
    }

    div(value) {
        this.number = this.number.dividedBy(value);
        return this;
    }

    plus(value) {
        this.number = this.number.plus(value);
        return this;
    }

    minus(value) {
        this.number = this.number.minus(value);
        return this;
    }

    toNumber() {
        return this.number.toNumber();
    }

    toValue() {
        return this.number;
    }

    toFixed(number = 2) {
        return Number(this.number.toFixed(number));
    }

    floor() {
        return Number(this.number.toFixed(0));
    }

    ceil() {
        return Math.ceil(this.number.toNumber());
    }
}

const bigNumber = number => new BigNumber(number);

module.exports = bigNumber;
