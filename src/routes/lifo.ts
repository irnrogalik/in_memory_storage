import { Router, Request, Response, NextFunction } from 'express';
import { Description, DescriptionErrors } from '../enums';
import { validationMiddleware } from '../validation';
import { schemaForStack } from '../schema';
import { GoodResponse, BadResponse } from '../models';
import { LifoService } from '../services';

export class LifoRoute {
    lifoService: LifoService;

    constructor(lifoService: LifoService) {
        this.lifoService = lifoService;
    }

    route() {
        const router: Router = Router();

        router.post(
            '/add',
            validationMiddleware(schemaForStack),
            (req: Request, res: Response, next: NextFunction) => {
                const { value } = req.body;
                this.lifoService.add(value);
                res.json(new GoodResponse(Description.Add, value).get());
            });

        router.get(
            '/get',
            async (req: Request, res: Response, next: NextFunction) => {
                const value = await this.lifoService.get();
                if (value) {
                    res.json(new GoodResponse(Description.Get, value).get());
                } else {
                    res.status(400).json(new BadResponse(DescriptionErrors.Get).get());
                }
            });

        return router;
    }
}
