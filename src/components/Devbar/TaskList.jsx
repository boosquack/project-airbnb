import { Checkbox } from '@/components/ui';

const TaskCard = ({ checked, tasks }) => {
  return (
    <div className='flex flex-col gap-2'>
      {tasks.map((task, index) => (
        <div key={index} className='flex items-center justify-start'>
          <Checkbox checked={checked} />
          <div className='ml-2' dangerouslySetInnerHTML={{ __html: task }} />
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
