import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { useAppSelector } from "../../app/store";
import SecundaryButton from "../../components/secundaryButton";
import SearchBar from "../../components/search-bar";

import { useState } from "react";
import useTreeSearch from "../../hooks/useTreeSearch";
import DropdownTree from "../../components/dropdown-tree";
import { useDispatch } from "react-redux";
import { setIsAlertFilter, setIsSensorFilter } from "../../features/companyTree/companyTreeSlicer";


export const Route = createFileRoute('/company/$companyId')({
    params: {
        parse: (params) => ({
            companyId: params.companyId
        }),
        stringify: ({ companyId }) => ({ companyId: `${companyId}` })
    },
    component: Company
})

function Company() {
    const { companyId } = useParams({ from: '/company/$companyId' });
    const company = useAppSelector((state) => state.companies.allCompanys.find((company) => company.id == companyId))
    const dispatch = useDispatch()
    const [, setTreeSearch] = useTreeSearch();
    const [searchValue, setSearchValue] = useState("")
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setTreeSearch(event.target.value)
    };
    const [sensorTypeButtonFilterIsActive, setSensorTypeButtonFilterIsActive] = useState(false)
    const [statusTypeButtonFilterIsActive, setStatusTypeButtonFilterIsActive] = useState(false)

    function handlerSensorTypeFilter(){
        setSensorTypeButtonFilterIsActive(!sensorTypeButtonFilterIsActive)
        dispatch(setIsSensorFilter(!sensorTypeButtonFilterIsActive))
    }

    function handlerAlertTypeFilter(){
        setStatusTypeButtonFilterIsActive(!statusTypeButtonFilterIsActive)
        dispatch(setIsAlertFilter(!statusTypeButtonFilterIsActive))
    }

    return (
        <section className='w-full h-min flex flex-col gap-3 rounded border p-4 border-solid border-border-card bg-white'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <p className='text-sm text-gray-600 align-middle'><b className='text-gray-950 text-xl font-semibold'>Ativos</b> / {`${company?.name}`}</p>
                </div>
                <div className="flex flex-row gap-2 rounded-[3px]">
                    <SecundaryButton criteria="sensorType" isActivated={sensorTypeButtonFilterIsActive} onClick={handlerSensorTypeFilter}>Sensor de Energia</SecundaryButton>
                    <SecundaryButton criteria="status" isActivated={statusTypeButtonFilterIsActive} onClick={handlerAlertTypeFilter}>Crítico</SecundaryButton>
                </div>
            </div>
            <div className="flex flex-row gap-2 h-[80vh]">
                <div className="w-1/3 h-full border border-solid border-gray-150 rounded-sm flex flex-col">
                    <SearchBar value={searchValue} onChange={handleSearchChange} />
                    <DropdownTree />
                </div>
                <Outlet />
            </div>
        </section>
    )
}
