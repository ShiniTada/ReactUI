import SignUp from "../login/SignUp";
import AddCertificate from "../certificateacttions/AddCertificate";

const assert = require('assert');


describe('validate forms', function () {

    describe('validate signUp form', function () {

        it('all fields are valid', function () {
            let isValid = (new SignUp()).validate('username', 'pass', 'pass');
            assert.equal(isValid, true);
        });

        it('invalid username', function () {
            let isValid = (new SignUp()).validate('u', 'pass', 'pass');
            assert.equal(isValid, false);
        });

        it('invalid password', function () {
            let isValid = (new SignUp()).validate('user', '', '');
            assert.equal(isValid, false);
        });

        it('invalid password confirmation', function () {
            let isValid = (new SignUp()).validate('user', 'pass', 'password');
            assert.equal(isValid, false);
        });
    });

    describe('validate add/edit certificate form', function () {
        it('all fields are valid', function () {
            let isValid = (new AddCertificate()).validate('title', 'description', '12');
            assert.equal(isValid, true);
        });

        it('invalid title', function () {
            let isValid = (new AddCertificate()).validate('', 'description', '12');
            assert.equal(isValid, false);
        });

        it('invalid description', function () {
            let isValid = (new AddCertificate()).validate('title', 'd', '12');
            assert.equal(isValid, false);
        });

        it('invalid price', function () {
            let isValid = (new AddCertificate()).validate('title', 'description', '-7');
            assert.equal(isValid, false);
        });
    });

});
