import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import Event from '../models/event.model';
import Topic from '../models/topic.model';
import 'rxjs/add/operator/share';

@Injectable()
export class TopicService {

  constructor(private zone: NgZone) {}

  getTopics(eventId: string): Observable<Topic[]> {
    return new Observable((observer) => {
      firebase.addValueEventListener(snapshot => {
        this.zone.run(() => {
          var results = snapshot.value;
          
          let topics;
          if (results) {
            topics = Object.keys(results).map(key => {
              let obj = results[key];
              let topic = new Topic(key, obj.title, obj.proposer);
              topic.votes = (obj.votes) ? Object.keys(obj.votes) : [];
              topic.currentUserIsProposer = topic.isUserProposer(UserService.userId);
              topic.currentUserHasVoted = topic.hasUserVoted(UserService.userId);
              return topic;
            });
          } else {
            topics = [];
          }

          observer.next(topics);
        });
      }, `/topics/${eventId}`);
    }).share();
  }
  
  createTopic(eventId: string, title: string) {
    if (title !== null && title.length > 0) {
      firebase.push(`/topics/${eventId}`, {
          'title': title,
          'proposer': UserService.userId
      });
    }
  }

  toggleTopicVote(eventId: string, topic: Topic) {
    let userHasAlreadyVoted = (topic.votes.indexOf(UserService.userId) > -1);
    let valueToStore = (userHasAlreadyVoted) ? null : true;

    firebase.setValue(`/topics/${eventId}/${topic.id}/votes/${UserService.userId}`, valueToStore);
  }

  editTopic(eventId: string, topicId: string, newTitle: string) {
    firebase.update(`/topics/${eventId}/${topicId}`, { title: newTitle });
  }

  deleteTopic(eventId: string, topicId: string) {
    firebase.remove(`/topics/${eventId}/${topicId}`);
  }
}