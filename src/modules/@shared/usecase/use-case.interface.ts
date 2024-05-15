export interface IUseCase<T, P> {
    execute(input: T): Promise<P>
}