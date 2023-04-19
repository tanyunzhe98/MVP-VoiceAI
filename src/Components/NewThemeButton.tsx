import React, { useState } from 'react';

interface NewThemeButtonProps {
  onAddTheme: (themeName:string) => void;
}

function NewThemeButton({ onAddTheme }: NewThemeButtonProps) {
  const [themeName, setThemeName] = useState('');

  const handleAddTheme = () => {
    if (themeName.trim()) {
      onAddTheme(themeName.trim());
      setThemeName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a new theme name"
        value={themeName}
        onChange={(event) => setThemeName(event.target.value)}
      />
      <button onClick={handleAddTheme}>Add</button>
    </div>
  );
}


export default NewThemeButton;
