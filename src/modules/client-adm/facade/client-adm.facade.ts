import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";
import { IAddClientFacadeInputDto, IAddClientFacadeOutputDto, IFindClientFacadeInputDto, IFindClientFacadeOutputDto } from "./client-adm.facade.dto";
import { IClientAdmFacade } from "./client-adm.facade.interface";

export class ClientAdmFacade implements IClientAdmFacade {
    constructor(
        private readonly addClientUseCase: AddClientUseCase,
        private readonly findClientUseCase: FindClientUseCase,
    ) {}

    async add(input: IAddClientFacadeInputDto): Promise<IAddClientFacadeOutputDto> {
        const client = await this.addClientUseCase.execute({
            name: input.name,
            email: input.name,
            address: input.address
        })

        return {
            id: client.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }

    async find(input: IFindClientFacadeInputDto): Promise<IFindClientFacadeOutputDto> {
        const client = await this.findClientUseCase.execute({
            clientId: input.clientId
        })

        return {
            id: client.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }
}