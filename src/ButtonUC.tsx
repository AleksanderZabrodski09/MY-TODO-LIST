import React, {FC, memo} from 'react';
import {Button} from '@mui/material';

type ButtonFilterUCType = {
  title: string
  onClick: () => void
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  variant: 'text' | 'outlined' | 'contained'
  // size:'small' | 'medium'
}
export const ButtonUC: FC<ButtonFilterUCType> = memo((props) => {
  console.log("ButtonUC")
  return <Button onClick={props.onClick}
                 color={props.color}
                 // size={props.size}
                 size='small'
                 variant={props.variant}
  >{props.title}
  </Button>
})