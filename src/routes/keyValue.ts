import { Router, Request, Response, NextFunction } from 'express';
import { Description, DescriptionErrors } from '../enums';
import { schemaForStorageWithValue, schemaForStorage } from '../schema';
import { validationMiddleware } from '../validation';
import { GoodResponse, BadResponse } from '../models';
import { KeyValueService } from '../services';

export class KeyValueRoute {
    keyValueService: KeyValueService;

    constructor(keyValueService: KeyValueService) {
        this.keyValueService = keyValueService;
    }

    route() {
        const router: Router = Router();

        router.post(
            '/add',
            validationMiddleware(schemaForStorageWithValue),
            async (req: Request, res: Response, next: NextFunction) => {
                const { key, value, ttl } = req.body;
                this.keyValueService.add(key, value, ttl);
                res.json(new GoodResponse(Description.Add, value, key).get());
            }
        );

        router.post(
            '/get',
            validationMiddleware(schemaForStorage),
            async (req: Request, res: Response, next: NextFunction) => {
                const { key } = req.body;
                const value: String | Promise<String> = await this.keyValueService.get(key);
                res.json(new GoodResponse(Description.GetByKey, value, key).get());
            }
        );

        router.delete(
            '/delete',
            validationMiddleware(schemaForStorage),
            async (req: Request, res: Response, next: NextFunction) => {
                const { key } = req.body;
                const value: String | Promise<String> = await this.keyValueService.get(key);
                if (value) {
                    await this.keyValueService.delete(key);
                    res.json(new GoodResponse(Description.DeleteByKey, undefined, key).get());
                } else {
                    res.status(400).json(new BadResponse(DescriptionErrors.DeleteByKey).get());
                }
            }
        );
        return router;
    }
}
