import { useTheme } from '@/components/theme/theme-provider'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Computer, Moon, Sun } from 'lucide-react'


const General = () => {
    const { setTheme, theme } = useTheme()

    return (
        <section className='pl-3'>
            <h3 className="text-sm select-none">Theme</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <button className={`${theme === 'light' ? 'bg-foreground/5' : ''}
                col-span-1 hover:bg-foreground/5 border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-in-out`}
                onClick={() => setTheme('light')}>
                    <Sun />
                    <p>Light</p>
                    </button>
                <button className={`${theme === 'dark' ? 'bg-foreground/5' : ''}
                col-span-1 hover:bg-foreground/5 border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-in-out`}
                onClick={() => setTheme('dark')}>
                    <Moon />
                    <p>Dark</p>
                </button>
                <button className={`${theme === 'system' ? 'bg-foreground/5' : ''}
                col-span-1 hover:bg-foreground/5 border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-in-out`}
                onClick={() => setTheme('system')}>
                    <Computer />
                    <p>System</p>
                </button>
            </div>
            <div className="flex mt-5 justify-between">
                <h3 className="select-none">Language</h3>
                <NativeSelect className='rounded-full border-0'>
                    <NativeSelectOption value="english">English</NativeSelectOption>
                    <NativeSelectOption value="japanese">Japanese</NativeSelectOption>
                    <NativeSelectOption value="chinese">Chinese</NativeSelectOption>
                    <NativeSelectOption value="hindi">Hindi</NativeSelectOption>
                    <NativeSelectOption value="korean">Korean</NativeSelectOption>
                </NativeSelect>
            </div>
        </section>
    )
}

export default General