import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
      <button onClick={addItemHandler}>+</button>
      {error && <div className='errorMessage'>{error}</div>}

    </div>
  )
}