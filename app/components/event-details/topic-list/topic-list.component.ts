import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../../services/event.service';
import Topic from '../../../models/topic.model';

@Component({
    selector: "TopicList",
    templateUrl: "components/event-details/topic-list/topic-list.html",
    styleUrls: ["components/event-details/topic-list/topic-list.css"]
})
export class TopicListComponent {
    @Input() eventId: string;
    @Input() topics: Topic[];
    
    constructor() {}
}