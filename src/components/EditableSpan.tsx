import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export const EditableSpan = ({value, callBack}: { value: string, callBack: (value: string) => void }) => {
  const [editMode, setEditMode] = useState(false)
  let [newTitle, setNewTitle] = useState(value)

  const activateEditMode = () => {
    setEditMode(true)
    setNewTitle(value)
  }
  const viewMode = () => {
    setEditMode(false)
    callBack(newTitle.trim())
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      viewMode()
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  return editMode
    ? <input
      value={newTitle}
      onChange={onChangeHandler}
      onBlur={viewMode}
      autoFocus
      onKeyPress={onKeyPressHandler}
    />
    : <span onDoubleClick={activateEditMode}>{newTitle}</span>
}