import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      let reason: string;
      if (statusCode == 200) {
        reason = 'Success';
      } else if (statusCode == 400) {
        reason = 'Invalid Parameters';
      } else if (statusCode == 401) {
        reason = 'Unauthorized';
      } else if (statusCode == 404) {
        reason = 'Not Found';
      } else if (statusCode == 500) {
        reason = 'Server Error';
      } else {
        reason = 'Not Completed';
      }

      this.logger.log(
        `\nMethod: ${method}\nURL: ${originalUrl}\nStatus: ${statusCode} - ${reason}\nResponse Time: ${responseTime}ms\n Content Length: ${contentLength}\nUser Agent: ${userAgent}\nIP: ${ip}`,
      );
    });

    next();
  }
}
