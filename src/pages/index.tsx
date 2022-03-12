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

  useEffect(() => {
    const localData = localStorage.getItem('userTasks');
    if (localData !== 'undefined') {
      const taskData = JSON.parse(localStorage.getItem('userTasks'));
      console.log('//taskdata', taskData);
      setData((dataArr) => [...dataArr, ...taskData]);
      console.log(data);
    } else {
    }
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = {
      content: task.content,
      scheduledTime: task.scheduledTime,
      finished: false,
    };

    if (!user && task.content) {
      console.log(taskData);
      dispatch(addTask(taskData));
      console.log('task added');
      const localData = JSON.parse(localStorage.getItem('userTasks'));
      setData((dataArr) => [...localData]);
      setTask({
        content: '',
        scheduledTime: '',
        finished: false,
      });
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
              </article>
            );
          })}
      </section>
    </main>
  );
};

export default IndexPage;
