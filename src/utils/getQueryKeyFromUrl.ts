import { Params } from "react-router-dom";

export const getQuery = (urlParams: Params<string>) => {
    if (urlParams.cid)
        return {
            type: "conversation",
            param: urlParams.cid,
            queryKey: ["conversation", urlParams.cid],
        };

    if (urlParams.uid)
        return {
            type: "conversation-by-user",
            param: urlParams.uid,
            queryKey: ["conversation", "user", urlParams.uid],
        };
};
