import * as React from 'react';
import { useState } from 'react';
import './main.scss';
import { localTask } from '../interfaces/interfaces';
import { useAppDispatch } from '../redux/hooks';
import { addTask, removeTask } from '../redux/features/task/taskSlice';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import { TaskList, Layout } from '../components';

const IndexPage = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [task, setTask] = useState<localTask>({
    taskId: v4(),
    content: '',
    scheduledTime: `${today}T12:00`,
    finished: false,
  });
  const [data, setData] = useState<localTask[]>([]);

  const user = false;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localData = localStorage.getItem('userTasks');

    if (localData !== (undefined || null)) {
      const taskData = JSON.parse(localStorage.getItem('userTasks'));
      setData((dataArr) => [...taskData]);
      data.length > 0 &&
        setData((arr) =>
          arr.sort((a, b) => {
            return Date.parse(b.scheduledTime) - Date.parse(a.scheduledTime);
          })
        );
    }
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = {
      taskId: v4(),
      content: task.content,
      scheduledTime: task.scheduledTime,
      finished: false,
    };

    if (task.content) {
      dispatch(addTask(taskData));
      const localData = JSON.parse(localStorage.getItem('userTasks'));
      if (localData !== (undefined || null)) {
        setData((dataArr) => [...localData]);
      }
      setTask({
        ...task,
        content: '',
        scheduledTime: `${today}T12:00`,
      });

      data.length > 0 &&
        setData((arr) =>
          arr.sort((a, b) => {
            return Date.parse(b.scheduledTime) - Date.parse(a.scheduledTime);
          })
        );
    } else {
    }
  };

  const handleRemoveTask = (taskId: string) => {
    dispatch(removeTask(taskId));
    const localData = JSON.parse(localStorage.getItem('userTasks'));
    setData((dataArr) => [...localData]);
  };

  return (
    <Layout>
      <main className='app__main'>
        <TaskList data={data} removeTask={handleRemoveTask} />
        <form className='app__form' onSubmit={handleAddTask}>
          <input
            type='text'
            value={task.content}
            placeholder='Enter New Task'
            onChange={(e) => setTask({ ...task, content: e.target.value })}
          />
          <input
            type='datetime-local'
            value={task.scheduledTime}
            placeholder='Enter New Task'
            onChange={(e) =>
              setTask({ ...task, scheduledTime: e.target.value })
            }
          />
          <button className='app__form--add'>+</button>
        </form>
      </main>
    </Layout>
  );
};

export default IndexPage;
