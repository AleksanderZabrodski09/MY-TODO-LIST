import React, {ChangeEvent} from 'react';


// type CheckBoxType={
//   checked:boolean
//   callBack:(checked:boolean)=>void
// }

export const CheckBox = ({checked, callBack}: { checked: boolean, callBack: (checked: boolean) => void }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked)
  }
  return <input
    type="checkbox"
    checked={checked}
    onChange={onChangeHandler}

  />

}