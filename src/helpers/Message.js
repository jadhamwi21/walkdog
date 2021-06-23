export default class Message {
	constructor(content, sendBy) {
		this.MessageContent = content;
		this.SendBy = sendBy;
		this.isRead = false;
	}
	getContent() {
		return this.MessageContent;
	}
	getSender() {
		return this.SendBy;
	}
	markRead() {
		this.isRead = true;
	}
}
