import React from 'react';

interface ThemeListItemProps {
  themeName: string;
  onSelect: () => void;
  onEdit: (oldThemeName: string, newThemeName: string) => void;
  onDelete: () => void;
}

function ThemeListItem({ themeName, onSelect, onEdit, onDelete }: ThemeListItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newThemeName, setNewThemeName] = React.useState(themeName);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick() {
    onEdit(themeName, newThemeName);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setIsEditing(false);
    setNewThemeName(themeName);
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input type="text" value={newThemeName} onChange={(e) => setNewThemeName(e.target.value)} />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <span onClick={onSelect}>{themeName}</span>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </li>
  );
}

export default ThemeListItem;