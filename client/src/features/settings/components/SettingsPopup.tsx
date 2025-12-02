import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useUiContext } from '@/context/UiContext'
import SettingsOptionsMenu from './SettingsOptionsMenu';
import { X } from 'lucide-react';
import General from '../OptionsPage/General';
import DataControll from '../OptionsPage/DataControll';
import Profile from '../OptionsPage/Profile';
import About from '../OptionsPage/About';
import ModelUsage from '../OptionsPage/ModelUsage';

const SettingsPopup = () => {
    const { setIsSettingsPopupOpen } = useUiContext();
    const [selectedSection, setSelectedSection] = useState<string>("general");

    const renderSettingsContent = () => {
        switch (selectedSection) {
            case "general":
                return (
                    <General />
                );

            case "profile":
                return (
                    <Profile />
                );
            case "data-control":
                return (
                    <DataControll />
                );
            case "personalisation":
                return (
                    <div className="px-6">
                        <h2 className="text-2xl font-bold mb-4">Personalisation</h2>
                        <p className="text-muted-foreground">Customize your application appearance and behavior.</p>
                    </div>
                );
            case "usage":
                return (
                    <ModelUsage />
                );
            case "about":
                return (
                    <About />
                );
            default:
                return (
                    <General />
                );
        }
    };

    return (
        <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-80'
        >
            {/*  this is to close the settings popup when clicking outside of it */}
            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-xs backdrop-brightness-75 z-80"
                onClick={() => setIsSettingsPopupOpen(false)}
            ></div>

            <Card className="relative z-80 w-2/3 h-1/2 pt-0 gap-0">
                <div className="flex justify-between w-full h-18 py-5 px-3">
                    <h1 className="text-xl items-center flex ml-3 select-none">Settings</h1>
                    <button className="ml-2 rounded-full p-1 hover:bg-accent/50 size-8 flex items-center justify-center transition-colors"
                        onClick={() => setIsSettingsPopupOpen(false)}
                    >
                        <X size={22} />
                    </button>
                </div>
                <CardContent className='flex w-full h-full px-3'>
                    <SettingsOptionsMenu onSectionChange={setSelectedSection} />
                    <div className="flex-1 overflow-auto">
                        {renderSettingsContent()}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SettingsPopup