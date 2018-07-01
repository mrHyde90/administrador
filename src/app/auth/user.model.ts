import {AuthModel} from './auth.model';

export class UserModel {
	_id?: string;
	email: string;
	password: string;
	matricula: string;
	carrera: string;
	name: string;
	user_type?: string;
}