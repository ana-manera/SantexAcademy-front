import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


interface IEvent {
  name: string;
  reload?: boolean;
  data: string
}
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private subject = new Subject<any>();


  newEvent(event: IEvent) {
    this.subject.next(event);
  }

  get events$() {
    return this.subject.asObservable();
  }

  sendNewEvent(name: string, reload: boolean = true, data: string = '') {
    const event = { name, reload, data };
    this.newEvent(event);
  }
}
