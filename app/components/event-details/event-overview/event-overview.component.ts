import { Component, Input } from '@angular/core';
import Event from '../../../models/event.model';

@Component({
    selector: "EventOverview",
    templateUrl: "components/event-details/event-overview/event-overview.html",
    styleUrls: ["components/event-details/event-overview/event-overview.css"]
})
export class EventOverviewComponent {
    @Input() event: Event;

    constructor() { }
}