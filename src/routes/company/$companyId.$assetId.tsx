import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/$companyId/$assetId')({
  component: AssetsSection
})

function AssetsSection()
{
  return(
    <section className='w-full h-[80vh]'>

    </section>
  )
}