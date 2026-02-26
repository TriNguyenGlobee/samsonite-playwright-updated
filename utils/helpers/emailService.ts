import Mailosaur from 'mailosaur';

export class EmailService {
    private client: Mailosaur;
    private serverId: string;

    constructor() {
        this.client = new Mailosaur(process.env.MAILOSAUR_API_KEY!);
        this.serverId = process.env.MAILOSAUR_SERVER_ID!;
    }

    generateEmail() {
        return `user-${Date.now()}@${this.serverId}.mailosaur.net`;
    }

    async waitForEmail(sentTo: string, subject?: string) {
        return await this.client.messages.get(this.serverId, {
            sentTo,
            subject,
        }, {
            timeout: 60000
        });
    }
}