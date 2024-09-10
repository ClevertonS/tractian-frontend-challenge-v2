import { createFileRoute, Outlet, useLoaderData, useParams } from "@tanstack/react-router";
import { fetchCompanyById } from "../../utils/utils";
import { useAppSelector } from "../../app/store";
import SecundaryButton from "../../components/secundaryButton";
import SearchBar from "../../components/search-bar";
import { iTreeNodeLocations } from "../../interfaces/iTree";
import NodedDetails from "../../components/node-details";


export const Route = createFileRoute('/company/$companyId')({
    params: {
        parse: (params) => ({
            companyId: params.companyId
        }),
        stringify: ({ companyId }) => ({ companyId: `${companyId}` })
    },
    loader: ({ params: { companyId } }) => fetchCompanyById(companyId),
    component: Company
})

function Company() {
    const { companyId } = useParams({from: '/company/$companyId'});
    const loaderData: iTreeNodeLocations[] = JSON.parse(useLoaderData({ from: '/company/$companyId' }));
    const company = useAppSelector((state) => state.companies.find((company) => company.id == companyId))
    return (
        <section className='w-full h-min flex flex-col gap-3 rounded border p-4 border-solid border-border-card bg-white'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <p className='text-sm text-gray-600 align-middle'><b className='text-gray-950 text-xl font-semibold'>Ativos</b> / {`${company?.name}`}</p>
                </div>
                <div className="flex flex-row gap-2 rounded-[3px]">
                    <SecundaryButton Icon="Alert" isActivated={false} >Sensor de Energia</SecundaryButton>
                    <SecundaryButton Icon="Alert" isActivated={false} >Crítico</SecundaryButton>
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <div className="w-1/3 border border-solid border-gray-150 rounded-sm">
                    <SearchBar />
                    <div className="py-2 px-1">
                        {loaderData.map((node) => (
                            <NodedDetails key={node.id} node={node}/>
                        ))}
                    </div>
                </div>
                <Outlet />
            </div>
        </section>
    )
}
