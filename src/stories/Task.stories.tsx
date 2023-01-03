import React, {ChangeEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';
import {TaskType} from '../TodoList';


export default {
  title: 'Todolist/Task',
  component: Task,

  args: {
    task: {id: 'werrrt', isDone: true, title: 'React'},
    removeTask: action('removeTask'),
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
  }

} as ComponentMeta<typeof Task>;
// const removeTaskCallBack = action('removeTask')
// const changeTaskStatusCallBack = action('changeTaskStatus')
// const changeTaskTitleCallBack = action('changeTaskTitle')
// const baseArgs = {
//   removeTask: removeTaskCallBack,
//   changeTaskStatus: changeTaskStatusCallBack,
//   changeTaskTitle: changeTaskTitleCallBack,
// }

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
  // ...baseArgs,
  task: {id: 'werrrt', isDone: true, title: 'React'},
};
export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
  // ...baseArgs,
  task: {id: 'werrrte', isDone: false, title: 'CSS'},
};

const Template1: ComponentStory<typeof Task> = (args) => {
  const [task, setTask] = useState({id: 'werrrte', isDone: false, title: 'CSS'})
  const changeTaskStatus = () => setTask({...task, isDone: !task.isDone})
  const changeTaskTitle = (taskId:string,title: string) => setTask({...task, title: title})
  const removeTask = () => setTask({} as TaskType)

  return <Task
  task={task}
  changeTaskStatus={changeTaskStatus}
  changeTaskTitle={changeTaskTitle}
  removeTask={removeTask}
  />
};
export const TaskStory = Template1.bind({});
// TaskIsNotDoneStory.args = {
//   // ...baseArgs,
//   task: {id: 'werrrte', isDone: false, title: 'CSS'},
// };