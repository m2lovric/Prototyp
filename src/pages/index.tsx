import * as React from 'react';
import { useState } from 'react';
import './main.scss';
import { localTask } from '../interfaces/interfaces';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addTask } from '../redux/features/task/taskSlice';
import { useEffect } from 'react';

const IndexPage = () => {
  const [task, setTask] = useState<localTask>({
    content: '',
    scheduledTime: '',
    finished: false,
  });
  const [data, setData] = useState<localTask[]>([]);

  const user = false;
  const dispatch = useAppDispatch();
  const getData = useAppSelector;

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
        content: '',
        scheduledTime: '',
        finished: false,
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
          data.map((el, i) => {
            return (
              <article key={i} className='app__list__task'>
                <p>{el.content}</p>
                <button>X</button>
              </article>
            );
          })}
      </section>
    </main>
  );
};

export default IndexPage;
