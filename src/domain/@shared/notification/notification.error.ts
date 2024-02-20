import { NotificationErrorsProps } from './notification';

export default class NotificationError extends Error {
  constructor(public errors: NotificationErrorsProps[]) {
    super(
      errors.map((error) => `${error.context}: ${error.message}`).join(',')
    );
  }
}
