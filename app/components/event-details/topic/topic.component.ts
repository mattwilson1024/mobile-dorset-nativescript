import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as dialogs from "ui/dialogs";
import { TopicService } from '../../../services/topic.service';
import Topic from '../../../models/topic.model';

@Component({
    selector: "Topic",
    templateUrl: "components/event-details/topic/topic.html",
    styleUrls: ["components/event-details/topic/topic.css"]
})
export class TopicComponent {
    @Input() eventId: string;
    @Input() topic: Topic;

    constructor(private topicService: TopicService) {}

    onTap() {
        this.topicService.toggleTopicVote(this.eventId, this.topic);
    }

    onLongPress() {
        const [TOGGLE_VOTE, EDIT, DELETE] = ['Toggle vote', 'Edit', 'Delete'];

        let options = {
            title: "Topic",
            cancelButtonText: "Cancel",
            actions: (this.topic.currentUserIsProposer) ? [TOGGLE_VOTE, EDIT, DELETE] : [TOGGLE_VOTE]
        };
        dialogs.action(options).then((result) => {
            switch (result) {
                case TOGGLE_VOTE: 
                    this.topicService.toggleTopicVote(this.eventId, this.topic);
                    break;
                case EDIT:
                    this.editTopic();
                    break;
                case DELETE:
                    this.topicService.deleteTopic(this.eventId, this.topic.id);
                    break;
            }
        });
    }

    editTopic() {
        dialogs.prompt({
            title: "Edit topic",
            message: "Please enter your topic",
            okButtonText: "OK",
            cancelButtonText: "Cancel",
            defaultText: this.topic.title,
            inputType: dialogs.inputType.text
        }).then(r => {
            if (r.result) {
                this.topicService.editTopic(this.eventId, this.topic.id, r.text);
            }
        });
    }
}