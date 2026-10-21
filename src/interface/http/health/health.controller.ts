import {
    Controller,
    Get,
    Version,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {

    @Get()
    @Version('1')
    check() {

        return {
            status: 'UP',
            service: 'Combos API',
            timestamp: new Date(),
        };

    }

}
