import AddCertificate from "../certificateacttions/AddCertificate";
import User from "../entity/User";
import LocalStorageService from "../service/LocalStorageService";
import BuyPopup from "../popup/BuyPopup";
const assert = require('assert');


describe('check authorization', function() {

    it('check is admin', function() {
        LocalStorageService.setUser(new User(undefined, 'Admin', 'ROLE_ADMIN'));
        let isAdmin = (new AddCertificate()).checkIsAdmin();
        assert.equal(isAdmin, true);
        LocalStorageService.removeUser();
    });

    it('check is user', function() {
        LocalStorageService.setUser(new User(undefined, 'Mir Culer', 'ROLE_USER'));
        let isUser = (new BuyPopup()).checkIsUser();
        assert.equal(isUser, true);
        LocalStorageService.removeUser();
    });
});
