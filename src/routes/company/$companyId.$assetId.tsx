import { createFileRoute, useParams } from '@tanstack/react-router'
import { useAppSelector } from '../../app/store';
import { shallowEqual, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setComponentById } from '../../features/companyTree/companyTreeSlicer';
import SensorType from '../../components/Icons/sensor-type';

export const Route = createFileRoute('/company/$companyId/$assetId')({
  params: {
    parse: (params) => ({
      assetId: params.assetId
    }),
    stringify: ({ assetId }) => ({ assetId: `${assetId}` })
  },
  component: AssetsSection
})

function AssetsSection() {
  const { assetId } = useParams({ from: '/company/$companyId/$assetId' });
  const { companyId } = useParams({ from: '/company/$companyId' });
  const component = useAppSelector((state) => state.companyTree.componentById, shallowEqual)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setComponentById(assetId))
    
  }, [assetId])
  useEffect(() => {
    dispatch(setComponentById(""))
  }, [companyId])
    return (
      <section className='w-full h-[80vh] border border-gray-200 border-solid rounded-sm flex flex-row'>
          <div className='border-b border-solid border-gray-200 flex flex-row gap-2'>
            {component?.name} 
            <SensorType status={component?.status!} sensorType={component?.sensorType!} />
          </div>
      </section>
    )
}