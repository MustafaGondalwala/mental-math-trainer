import { createContext, ReactNode, useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'settings';

interface Settings {
  darkMode: boolean;
}

const defaultSettings: Settings = {
  darkMode: true
};

const SettingsContext = createContext({
  settings: defaultSettings,
  setSettings: (_: Settings) => {}
});

function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);
  // Load the settings from local storage.
  useEffect(() => {
    const settings = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (settings === null) {
      return;
    }
    setSettings(JSON.parse(settings));
  }, []);
  // Update localStorage when the settings change.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <div className={settings.darkMode ? 'dark' : undefined}>{children}</div>
    </SettingsContext.Provider>
  );
}

export { SettingsContext, SettingsProvider };
