import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {InputForm} from '../components/InputForm';
import {action} from '@storybook/addon-actions';



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolist/InputForm',
  component: InputForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: 'Button clicked'
    },
  },
} as ComponentMeta<typeof InputForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputForm> = (args) => <InputForm {...args} />;

export const InputFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputFormStory.args = {
  addItem:action('Button clicked')
};

