import { Client } from "../domain/client.entity";

export interface IClientGateway {
    add(client: Client): Promise<void>;
    find(id: string): Promise<Client>;
}