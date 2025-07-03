import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const useGetUserPrefs = () => {
    return useQuery<string[]>({
        queryKey: ['usersColumns'],
        queryFn: () => axios.get('/api/user-prefs?key=usersCols').then(res => res.data),
        staleTime: Infinity
    })
};

export const useUpdateUserPrefs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (visibleFields: string[]) => {
            return axios.post('/api/user-prefs', { key: 'usersCols', visibleFields })
        },
        onSuccess: () => {
            enqueueSnackbar('Saved columns', { variant: 'success' })
            queryClient.invalidateQueries({ queryKey: ['usersColumns'] });
        },
        onError: () => {
            enqueueSnackbar('Unable to save columns', { variant: 'error' })
        }
    });
};