import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import ProductInterface from './product.interface';

export class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(): boolean {
    if (this._id.length === 0) {
      this.notification.addError({
        context: 'product',
        message: 'id is required'
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        context: 'product',
        message: 'name is required'
      });
    }

    if (this._price < 0) {
      this.notification.addError({
        context: 'product',
        message: 'price is invalid'
      });
    }

    return true;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
