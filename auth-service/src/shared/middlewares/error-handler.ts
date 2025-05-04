import { Request, Response, NextFunction } from 'express';
import { Result } from '../result-pattern';
import { logger } from '../logger/logger';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error('Erro inesperado:', err);

  res.status(500).json(
    Result.fail(['Erro interno do servidor.'])
  );
}
