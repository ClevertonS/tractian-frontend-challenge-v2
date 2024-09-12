import { createFileRoute, useParams } from '@tanstack/react-router'
import { useAppSelector } from '../../app/store';
import { shallowEqual, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setComponentById } from '../../features/companyTree/companyTreeSlicer';
import SensorType from '../../components/Icons/sensor-type';
import InputImage from '../../assets/Add image.png'
import SensorIcon from '../../assets/icons/Sensor.svg'
import RouterIcon from '../../assets/icons/MdOutlineRouter.svg'

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
  }, [assetId, component, dispatch])

  useEffect(() => {
    dispatch(setComponentById(""))
  }, [companyId, dispatch])
  return (
    <section className='w-full h-[80vh] border border-gray-200 border-solid rounded-sm flex flex-col'>
      <div className='px-4 py-3 border-b border-solid border-gray-200 flex flex-row items-center gap-2'>
        <h2 className='font-semibold text-lg text-gray-950'>{component?.name}</h2>
        <SensorType status={component?.status ? component.status : null} sensorType={component?.sensorType ? component.sensorType : null} />
      </div>
      <div className='flex flex-col p-6 w-full max-h-min'>
        <div className='flex flex-row gap-6'>
          <img className='object-contain' src={InputImage} alt="Era pra ser um Input" />
          <div className='flex flex-col justify-around w-full'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-gray-950 font-semibold'>Tipo de Equipamento</h3>
              <p className='text-gray-600 opacity-90 '>[EQUIPAMENTO.TIP]</p>
            </div>
            <span className='border-b border-solid border-gray-200' />
            <div className='flex flex-col gap-2'>
              <h3 className='text-gray-950 font-semibold'>Responsáveis</h3>
              <p className='text-gray-600 opacity-90 '><b className='bg-blue-500 px-[10px] py-1 rounded-full mr-2 text-white'>E</b>[RESPONSÁVEL]</p>
            </div>
          </div>
          
        </div>
        <span className='border-b border-solid border-gray-200 my-6' />
          <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-2 w-full'>
              <h3 className='text-gray-950 font-semibold'>Sensor</h3>
              <div className='flex flex-row gap-2 items-center'>
                <img src={SensorIcon} alt="icone de Sensor" />
                <p className='text-gray-600 opacity-90 '>{component?.sensorId}</p>
              </div>
              
            </div>
            <div className='flex flex-col gap-2 w-full'>
            <h3 className='text-gray-950 font-semibold'>Receptor</h3>
              <div className='flex flex-row gap-2 items-center'>
                <img src={RouterIcon} alt="icone de Sensor" />
                <p className='text-gray-600 opacity-90 '>{component?.gatewayId}</p>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}