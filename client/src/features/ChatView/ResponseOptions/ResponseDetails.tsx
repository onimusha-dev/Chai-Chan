import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { PopoverStats } from '@/types/response'
import { ArrowBigDownDash, ArrowBigUpDash, ArrowDownUp, AudioLines, Info } from 'lucide-react'

const ResponseDetails = ({ meta }: { meta: PopoverStats }) => {
  return (
    <Popover>
      <PopoverTrigger
        className={`flex cursor-pointer items-center justify-center size-8 z-50 rounded-lg opacity-30 hover:bg-accent hover:opacity-100 transition-all duration-150 ease-in-out`}
      >
        <Info size={18} />
      </PopoverTrigger>
      <PopoverContent className='mb-15 shadow-2xl'>
        <div className="flex pb-3 gap-2 justify-between">

          {/*  this is the tokens count */}
          <div className="flex gap-3 select-none">
            <div className="flex items-center gap-2 justify-between text-sm font-medium">
              <span><ArrowBigDownDash size={18} className='text-green-600' /> </span>
              <span className="opacity-70">{meta.prompt_eval_count}</span>
            </div>

            <div className="flex items-center gap-2 justify-between text-sm font-medium">
              <span><ArrowBigUpDash size={18} className='text-red-600' /></span>
              <span className="opacity-70">{meta.eval_count}</span>
            </div>
          </div>

          <div className="flex items-center select-none gap-2 justify-between text-sm font-medium">
            <span className='relative flex'>
              <ArrowBigDownDash size={18} className='absolute -left-4 text-green-600' />

              <ArrowBigUpDash size={18} className='text-red-600' />
            </span>
            <span className="opacity-70">{meta.prompt_eval_count + meta.eval_count}</span>
          </div>
        </div>

        {/* this is the extra data */}
        <div className="flex justify-between">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Load time: &nbsp;</span>
            <span className="opacity-70">{(meta.load_duration / 1_000_000_000).toFixed(2)}s</span>
          </div>
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Rate: &nbsp;</span>
            <span className="opacity-70">{
              ((meta.eval_count + meta.prompt_eval_count) / (meta.total_duration / 1_000_000_000)).toFixed(2)
            } /s</span>
          </div>
        </div>

        <div className="flex text-sm mt-2">
          <span className="font-bold">
            Model: &nbsp;
          </span>
          <span className='opacity-60'>
            {meta.model}
          </span>
        </div>
          <p className="text-xs select-none opacity-60 pt-2">
            Data is calculated at run time, may inaccurate sometimes.
          </p>
      </PopoverContent>
    </Popover>
  )
}

export default ResponseDetails