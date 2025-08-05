import React, { createContext, useContext, useState } from 'react';

// Types
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

// Context
const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// Components
const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList: React.FC<TabsListProps> = ({ children, className = "" }) => (
  <div className={`flex bg-yellow-800/10 rounded-lg p-1 ${className}`}>
    {children}
  </div>
);

const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  value, 
  children, 
  className = "",
  disabled = false
}) => {
  const { activeTab, setActiveTab } = useTabsContext();
  
  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type="button"
      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
        activeTab === value 
          ? 'bg-yellow-500 text-black' 
          : 'text-gray-300 hover:text-white hover:bg-yellow-800/20'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = "" }) => {
  const { activeTab } = useTabsContext();
  
  if (activeTab !== value) return null;
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };