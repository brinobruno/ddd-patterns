export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  clear(context?: string): void {
    if (context === undefined) {
      this.errors = [];
      return;
    }
    this.errors = this.errors.filter((error) => error.context !== context);
  }

  addError(error: NotificationErrorProps): void {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  /**
   *
   * @param context optional context to filter errors
   * @returns all error messages, or only those matching the context if provided
   */
  messages(context?: string): string {
    let message = "";
    this.errors.forEach((error) => {
      if (context === undefined || error.context === context) {
        message += `${error.context}: ${error.message},`;
      }
    });
    return message;
  }
}
