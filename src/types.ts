export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
	nickname: string;
	avatar: string; // base64
	createdAt: Date;
	updatedAt: Date;
}
