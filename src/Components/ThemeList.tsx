import React from 'react';
import ThemeListItem from './ThemeListItem';

interface Props {
  themes: string[];
  onThemeSelect: (themeName: string) => void;
  onThemeEdit: (oldThemeName: string, newThemeName: string) => void;
  onThemeDelete: (themeName: string) => void;
  selectedTheme: string;
}

function ThemeList({ themes, onThemeSelect, onThemeEdit, onThemeDelete, selectedTheme }: Props) {
  function handleThemeEdit(oldThemeName: string, newThemeName: string) {
    if (oldThemeName !== newThemeName) {
      onThemeEdit(oldThemeName, newThemeName);
    }
  }

  return (
    <div>
      {themes.map((theme) => (
        <ThemeListItem
          key={theme}
          themeName={theme}
          onSelect={() => onThemeSelect(theme)}
          onEdit={handleThemeEdit}
          onDelete={() => onThemeDelete(theme)}
          selectedTheme={selectedTheme}
        />
      ))}
    </div>
  );
}

export default ThemeList;