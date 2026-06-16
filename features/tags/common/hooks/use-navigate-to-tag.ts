import {useRouter} from 'expo-router';

export const useNavigateToTag = () => {
    const router = useRouter();

    return {
        navigateToTag: (tagId: number) => {
            router.push(`/tag/${tagId}`);
        },
    };
};
