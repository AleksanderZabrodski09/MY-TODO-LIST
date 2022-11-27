import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddInputForm = {
  addInput: (title: string) => void
}
export const AddInputForm: React.FC<AddInputForm> = (props) => {

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
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addInput}>+</button>
      {error && <div className={'errorMessage'}>{error}</div>}
    </div>
  )
}