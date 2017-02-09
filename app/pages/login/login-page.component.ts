import { Component, OnInit, NgZone } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Page } from 'ui/page';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: "login",
    templateUrl: "pages/login/login-page.html",
    styleUrls: ["pages/login/login-page.css"]
})
export class LoginPageComponent implements OnInit {
    user: User;
    isAuthenticating = false;

    constructor(private userService: UserService, private page: Page, private routerExtensions: RouterExtensions, private zone: NgZone) {
        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.backgroundImage = this.page.ios ? "res://bg_login.png" : "res://bg_login";
        this.page.style.backgroundRepeat = "none";
        this.page.style.backgroundSize = "cover";
        this.user = new User();

        this.page.on('navigatedTo', () => this.setup());
    }

    ngOnInit() {
        this.setup();
    }

    setup() {
        // TODO: Remove when not testing
        // this.zone.run(() => {
        //     this.user.email = 'test@test.com';
        //     this.user.password = 'abc12345def12345';
        // })
    }

    login() {
        this.isAuthenticating = true;
        this.userService.login(this.user)
            .then(() => {
                this.isAuthenticating = false;
                this.routerExtensions.navigate(["/events"], { clearHistory: true } );
            })
            .catch(err => {
                this.isAuthenticating = false;
                alert(err);
            });
    }

    register() {
        this.userService.register(this.user).then(() => {
            this.login();
        }).catch(err => {
            alert(err);
        });
    }
}