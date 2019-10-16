import decode from "jwt-decode";
import LocalStorageService from "./LocalStorageService";

class AuthHelper {

    static isLoggedIn() {
        const token = LocalStorageService.getToken();
        return ((token != null) && !this.isTokenExpired(token));
    };

    static isTokenExpired(token) {
        try {
            const decoded = decode(token);
            return (decoded.exp < (Date.now() / 1000));
        } catch (err) {
            console.log("expired check failed! Line 42: AuthService.js");
            return false;
        }
    };

    static logOut() {
        LocalStorageService.removeToken();
        LocalStorageService.removeRefreshToken();
        LocalStorageService.removeUser();
        LocalStorageService.removeTotalPages();
        LocalStorageService.removePageNumber();
        LocalStorageService.removeMaxResults();
        LocalStorageService.removeSwitchMode();
    }
}

export default AuthHelper;