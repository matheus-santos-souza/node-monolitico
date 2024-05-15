import { IAddProductFacadeInputDto, ICheckProductFacadeInputDto, ICheckProductFacadeOutputDto } from "./product-adm.facade.dto"

export interface IProductAdmFacade {
    addProduct(input: IAddProductFacadeInputDto): Promise<void>;
    checkStock(input: ICheckProductFacadeInputDto): Promise<ICheckProductFacadeOutputDto>;
}