import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { localTask } from '../../../interfaces/interfaces';
import { v4 } from 'uuid';

interface TaskState {
  value: [localTask];
}

const initialState: TaskState = {
  value: [
    {
      taskId: v4(),
      content: 'task',
      scheduledTime: new Date().toString(),
      finished: false,
    },
  ],
};

export const taskSlice = createSlice({
  name: 'tasks',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<localTask>) => {
      state.value.push(action.payload);
      const data = JSON.parse(localStorage.getItem('userTasks'));

      if (data === (undefined || null)) {
        localStorage.setItem('userTasks', JSON.stringify([action.payload]));
      } else {
        localStorage.setItem(
          'userTasks',
          JSON.stringify([...data, action.payload])
        );
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.value.filter((el) => el.taskId !== action.payload);
      const localData = <localTask[]>(
        JSON.parse(localStorage.getItem('userTasks'))
      );
      const filteredLocalData = localData.filter(
        (el) => el.taskId !== action.payload
      );
      filteredLocalData.sort((a, b) => {
        return Date.parse(b.scheduledTime) - Date.parse(a.scheduledTime);
      });
      localStorage.setItem('userTasks', JSON.stringify(filteredLocalData));
    },
  },
});

export const { addTask, removeTask } = taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTask = (state: RootState) => state.tasks.value;

export default taskSlice.reducer;
