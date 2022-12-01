import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';


// type CheckBoxType={
//   checked:boolean
//   callBack:(checked:boolean)=>void
// }

export const CheckBox = ({checked, callBack}: { checked: boolean, callBack: (checked: boolean) => void }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked)
  }
  return <Checkbox
    // type="checkbox"
    size='small'
    color='error'
    checked={checked}
    onChange={onChangeHandler}
  />

}