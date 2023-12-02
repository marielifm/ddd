import EventHandlerInterface from '../../@shared/event-handler.interface';
import CustomerAddressChangedEvent from '../address-changed.event';

export default class SendConsoleLog3Handler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventDate.id}, ${event.eventDate.nome} alterado para: ${event.eventDate.endereco}`
    );
  }
}
