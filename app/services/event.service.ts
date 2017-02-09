import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import Event from '../models/event.model';
import Topic from '../models/topic.model';
import 'rxjs/add/operator/share';

@Injectable()
export class EventService {
    
  constructor(private userService: UserService, private zone: NgZone) {}

  getEvents(): Observable<Event[]> {
    return new Observable((observer) => {
      firebase.addValueEventListener(snapshot => {
        this.zone.run(() => {
          var results = snapshot.value;
          let events = (results) ? Object.keys(results).map(key => new Event(results[key])) : [];
          observer.next(events);
        });
      }, `/events`);
    }).share();              
  }

  getEventInfo(eventId: string): Observable<Event> {
    return new Observable((observer) => {
      firebase.addValueEventListener(snapshot => {
        this.zone.run(() => {
          var result = snapshot.value;
          let event = (result) ? new Event(result) : null; 
          observer.next(event);
        });
      }, `/events/${eventId}`);
    }).share();              
  }
}