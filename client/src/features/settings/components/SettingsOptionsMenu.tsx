import { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface SettingsSection {
    id: string;
    label: string;
}

const settingsSections: SettingsSection[] = [
    {
        id: "general",
        label: "General"
    },
    {
        id: "profile",
        label: "Profile"
    },
    {
        id: "usage",
        label: "Usage"
    },
    {
        id: "personalisation",
        label: "Personalisation"
    },
    {
        id: "data-control",
        label: "Data Control"
    },
    {
        id: "about",
        label: "About"
    },

];

interface SettingsOptionsMenuProps {
    onSectionChange?: (sectionId: string) => void;
}

const SettingsOptionsMenu = ({ onSectionChange }: SettingsOptionsMenuProps) => {
    const [selectedSection, setSelectedSection] = useState<string>("general");

    const handleSectionClick = (sectionId: string) => {
        setSelectedSection(sectionId);
        onSectionChange?.(sectionId);
    };

    return (
        <nav className='flex flex-col h-full w-fit items-start justify-start pr-3'>
            <SidebarMenu className="w-full gap-2 ">
                {settingsSections.map((section) => (
                    <SidebarMenuItem key={section.id}>
                        <SidebarMenuButton
                            onClick={() => handleSectionClick(section.id)}
                            className={`
                                text-base py-2 px-3 w-full justify-start h-auto
                                transition-all duration-150 ease-in-out rounded-lg
                                ${selectedSection === section.id && 'bg-accent shadow-md'}
                                focus-visible:outline-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                                cursor-pointer group font-semibold
                            `}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleSectionClick(section.id);
                                }
                            }}
                        >
                            <span>
                                {section.label}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </nav>
    );
};

export default SettingsOptionsMenu;