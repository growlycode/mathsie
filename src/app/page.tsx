'use client'
import dynamic from 'next/dynamic';
import { MathPDF } from './pdf';
import { useState } from 'react';



const Pdf = dynamic(() => import("./pdf"), {
  ssr: false,
});


const Home = () => {
    
  const [numToGenerate, setNumToGenerate] = useState<number>(10);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(20);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className='flex md:flex-wrap gap-1 w-full grow  gap-3'>
        <div className="flex gap-2.5 flex-col py-4">
          <label className='flex gap-1.5 justify-between'>
            <span className="pr-2.5">Number to generate</span>
            <select onChange={(e) => setNumToGenerate(Number(e.currentTarget.value))}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>100</option>
              <option value={200}>200</option>
            </select>
          </label>
          <label className='flex gap-1.5 justify-between'>
            <span className="pr-2.5">From</span>
            <input defaultValue={from} size={3} onChange={(e) => setFrom(Number(e.currentTarget.value))} />
            <span className="pr-2.5">To</span>
            <input defaultValue={to} size={3} onChange={(e) => setTo(Number(e.currentTarget.value))} />
          </label>
        </div>

        <div className="flex w-96">
          <Pdf>
            <MathPDF numberToGenerate={numToGenerate} from={from} to={to} />
          </Pdf>
        </div>
      </div>


    </main>
  )
}

export default Home;
