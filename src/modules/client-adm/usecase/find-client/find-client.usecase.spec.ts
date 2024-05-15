import { Id } from "src/modules/@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { IClientGateway } from "../../gateway/client.gateway";
import { IFindClientInputDto } from "./find-client.usecase.dto";
import { FindClientUseCase } from "./find-client.usecase";

class ClientRepositoryMock implements IClientGateway {
    add = jest.fn();
    find = jest.fn();
}
describe("FindClientUseCase unit test", () => {
    let clientRepository: ClientRepositoryMock

    beforeEach(() => {
        clientRepository = new ClientRepositoryMock()
    })

    it("should find client", async () => {
        const client = new Client({
            id: new Id("1"),
            email: "email@email.com",
            name: "Client 1",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        })
        clientRepository.find.mockResolvedValue(client)
        const useCase = new FindClientUseCase(clientRepository)

        const input: IFindClientInputDto = {
            clientId: client.id.id
        }
        const output = await useCase.execute(input)

        expect(clientRepository.find).toHaveBeenCalled()
        expect(output.id).toBe(client.id.id)
        expect(output.name).toBe(client.name)
        expect(output.email).toBe(client.email)
        expect(output.address).toBe(client.address)
        expect(output.createdAt).toBe(client.createdAt)
        expect(output.updatedAt).toBe(client.updatedAt)
    })
})