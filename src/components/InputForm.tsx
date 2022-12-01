import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const InputForm = ({addItem}: { addItem: (title: string) => void }) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      addItemHandler();
    }
  }

  return (
    <div>
      <input
        value={title}
        onChange={onChangeTitleHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <Button onClick={addItemHandler}
              variant='contained'
              style={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}}>+
        {/*<AddBoxIcon/>*/}
      </Button>
      {error && <div className='errorMessage'>{error}</div>}

    </div>
  )
}