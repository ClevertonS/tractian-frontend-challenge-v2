import { createRootRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import LogoTractian from '../assets/LOGO TRACTIAN.svg'
import HeaderLink from '../components/header-link'
import { useEffect } from 'react'
import { iCompany } from '../interfaces/iCompany'
import { useAppDispatch, useAppSelector } from '../app/store'
import { setCompaniesArray } from '../features/companies/companiesSlicer'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const companies = useAppSelector((state) => state.companies)
  const dispatch = useAppDispatch()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_FAKE_API}/companies`);
        if (!response.ok) {
          throw new Error("Ohhh no. There's nothing here...");
        }
        const result: iCompany[] = await response.json();
        dispatch(setCompaniesArray(result))
        location.pathname == "/" && navigate({ to: `/company/${result[0].id}`})
        
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);



  return (
    <main className='flex flex-col bg-gray-150 w-screen h-screen'>
      <header className='w-full flex items-center justify-between py-3 px-4 bg-plataform-header bg-background-plataform-header '>
        <img src={LogoTractian} alt="Logo Tractian" />
        <div className='flex flex-row gap-[10px]'>
          {companies.map((value) => (
            <HeaderLink key={value.id} companyName={value.name} to={`/company/${value.id}`} />
          ))}
        </div>
      </header>
      <div className='m-2'>
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </main>
  )
}