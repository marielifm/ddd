import EventInterface from '../@shared/event.interface';

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventDate: any;

  constructor(eventDate: any) {
    this.dataTimeOccurred = new Date();
    this.eventDate = eventDate;
  }
}
