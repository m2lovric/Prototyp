import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { localTask } from '../../../interfaces/interfaces';

interface TaskState {
  value: [localTask];
}

const initialState: TaskState = {
  value: [
    { content: 'task', scheduledTime: new Date().toString(), finished: false },
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
  },
});

export const { addTask } = taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTask = (state: RootState) => state.tasks.value;

export default taskSlice.reducer;
