import {createTypedContainer} from '@/common/infra/awilix';
import {Dependencies} from '@/common/infra/dependencies';
import {makeDepsContainer} from '@/common/infra/deps-container';
import {
    FC,
    ReactNode,
    createContext,
    useCallback,
    useMemo,
    useState,
} from 'react';

type DepsContextActions = {
    disposeCachedDependencies: () => void;
};
export const DepsContext = createContext<{
    depsContainer: ReturnType<typeof createTypedContainer<Dependencies>>;
    version: number;
    actions: DepsContextActions;
} | null>(null);

type DepsProviderProps = {
    children?: ReactNode;
};
export const DepsProvider: FC<DepsProviderProps> = ({children}) => {
    const [version, setVersion] = useState(0);
    const depsContainer = useMemo(() => makeDepsContainer(), []);

    const disposeCachedDependencies = useCallback(
        () =>
            depsContainer
                .dispose()
                .then(() => setVersion((version) => version + 1)),
        [depsContainer],
    );

    return (
        <DepsContext.Provider
            value={{
                depsContainer,
                version,
                actions: {disposeCachedDependencies},
            }}>
            {children}
        </DepsContext.Provider>
    );
};
