import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';


export default {
  title: 'Todolist/Task',
  component: Task,
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
  task: {id: 'werrrt', isDone: true, title: 'React'},
  removeTask: action('removeTask'),
  changeTaskStatus: action('changeTaskStatus'),
  changeTaskTitle: action('changeTaskTitle'),
};
export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
  task: {id: 'werrrte', isDone: false, title: 'CSS'},
  removeTask: action('removeTask'),
  changeTaskStatus: action('changeTaskStatus'),
  changeTaskTitle: action('changeTaskTitle')
};

