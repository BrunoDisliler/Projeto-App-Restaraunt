import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
	sub: string;
}

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Receber o Token
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).end();
	}
	// Aqui, estou dividindo um array por espaços e depois
	// com a vírgula eu ignoro o primeiro item e nomeio o segundo de token
	const [, token] = authToken.split(' ');

	try {
		// Validar o Token
		const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

		// Aqui recupera o id do token e coloca dentro de uma
		// variável user_id do request.
		// Para isso é preciso criar nossa própria tipagem
		req.user_id = sub;

		return next();
	} catch (error) {
		return res.status(401).end();
	}
}
