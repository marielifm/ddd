export type NotificationErrorsProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorsProps[] = [];

  addError(error: NotificationErrorsProps) {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorsProps[] {
    return this.errors;
  }

  messages(context?: string): string {
    let message = '';
    this.errors.forEach((error) => {
      if (context === undefined || error.context === context) {
        message += `${error.context}: ${error.message},`;
      }
    });
    return message;
  }
}
