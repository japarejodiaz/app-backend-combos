import { Injectable } from '@nestjs/common';

import * as QRCode from 'qrcode';

@Injectable()
export class QrGeneratorService {

  async generate(
    url: string,
  ): Promise<string> {

    return QRCode.toDataURL(url);

  }

}