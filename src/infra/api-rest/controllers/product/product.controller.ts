import { Request, Response } from "express";
import { AddProductUseCase } from "../../../../modules/product-adm/usecase/add-product/add-product.usecase";
import { ProductRepository } from "../../../../modules/product-adm/repository/product.repository";
import { IAddProductInputDto } from "../../../../modules/product-adm/usecase/add-product/add-product.dto";

export class ProductController {
    async create(req: Request, res: Response) {
        try {
            const usecase = new AddProductUseCase(new ProductRepository());
            const input: IAddProductInputDto = {
                id: req.body.id,
                name: req.body.name,
                description: req.body.description,
                purchasePrice: req.body.purchasePrice,
                stock: req.body.stock
            }

            const output = await usecase.execute(input);
            res.send(output);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}