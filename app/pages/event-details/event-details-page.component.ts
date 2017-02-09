import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PageRoute } from 'nativescript-angular/router';
import * as firebase from 'nativescript-plugin-firebase';
import * as dialogs from "ui/dialogs";
import 'rxjs/add/operator/switchMap';

import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { TopicService } from '../../services/topic.service';

import Event from '../../models/event.model';
import Topic from '../../models/topic.model';

@Component({
    selector: "event-details-page",
    templateUrl: "pages/event-details/event-details-page.html",
})
export class EventDetailsPageComponent implements OnInit {
    
    private eventId: string;

    private eventInfo: Event;
    private topics: Topic[] = [];
    private firstLoadCompleted: boolean = false;

    private tabSelectedIndex: number = 0;

    constructor(
        private userService: UserService,
        private eventService: EventService,
        private topicService: TopicService,
        private pageRoute: PageRoute,
        private zone: NgZone
    ) { }

    ngOnInit() {
        this.pageRoute.activatedRoute.switchMap(activatedRoute => activatedRoute.params).forEach((params) => {
            this.eventId = params['id'];

            let eventInfo$ = this.eventService.getEventInfo(this.eventId);
            eventInfo$.subscribe(eventInfo => this.eventInfo = eventInfo);

            let topics$ = this.topicService.getTopics(this.eventId);
            topics$.subscribe(topics => this.topicsChanged(topics));
        });
    }

    topicsChanged(latestTopics: Topic[]) {
        // Process added/edited topics
        latestTopics.forEach(topic => {
            let matchedTopics = this.topics.filter(t => t.id == topic.id);
            if (matchedTopics.length === 0) {
                // New topics get pushed to the end of the list
                this.topics.push(topic);
            } else {
                // Existing topics get edited
                matchedTopics[0].title = topic.title;
                matchedTopics[0].proposer = topic.proposer;
                matchedTopics[0].votes = topic.votes;
                matchedTopics[0].currentUserIsProposer = topic.currentUserIsProposer;
                matchedTopics[0].currentUserHasVoted = topic.currentUserHasVoted;
            }
        });

        // Process deletions
        // Only keep topics that are still in the firebase collection
        this.topics = this.topics.filter(topic => {
            return latestTopics.some(t => t.id === topic.id);
        });

        // Auto-sort but only if this is the first load
        if (!this.firstLoadCompleted) {
            this.sortTopics();
            this.firstLoadCompleted = true;
        }
    }

    sortTopics() {
        this.topics.sort((a, b) => {
            let voteSort = b.voteCount - a.voteCount;
            return (voteSort == 0) ? a.title.localeCompare(b.title) : voteSort;
        });
    }

    createTopic() {
        dialogs.prompt({
            title: "Suggest a topic",
            message: "Please enter your topic",
            okButtonText: "OK",
            cancelButtonText: "Cancel",
            defaultText: "",
            inputType: dialogs.inputType.text
        }).then(r => {
            if (r.result) {
                this.topicService.createTopic(this.eventId, r.text);
            }
        });
    }
}