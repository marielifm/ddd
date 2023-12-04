import EventInterface from '../../@shared/event/event.interface';

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventDate: any;

  constructor(eventDate: any) {
    this.dataTimeOccurred = new Date();
    this.eventDate = eventDate;
  }
}
