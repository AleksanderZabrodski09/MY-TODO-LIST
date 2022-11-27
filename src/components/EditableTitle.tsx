import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type EditableTitle = {
  value: string
  callback: (title: string) => void
}
export const EditableTitle: React.FC<EditableTitle> = (props) => {

  const [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState('')


  const activateMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const viewMode = () => {
    setEditMode(false)
    props.callback(title.trim())
  }


  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    // setError(null)
    if (e.key === 'Enter') {
      viewMode()
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <input
      value={title} onChange={onChangeHandler}
      onBlur={viewMode} autoFocus
      onKeyPress={onKeyPressHandler}
    />
    : <span onDoubleClick={activateMode}>{props.value}</span>
}