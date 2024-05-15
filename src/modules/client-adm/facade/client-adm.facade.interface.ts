import { 
    IAddClientFacadeInputDto, 
    IAddClientFacadeOutputDto, 
    IFindClientFacadeInputDto, 
    IFindClientFacadeOutputDto 
} from "./client-adm.facade.dto";

export interface IClientAdmFacade {
    add(input: IAddClientFacadeInputDto): Promise<IAddClientFacadeOutputDto>;
    find(input: IFindClientFacadeInputDto): Promise<IFindClientFacadeOutputDto>;
}