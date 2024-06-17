'use client'
import dynamic from 'next/dynamic';
import { MathPDF, MathPDFProps, Operation, allOperations } from './pdf';
import { useState } from 'react';
import { range } from './infrastructure/math';
import { FormProvider, useForm } from 'react-hook-form';
import { NumCheck } from './components/number-check';


const Pdf = dynamic(() => import("./pdf"), {
  ssr: false,
});


const Home = () => {
  const defaultValues: MathPDFProps = {
    numberToGenerate: 10,
    operationIds: [],
    operationsSequential: true,
    specifyLeftOperands: false,
    specifyRightOperands: false,
    leftOperands: [],
    rightOperands: []
  };

  const [props, setProps] = useState<MathPDFProps>(defaultValues);

  const methods = useForm<MathPDFProps>({ defaultValues });
  const { register, handleSubmit, watch, formState: { errors } } = methods;

  const specifyLeftOperands = watch('specifyLeftOperands');
  const specifyRightOperands = watch('specifyRightOperands');

  const submit = (data: MathPDFProps) => {
    setProps(data);
  }

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">

      <div className='flex md:flex-wrap gap-1 w-full grow gap-3'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)}>

            <h1 className='text-xl pb-5'>Operations</h1>

            <div className='grid grid-rows-5 grid-flow-col gap-2'>
              <label className='flex gap-1.5 justify-between'>
                <span className="pr-2.5">Number to generate</span>
                <select
                  {...register('numberToGenerate', { required: true, valueAsNumber: true })}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>100</option>
                  <option value={200}>200</option>
                </select>
              </label>
              {allOperations.map((op) => (
                <label className='flex gap-1.5' key={`i` + op.id}>
                  <input type="checkbox" {...register('operationIds', { required: true })} value={op.id} /><span >{op.title}</span>
                </label>
              ))}
            </div>


            <div className="flex gap-2.5 flex-col py-4">


              <div className='flex gap-1.5 flex-col'>
                <h2 className="w-full text-lg mt-2">Operands</h2>

                {/* <label className='flex gap-1.5 justify-between'>
                <span className="pr-2.5">From</span>
                <input {...register('from', { required: true, valueAsNumber: true })} size={3} />
                <span className="pr-2.5">To</span>
                <input {...register('to', { required: true, valueAsNumber: true })} size={3} />
              </label> */}

                <label className='flex gap-1.5'>
                  <input type="checkbox" {...register('specifyLeftOperands')} /><span >Left operands</span>
                </label>
                {specifyLeftOperands &&

                  <div className='grid grid-rows-5 grid-flow-col gap-2'>

                    {range(1, 20).map((num) => (
                      <label className='flex gap-1.5' key={`lo${num}`}>
                        <NumCheck key={`i` + num} num={num} fieldName={'leftOperands'} />
                      </label>
                    ))}
                  </div>
                }

                <label className='flex gap-1.5'>
                  <input type="checkbox" {...register('specifyRightOperands')} /><span >Right operands</span>
                </label>
                {specifyRightOperands &&

                  <div className='grid grid-rows-5 grid-flow-col gap-2'>

                    {range(1, 20).map((num) => (
                      <label className='flex gap-1.5' key={`ro${num}`}>
                        <NumCheck key={`i` + num} num={num} fieldName={'rightOperands'} />
                      </label>
                    ))}
                  </div>
                }

              </div >
            </div>
            <button type="submit">OK</button>
          </form>
        </FormProvider>
        <div className="flex w-96">
          <Pdf>
            <MathPDF {...props} />
          </Pdf>
        </div>
      </div>


    </main >
  )
}

export default Home;
