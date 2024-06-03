import { Request, Response } from "express";
import { PlaceOrderUseCaseFactory } from "src/modules/checkout/usecase/place-order/factory/place-order.useCase.factory";
import { IPlaceOrderInputDto } from "src/modules/checkout/usecase/place-order/place-order.dto";

export class CheckoutController {
    async create(req: Request, res: Response) {
        try {
            const usecase = PlaceOrderUseCaseFactory.create()
            const input: IPlaceOrderInputDto = {
                clientId: req.body.clientId,
                products: req.body.products
            }
            const output = await usecase.execute(input);
            res.send(output);
        } catch (error) {
            console.log('CheckoutController', error)
            res.status(500).send(error)
        }
    }
}