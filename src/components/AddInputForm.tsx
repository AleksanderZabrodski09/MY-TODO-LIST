import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

export type AddInputFormType = {
  addInput: (title: string) => void
}
export const AddInputForm: React.FC<AddInputFormType> = (props) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addInput = () => {
    if (title.trim() !== '') {
      props.addInput(title.trim())
      setTitle('')

    } else {
      setError('Title is required')
    }
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      addInput()
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <div>
      <TextField
        label='Enter title'
        variant='standard'
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        // className={error ? 'error' : ''}
        error={!!error}
        helperText={error}
      />
      <Button variant='contained' color='primary' style={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}} onClick={addInput}>+</Button>

      {/*{error && <div className={'errorMessage'} >{error}</div>}*/}
    </div>
  )
}