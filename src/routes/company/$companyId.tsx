import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { fetchCompanyById } from "../../utils/utils";

export const Route = createFileRoute('/company/$companyId')({
    params: {
        parse: (params) => ({
            companyId: params.companyId
    }),
    stringify: ({companyId}) => ({companyId: `${companyId}`})
},
    loader: ({params: {companyId}}) => fetchCompanyById(companyId),
    component: Company
  })

function Company()
{
    const loaderData = useLoaderData({ from: '/company/$companyId' });
    return(
        <h1>{loaderData}</h1>
    )
}


