import LocalizedStrings from "react-localization";
import LocalStorageService from "../service/LocalStorageService";

export default class LocaleWrapper {
    constructor() {
        this.locale = new LocalizedStrings({
            en: {
                search: "Search...",
                go: "Go!",
                signUp: "Sign Up",
                logIn: "Log In",
                logOut: "Log Out",
                footer: "Certificates © 2019",
                addNewCertificate: "Add new certificate",
                certificates: "Certificates",
                certificate: "Certificate",
                addCertificate: "Add certificate",
                editCertificate: "Edit certificate",
                buyCertificate: "Buy certificate",
                toUser: "To which user",
                title: "Title",
                description: "Description",
                price: "Price",
                tags: "Tags",
                inputTag: "Input tag and press enter",
                buttonSave: "Save",
                buttonAdd: "Add",
                buttonCancel: "Cancel",
                buttonEdit: "edit",
                buttonDelete: "delete",
                buttonBuy: "buy",
                buttonBigBuy: "Buy",
                buttonOk: "Ok",
                login: "Login",
                password: "Password",
                repeatPassword: "Repeat password",
                all: "All",
                myCertificates: "My certificates",
                creationDate: "Created",
                deleteQuestion: "Do you want to delete certificate ",

                loginIsRequired: "login is required",
                passwordIsRequired: "password is required",
                passwordsDoNotMatch: "passwords don't match",
                loginLength: "login must be between 4 and 15 characters",
                passwordLength: "password must be between 4 and 15 characters",
                userExist: "user with the same name already exist",
                networkError: "Something went wrong. Try again later",
                wrongCredentials: "Wrong login or password",
                titleIsRequired: "title is required",
                descriptionIsRequired: "description is required",
                priceIsRequired: "price is required",
                wrongPrice: "price should be greater than 0",
                balanceIsRequired: "balance is required",
                wrongBalance: "balance should be greater than 0",
                titleLength: "title should be between 3 and 30 characters",
                descriptionLength: "description should be between 3 and 250 characters",
                tagLength: "tag should be between 3 and 15 characters",
                alreadyDeleted: "this certificate already deleted",
                searchUser: "Search user...",
                found: "found",
                notFound: "not found",
                success: "Success!",
                balance: "Balance",
                yourBalance: "Your balance",
                replenishBalance: "Replenish balance",
                inputAmount: "Input amount",
                adminIsLogOut: "Currently, no user with administrator rights is logged in. No changes made",
                userIsLogOut: "Currently, no user is logged in. No changes made",
                accessIsDenied: "Access is denied",
                notAvailable: "This page isn't available for you",
                unsavedData : "You have unsaved data. Do you want to leave this page?"

            },
            ru: {
                search: "Поиск...",
                go: "Искать!",
                signUp: "Регистрация",
                logIn: " Вход",
                logOut: " Выход",
                footer: "Сертификаты © 2019",
                addNewCertificate: "Добавить сертификат",
                certificates: "Сертификаты",
                certificate: "Сертификат",
                addCertificate: "Добавить сертификат",
                editCertificate: "Редактировать сертификат",
                buyCertificate: "Купить сертификат",
                toUser: "Какому пользователю",
                title: "Название",
                description: "Описание",
                price: "Цена",
                tags: "Теги",
                inputTag: "Введите тег и нажмите enter",
                buttonSave: "Сохранить",
                buttonAdd: "Добавить",
                buttonCancel: "Отмена",
                buttonEdit: "изменить",
                buttonDelete: "удалить",
                buttonBuy: "купить",
                buttonBigBuy: "Купить",
                buttonOk: "Ок",
                login: "Логин",
                password: "Пароль",
                repeatPassword: "Повторите пароль",
                all: "Все",
                myCertificates: "Мои сертификаты",
                creationDate: "Создан",
                deleteQuestion: "Вы действительно хотите удалить сертификат ",

                loginIsRequired: "логин обязателен",
                passwordIsRequired: "пароль обязателен",
                passwordsDoNotMatch: "пароли не совпадают",
                loginLength: "логин должен быть от 4 до 15 символов",
                passwordLength: "пароль должен быть от 4 до 15 символов",
                userExist: "пароль должен быть от 4 до 15 символов",
                networkError: "Что-то пошло не так. Попробуйте снова позже",
                wrongCredentials: "Неверный логин или пароль",
                titleIsRequired: "название обязательно",
                descriptionIsRequired: "описание обязательно",
                priceIsRequired: "цена обязательна",
                wrongPrice: "цена должна быть больше 0",
                balanceIsRequired: "баланс обязателен",
                wrongBalance: "баланс должен быть больше 0",
                titleLength: "название должено быть от 3 до 30 символов",
                descriptionLength: "описание должено быть от 3 до 250 символов",
                tagLength: "тег должен быть от 3 до 15 символов",
                alreadyDeleted: "этот сертификат уже удален",
                searchUser: "Поиск пользователя...",
                found: "найден",
                notFound: "не найден",
                success: "Успех!",
                balance: "Баланс",
                yourBalance: "Ваш баланс",
                replenishBalance: "Пополнить баланс",
                inputAmount: "Введите сумму",
                adminIsLogOut: "На данный момент ни один пользователь c администраторскими правами не залогинен. Изменения не внесены",
                userIsLogOut: "На данный момент ни один пользователь не залогинен. Изменения не внесены",
                accessIsDenied: "Доступ запрещен",
                notAvailable: "Эта страница недоступна для вас",
                unsavedData : "У вас есть несохраненные данные. Вы хотите покинуь страницу?"
            }
        });

        if (LocalStorageService.getLocale() === null) {
            LocalStorageService.setLocale("en");
        }
        this.locale.setLanguage(LocalStorageService.getLocale());
    }

    setLanguage(languageCode) {
        LocalStorageService.setLocale(languageCode);
        this.locale.setLanguage(languageCode);
    }

    getLanguage() {
        return this.locale.getLanguage();
    }
}