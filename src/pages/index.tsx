import * as React from 'react';
import { useState } from 'react';
import './main.scss';
import { localTask } from '../interfaces/interfaces';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addTask, removeTask } from '../redux/features/task/taskSlice';
import { useEffect } from 'react';
import { v4 } from 'uuid';

const IndexPage = () => {
  const [task, setTask] = useState<localTask>({
    taskId: v4(),
    content: '',
    scheduledTime: '',
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
    console.log(taskData);

    if (task.content) {
      dispatch(addTask(taskData));
      const localData = JSON.parse(localStorage.getItem('userTasks'));
      if (localData !== (undefined || null)) {
        setData((dataArr) => [...localData]);
      }
      setTask({
        ...task,
        content: '',
        scheduledTime: '',
      });

      data.length > 0
        ? console.log('data length > 0', data)
        : console.log('nije', data);
      data.length > 0 &&
        setData((arr) =>
          arr.sort((a, b) => {
            return Date.parse(b.scheduledTime) - Date.parse(a.scheduledTime);
          })
        );
    } else {
    }
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
    const localData = JSON.parse(localStorage.getItem('userTasks'));
    setData((dataArr) => [...localData]);
  };

  return (
    <main className='app'>
      <form className='app__form' onSubmit={handleAddTask}>
        <input
          type='text'
          value={task.content}
          onChange={(e) => setTask({ ...task, content: e.target.value })}
        />
        <input
          type='datetime-local'
          value={task.scheduledTime}
          onChange={(e) => setTask({ ...task, scheduledTime: e.target.value })}
        />
        <button>add</button>
      </form>
      <section className='app__list'>
        <h2>list</h2>
        {data.length > 0 &&
          data.map((el) => {
            return (
              <article key={el.taskId} className='app__list__task'>
                <p>{el.content}</p>
                <button onClick={() => handleRemoveTask(el.taskId)}>X</button>
              </article>
            );
          })}
      </section>
    </main>
  );
};

export default IndexPage;
