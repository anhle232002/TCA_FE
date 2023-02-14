import { DefaultOptions, QueryClient } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
    queries: {
        useErrorBoundary: false,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: Infinity,
    },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
