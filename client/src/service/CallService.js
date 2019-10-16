import React from 'react';
import axios from 'axios';
import qs from 'qs';
import LocalStorageService from "./LocalStorageService";
import AuthHelper from "./AuthHelper";

class CallService {

    export;
    default;
    CallService;

    static getCertificates(searchQuery, sort, pageNumber, maxResults) {
        const url = "http://localhost:8080/api/gift_certificates";
        let realUrl = `${url}?`;
        if (searchQuery !== "") {
            realUrl += `${searchQuery}&`;
        }
        if (sort !== undefined) {
            realUrl += `sort=${sort}&`;
        }
        realUrl += `page_number=${pageNumber}&max_results=${maxResults}`;
        return axios.get(realUrl);
    }

    static async getUserCertificates(userId, pageNumber, maxResults) {
        const url = `http://localhost:8080/api/users/${userId}/gift_certificates`;
        let realUrl = `${url}?page_number=${pageNumber}&max_results=${maxResults}`;
        if (AuthHelper.isTokenExpired(LocalStorageService.getToken())) {
            CallService.refreshToken().then(response => {
                LocalStorageService.setToken(response.data.access_token);
                LocalStorageService.setRefreshToken(response.data.refresh_token);
                const config = {
                    headers: {
                        'Authorization': `Bearer ${LocalStorageService.getToken()}`
                    }
                };
                return axios.get(realUrl, config);
            }).catch(error => {
                console.log(error.message);
            });
        } else {
            const config = {
                headers: {
                    'Authorization': `Bearer ${LocalStorageService.getToken()}`
                }
            };
            return axios.get(realUrl, config);
        }
    }

    static async getCertificateById(id) {
        const url = `http://localhost:8080/api/gift_certificates/${id}`;
        if (AuthHelper.isTokenExpired(LocalStorageService.getToken())) {
            CallService.refreshToken().then(response => {
                LocalStorageService.setToken(response.data.access_token);
                LocalStorageService.setRefreshToken(response.data.refresh_token);
                const config = {
                    headers: {
                        'Authorization': `Bearer ${LocalStorageService.getToken()}`
                    }
                };
                return axios.get(url, config);
            }).catch(error => {
                console.log(error.message);
            });
        } else {
            const config = {
                headers: {
                    'Authorization': `Bearer ${LocalStorageService.getToken()}`
                }
            };
            return axios.get(url, config);
        }
    }

    static logIn(currentName, currentPassword) {
        const url = "http://localhost:8080/oauth/token";
        const data = qs.stringify({
            'grant_type': 'password',
            'username': currentName,
            'password': currentPassword
        });
        const config = {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Basic ${window.btoa('client' + ':' + 'secret')}`,
            }
        };
        return axios.post(url, data, config);
    }

    static signUp(currentName, currentPassword) {
        const url = "http://localhost:8080/api/users";
        const data = {
            'name': currentName,
            'password': currentPassword
        };
        return axios.post(url, data);
    }

    static refreshToken() {
        const url = "http://localhost:8080/oauth/token";
        const data = qs.stringify({
            'grant_type': 'refresh_token',
            'refresh_token': `${LocalStorageService.getRefreshToken()}`
        });
        const config = {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Basic ${window.btoa('client' + ':' + 'secret')}`,
            }
        };
        return axios.post(url, data, config);
    }

    static async getUserByName(name) {
        const url = `http://localhost:8080/api/users?name=${name}`;
        if (AuthHelper.isTokenExpired(LocalStorageService.getToken())) {
            CallService.refreshToken().then(response => {
                LocalStorageService.setToken(response.data.access_token);
                LocalStorageService.setRefreshToken(response.data.refresh_token);
                const config = {
                    headers: {
                        'Authorization': `Bearer ${LocalStorageService.getToken()}`
                    }
                };
                return axios.get(url, config);
            }).catch(error => {
                console.log(error.message);
            });
        } else {
            const config = {
                headers: {
                    'Authorization': `Bearer ${LocalStorageService.getToken()}`
                }
            };
            return axios.get(url, config);
        }
    }

    static async getUserById(id) {
        const url = `http://localhost:8080/api/users/${id}`;
        if (AuthHelper.isTokenExpired(LocalStorageService.getToken())) {
            CallService.refreshToken().then(response => {
                LocalStorageService.setToken(response.data.access_token);
                LocalStorageService.setRefreshToken(response.data.refresh_token);
                const config = {
                    headers: {
                        'Authorization': `Bearer ${LocalStorageService.getToken()}`
                    }
                };
                return axios.get(url, config);
            }).catch(error => {
                console.log(error.message);
            });
        } else {
            const config = {
                headers: {
                    'Authorization': `Bearer ${LocalStorageService.getToken()}`
                }
            };
            return axios.get(url, config);
        }
    }

    static async deleteCertificate(id) {
        if (id !== undefined) {
            const url = `http://localhost:8080/api/gift_certificates/${id}`;
            if (AuthHelper.isTokenExpired(LocalStorageService.getToken())) {
                CallService.refreshToken().then(response => {
                    LocalStorageService.setToken(response.data.access_token);
                    LocalStorageService.setRefreshToken(response.data.refresh_token);
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${LocalStorageService.getToken()}`
                        }
                    };
                    return axios.delete(url, config);

                }).catch(error => {
                    console.log(error.message);
                });
            } else {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${LocalStorageService.getToken()}`
                    }
                };
                return axios.delete(url, config);
            }
        }
    }

    static async addCertificate(certificate) {
        const url = "http://localhost:8080/api/gift_certificates";
        let data = {
            'name': certificate.name,
            'description': certificate.description,
            'price': certificate.price,
            'durationInDays': 1,
            'tags': []
        };
        data.tags = certificate.tags;
        if (AuthHelper.isTokenExpired(LocalStorageService.getToken())) {
            CallService.refreshToken().then(response => {
                LocalStorageService.setToken(response.data.access_token);
                LocalStorageService.setRefreshToken(response.data.refresh_token);
                const config = {
                    headers: {
                        'Authorization': `Bearer ${LocalStorageService.getToken()}`
                    }
                };
                return axios.post(url, data, config);
            }).catch(error => {
                console.log(error.message);
            });
        } else {
            const config = {
                headers: {
                    'Authorization': `Bearer ${LocalStorageService.getToken()}`
                }
            };
            return axios.post(url, data, config);
        }
    }

    static async updateCertificate(id, certificate) {
        const url = `http://localhost:8080/api/gift_certificates/${id}`;
        let data = {
            'name': certificate.name,
            'description': certificate.description,
            'price': certificate.price,
            'durationInDays': 1,
            'tags': []
        };
        data.tags = certificate.tags;
        if (AuthHelper.isTokenExpired(LocalStorageService.getToken())) {
            CallService.refreshToken().then(response => {
                LocalStorageService.setToken(response.data.access_token);
                LocalStorageService.setRefreshToken(response.data.refresh_token);
                const config = {
                    headers: {
                        'Authorization': `Bearer ${LocalStorageService.getToken()}`
                    }
                };
                return axios.put(url, data, config);
            }).catch(error => {
                console.log(error.message);
            });
        } else {
            const config = {
                headers: {
                    'Authorization': `Bearer ${LocalStorageService.getToken()}`
                }
            };
            return axios.put(url, data, config);
        }
    }

    static async buyCertificate(certificateId, toUserId) {
        const url = `http://localhost:8080/api/users/${toUserId}/gift_certificates/`;
        let data = {
            'id': `${certificateId}`,
        };
        if (AuthHelper.isTokenExpired(LocalStorageService.getToken())) {
            CallService.refreshToken().then(response => {
                LocalStorageService.setToken(response.data.access_token);
                LocalStorageService.setRefreshToken(response.data.refresh_token);
                const config = {
                    headers: {
                        'Authorization': `Bearer ${LocalStorageService.getToken()}`
                    }
                };
                return axios.post(url, data, config);
            }).catch(error => {
                console.log(error.message);
            });
        } else {
            const config = {
                headers: {
                    'Authorization': `Bearer ${LocalStorageService.getToken()}`
                }
            };
            return axios.post(url, data, config);
        }
    }

    static async setNewUserBalance(userId, balance) {
        const url = `http://localhost:8080/api/users/${userId}`;
        let data = {
            'usersBalance': balance,
        };
        if (AuthHelper.isTokenExpired(LocalStorageService.getToken())) {
            CallService.refreshToken().then(response => {
                LocalStorageService.setToken(response.data.access_token);
                LocalStorageService.setRefreshToken(response.data.refresh_token);
                const config = {
                    headers: {
                        'Authorization': `Bearer ${LocalStorageService.getToken()}`
                    }
                };
                return axios.patch(url, data, config);
            }).catch(error => {
                console.log(error.message);
            });
        } else {
            const config = {
                headers: {
                    'Authorization': `Bearer ${LocalStorageService.getToken()}`
                }
            };
            return axios.patch(url, data, config);
        }
    }
}

export default CallService;