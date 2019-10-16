class LocalStorageService {

    static setTotalPages(totalPages) {
        localStorage.setItem("totalPages", totalPages);
    };

    static getTotalPages() {
        return localStorage.getItem("totalPages");
    };

    static removeTotalPages() {
        localStorage.removeItem("totalPages");
    };

    static setPageNumber(pageNumber) {
        localStorage.setItem("pageNumber", pageNumber);
    };

    static getPageNumber() {
        return localStorage.getItem("pageNumber");
    };

    static removePageNumber() {
        localStorage.removeItem("pageNumber");
    };

    static setMaxResults(maxResults) {
        localStorage.setItem("maxResults", maxResults);
    };

    static getMaxResults() {
        return localStorage.getItem("maxResults");
    };

    static removeMaxResults() {
        localStorage.removeItem("maxResults");
    };

    static setCertificate(certificate) {
        localStorage.setItem("certificate", JSON.stringify(certificate));
    };

    static getCertificate() {
        return JSON.parse(localStorage.getItem("certificate"));
    };

    static removeCertificate() {
        localStorage.removeItem("certificate");
    };

    static setSwitchMode(mode) {
        localStorage.setItem("switchMode", mode);
    };

    static getSwitchMode() {
        return localStorage.getItem("switchMode");
    };

    static removeSwitchMode() {
        return localStorage.removeItem("switchMode");
    };

    static setLocale(locale) {
        localStorage.setItem("locale", locale);
    };

    static getLocale() {
        return localStorage.getItem("locale");
    };

    static setToken(token) {
        localStorage.setItem("token", token);
    };

    static getToken() {
        return localStorage.getItem("token");
    };

    static removeToken() {
        localStorage.removeItem("token");
    };
    static setRefreshToken(refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
    };

    static getRefreshToken() {
        return localStorage.getItem("refreshToken");
    };

    static removeRefreshToken() {
        localStorage.removeItem("refreshToken");
    };

    static setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    };

    static getUser() {
        return JSON.parse(localStorage.getItem("user"));
    };

    static removeUser() {
        localStorage.removeItem("user");
    };

}

export default LocalStorageService;