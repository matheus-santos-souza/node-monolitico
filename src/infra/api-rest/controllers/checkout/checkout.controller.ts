import { Request, Response } from "express";
import { AddClientUseCase } from "src/modules/client-adm/usecase/add-client/add-client.usecase";
import { ClientRepository } from "src/modules/client-adm/repository/client.repository";
import { IAddClientInputDto } from "src/modules/client-adm/usecase/add-client/add-client.usecase.dto";
import Address from "src/modules/@shared/domain/value-object/address.value-object";

export class CheckoutController {
    async create(req: Request, res: Response) {
        try {
            const usecase = new AddClientUseCase(new ClientRepository());
            const address = new Address(
                req.body.street,
                req.body.number,
                req.body.complement,
                req.body.city,
                req.body.state,
                req.body.zipCode
            )
            const input: IAddClientInputDto = {
                name: req.body.name,
                address,
                document: req.body.document,
                email: req.body.email,
            }
            
            const output = await usecase.execute(input);
            res.send(output);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}