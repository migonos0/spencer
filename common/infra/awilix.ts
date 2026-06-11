import {ContainerOptions, createContainer, Resolver} from 'awilix';

export const createTypedContainer = <T extends Object>(
    containerOptions?: ContainerOptions,
) => {
    const container = createContainer<T>(containerOptions);
    return {
        ...container,
        register: (registrations: {[K in keyof T]?: Resolver<T[K]>}) => {
            return container.register(registrations);
        },
        resolve: <K extends keyof T>(key: K) => container.resolve(key) as T[K],
    };
};
