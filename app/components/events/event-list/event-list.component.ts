import { Component, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import Event from '../../../models/event.model';

@Component({
    selector: "EventList",
    templateUrl: "components/events/event-list/event-list.html",
    styleUrls: ["components/events/event-list/event-list.css"]
})
export class EventListComponent {
    @Input() events: Event[];
    
    constructor(private routerExtensions: RouterExtensions) {}

    onItemTap(event) {
        this.routerExtensions.navigate(["/events", event.id]);
    }
}