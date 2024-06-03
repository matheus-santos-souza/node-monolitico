import { Request, Response } from "express";
import { IFindInvoiceFacadeInputDTO } from "src/modules/invoice/facade/invoice.facade.dto";
import { InvoiceRepository } from "src/modules/invoice/repository/invoice.repository";
import { FindInvoiceUseCase } from "src/modules/invoice/usecase/find-invoice/find-invoice.usecase";

export class InvoiceController {
    async create(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const usecase = new FindInvoiceUseCase(new InvoiceRepository())
            const input: IFindInvoiceFacadeInputDTO = {
                id: id
            }
            const output = await usecase.execute(input);
            res.send(output);
        } catch (error) {
            console.log('InvoiceController', error)
            res.status(500).send(error)
        }
    }
}