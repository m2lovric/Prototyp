import React, { useEffect, useState } from 'react';
import { handleGetDocs } from '../firebase/functions';
import { localTask } from '../interfaces/interfaces';

const TaskList = ({ data, removeTask }) => {
  const [firebaseData, setFirebaseData] = useState<any[]>();
  useEffect(() => {
    const data = handleGetDocs().then((res) => setFirebaseData(res));
  }, []);
  return (
    <section className='app__list'>
      {data.length > 0 &&
        data.map((el: localTask) => {
          return (
            <article key={el.taskId} className='app__list__task'>
              <section className='content'>
                <p>{el.content}</p>
                <p className='date'>
                  {el.scheduledTime.slice(0, 10) + ' '}
                  {el.scheduledTime.slice(11, 16)}
                </p>
              </section>
              <button
                className='app__list__remove'
                onClick={() => removeTask(el.taskId)}
              >
                X
              </button>
            </article>
          );
        })}
    </section>
  );
};

export default TaskList;
