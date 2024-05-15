import { IUseCase } from "src/modules/@shared/usecase/use-case.interface";
import { IFindClientInputDto, IFindClientOutputDto } from "./find-client.usecase.dto";
import { IClientGateway } from "../../gateway/client.gateway";

export class FindClientUseCase implements IUseCase<IFindClientInputDto, IFindClientOutputDto> {
    constructor(
        private readonly clientRepository: IClientGateway
    ) {}
    
    async execute(input: IFindClientInputDto): Promise<IFindClientOutputDto> {
        const client = await this.clientRepository.find(input.clientId);

        if (!client) {
            throw new Error(`Client not exists!`)
        }

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}