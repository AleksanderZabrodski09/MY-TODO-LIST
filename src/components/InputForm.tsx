import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button, TextField} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const InputForm = memo(({addItem}: { addItem: (title: string) => void }) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    console.log('addItem called1')

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
    if(error)setError(null)
    if (e.key === "Enter") {
      addItemHandler();
    }
  }

  return (
    <div>
      <TextField
        label='Enter title'
        variant='standard'
        value={title}
        onChange={onChangeTitleHandler}
        onKeyPress={onKeyPressHandler}
        // className={error ? 'error' : ''}
        error={!!error}
      />
      <Button onClick={addItemHandler}
              variant='contained'
              style={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}}>+
      </Button>
      {/*{error && <div className='errorMessage'>{error}</div>}*/}

    </div>
  )
})