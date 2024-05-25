import { IUseCase } from "src/modules/@shared/usecase/use-case.interface";
import { IAddClientInputDto, IAddClientOutputDto } from "./add-client.usecase.dto";
import { IClientGateway } from "../../gateway/client.gateway";
import { Client } from "../../domain/client.entity";
import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import Address from "src/modules/@shared/domain/value-object/address.value-object";

export class AddClientUseCase implements IUseCase<IAddClientInputDto, IAddClientOutputDto> {
    constructor(
        private readonly clientRepository: IClientGateway
    ) {}

    async execute(input: IAddClientInputDto): Promise<IAddClientOutputDto> {
        const client = new Client({
            id: new Id(input.id),
            name: input.name,
            email: input.email,
            document: input.document,
            address: new Address(
              input.address.street,
              input.address.number,
              input.address.complement,
              input.address.city,
              input.address.state,
              input.address.zipCode,
            )
        })

        await this.clientRepository.add(client)

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address(
              client.address.street,
              client.address.number,
              client.address.complement,
              client.address.city,
              client.address.state,
              client.address.zipCode,
            ),
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
          }
    }
}