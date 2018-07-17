export class RequestModel {
	_id?: string;
	instrumentName: string;
	cantidad: number;
	created_at?: Date;
	owner: {
		id: string,
		matricula: string
	};
	request_type: string;
	instrument_id: string;
}