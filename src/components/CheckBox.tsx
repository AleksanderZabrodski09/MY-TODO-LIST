import React, {ChangeEvent} from 'react';

export type CheckBoxType = {
  checked: boolean
  callBack: (eValue: boolean) => void
}
export const CheckBox: React.FC<CheckBoxType> = (props) => {

  const OnChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.callBack(e.currentTarget.checked)
  }

  return <input
    type="checkbox"
    checked={props.checked}
    onChange={OnChangeStatusHandler}
  />
};