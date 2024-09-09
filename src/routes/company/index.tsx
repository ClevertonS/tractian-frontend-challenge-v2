import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/')({
  component: HeaderCompany
})

function HeaderCompany()
{
  return(
    <section className='w-full h-10 rounded border border-solid border-border-card bg-white'>

    </section>
  )
}