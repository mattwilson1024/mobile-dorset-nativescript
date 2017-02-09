import { Injectable } from "@angular/core";
import * as firebase from 'nativescript-plugin-firebase';
import { getString, setString } from "application-settings";
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    static isLoggedIn(): boolean {
        return !!getString("userId");
    }

    static get userId(): string {
        return getString("userId");
    }

    static set userId(theUserId: string) {
        setString("userId", theUserId);
    }

    login(user: User): Promise<any> {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: user.email,
            password: user.password
        }).then((result: any) => {
            UserService.userId = result.uid;
            return result;
        });
    }

    logout() {
        UserService.userId = '';
        return firebase.logout();
    }

    register(user: User): Promise<any> {
        return firebase.createUser({
            email: user.email,
            password: user.password
        });
    }

    // TODO: Replace:
    getUserId(): Promise<string> {
        return firebase.getCurrentUser().then(user => user.uid);
    }

    // setUserEmail(email: string): void {
    //     this.currentUserEmail = email;
    // }

    // clearUserEmail(): void {
    //     this.currentUserEmail = null;
    // }
}