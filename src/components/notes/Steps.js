import { Step } from './Step';

export const Steps = ({ steps, setViewAddStep, viewAddStep }) => {
  return (
    <ul className='w-full px-2 '>
      {steps.map((step, index) => (
        <Step setViewAddStep={setViewAddStep} key={index} step={step} />
      ))}
    </ul>
  );
};
