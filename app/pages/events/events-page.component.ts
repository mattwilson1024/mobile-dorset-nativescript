import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterExtensions } from 'nativescript-angular';
import * as firebase from 'nativescript-plugin-firebase';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import Event from '../../models/event.model';

@Component({
    selector: "event-list-page",
    templateUrl: "pages/events/events-page.html",
})
export class EventsPageComponent implements OnInit {
    
    public events$: Observable<Event[]>;

    constructor(
        private userService: UserService,
        private eventService: EventService, 
        private routerExtensions: RouterExtensions
    ) { }

    ngOnInit() {
        this.events$ = this.eventService.getEvents();
    }

    logout() {
        this.userService.logout().then(() => {
            this.routerExtensions.navigate(["/login"], { clearHistory: true } );
        });
    }
}