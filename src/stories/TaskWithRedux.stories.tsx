import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {TaskType} from '../TodoList';
import {TaskWithRedux} from '../components/TaskWithRedux';
import {useSelector} from 'react-redux';
import {AppRootReducerType} from '../state/store';
import {ReduxStoreProviderDecorator} from './ ReduxStoreProviderDecorator';


export default {
  title: 'Todolist/TaskWithRedux',
  component: TaskWithRedux,
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof TaskWithRedux>;

const TaskWithReduxStory = () => {
  let tasks = useSelector<AppRootReducerType, TaskType>(state => state.tasks['todolistId1'][1])

  return <TaskWithRedux task={tasks} todolistId={'todolistId1'}/>
}



const Template: ComponentStory<typeof TaskWithRedux> = (args) => {
  return <TaskWithReduxStory />
};

export const TaskIsDoneStory = Template.bind({});

// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsDoneStory.args = {
//   // ...baseArgs,
//   task: {id: 'werrrt', isDone: true, title: 'React'},
// };
// export const TaskIsNotDoneStory = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsNotDoneStory.args = {
//   // ...baseArgs,
//   task: {id: 'werrrte', isDone: false, title: 'CSS'},
// };
//
// const Template1: ComponentStory<typeof Task> = (args) => {
//   const [task, setTask] = useState({id: 'werrrte', isDone: false, title: 'CSS'})
//   const changeTaskStatus = () => setTask({...task, isDone: !task.isDone})
//   const changeTaskTitle = (taskId:string,title: string) => setTask({...task, title: title})
//   const removeTask = () => setTask({} as TaskType)
//
//   return <Task
//   task={task}
//   changeTaskStatus={changeTaskStatus}
//   changeTaskTitle={changeTaskTitle}
//   removeTask={removeTask}
//   />
// };
// export const TaskStory = Template1.bind({});
// // TaskIsNotDoneStory.args = {
// //   // ...baseArgs,
// //   task: {id: 'werrrte', isDone: false, title: 'CSS'},
// // };