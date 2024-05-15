import { IClientGateway } from "../../gateway/client.gateway";
import { AddClientUseCase } from "./add-client.usecase";
import { IAddClientInputDto } from "./add-client.usecase.dto";

class ClientRepositoryMock implements IClientGateway {
    add = jest.fn();
    find = jest.fn();
}
describe("AddClientUseCase unit test", () => {
    let clientRepository: ClientRepositoryMock

    beforeEach(() => {
        clientRepository = new ClientRepositoryMock()
    })

    it("should add a client", async () => {
        const useCase = new AddClientUseCase(clientRepository);

        const input: IAddClientInputDto = {
            name: "Client 1",
            email: "email@email.com",
            address: "Address 1"
        }

        const output = await useCase.execute(input)

        expect(clientRepository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined()
    })

})