import { IUseCase } from "src/modules/@shared/usecase/use-case.interface";
import { IAddClientInputDto, IAddClientOutputDto } from "./add-client.usecase.dto";
import { IClientGateway } from "../../gateway/client.gateway";
import { Client } from "../../domain/client.entity";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object";

export class AddClientUseCase implements IUseCase<IAddClientInputDto, IAddClientOutputDto> {
    constructor(
        private readonly clientRepository: IClientGateway
    ) {}

    async execute(input: IAddClientInputDto): Promise<IAddClientOutputDto> {
        const client = new Client({
            name: input.name,
            email: input.name,
            address: input.address
        })

        await this.clientRepository.add(client)

        return {
            id: client.id.id,
            name: client.name,
            email: client.name,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}