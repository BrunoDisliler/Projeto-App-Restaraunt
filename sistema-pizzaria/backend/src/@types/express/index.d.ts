// Criando nossa própria tipagem e adicionando essa propriedade
declare namespace Express {
	export interface Request {
		user_id: string;
	}
}
