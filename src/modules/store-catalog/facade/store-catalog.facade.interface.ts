import { IFindAllStoreCatalogFacadeInputDto, IFindAllStoreCatalogFacadeOutputDto, IFindStoreFacadeInputDto, IFindStoreFacadeOutputDto } from "./store-catalog.facade.dto"

export interface IStoreCatalogFacade {
    find(input: IFindStoreFacadeInputDto): Promise<IFindStoreFacadeOutputDto>
    findAll(input: IFindAllStoreCatalogFacadeInputDto): Promise<IFindAllStoreCatalogFacadeOutputDto>
}