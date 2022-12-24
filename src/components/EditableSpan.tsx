import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';

export const EditableSpan =memo( ({value, callBack}: { value: string, callBack: (value: string) => void }) => {
  // console.log('addItem Span')
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
    ? <TextField
      variant='standard'
      value={newTitle}
      onChange={onChangeHandler}
      onBlur={viewMode}
      autoFocus
      onKeyPress={onKeyPressHandler}
    />
    : <span onDoubleClick={activateEditMode}>{newTitle}</span>
})