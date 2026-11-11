interface INotificationProvider {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
    sendSms(to: string, message: string): Promise<void>;
}
export{INotificationProvider}