import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';

export type CheckBoxType = {
  checked: boolean
  callBack: (eValue: boolean) => void
}
export const CheckBox: React.FC<CheckBoxType> = (props) => {

  const OnChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.callBack(e.currentTarget.checked)
  }

  return <Checkbox
    // type="checkbox"
    checked={props.checked}
    color='error'
    onChange={OnChangeStatusHandler}
  />
};