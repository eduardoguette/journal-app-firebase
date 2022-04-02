import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startSaveNotes } from '../../actions/notes';
import ringer from '../../assets/sounds/ringer.mp3';
const audio = new Audio(ringer);

let saveStep;
export const Step = ({ step, setViewAddStep, viewAddStep }) => {
  const { active: note } = useSelector((state) => state.notes);
  const [steps, setsteps] = useState(note.steps);
  const dispatch = useDispatch();
  const { id, titleStep } = step;
  const [stateStep, setStateStep] = useState(titleStep.length > 0 ? true : false)
  
  const handleStepChange = (e) => {
    const tmpSteps = note.steps.map((step_active) => (step_active.id === id ? { ...step_active, titleStep: e.target.value, id: Date.now() } : step_active));
    dispatch(activeNote(note?.id, { ...note, date: Date.now(), steps: tmpSteps }));
    clearTimeout(saveStep);
    if (stateStep) {
      saveStep = setTimeout(() => {
        dispatch(startSaveNotes({ id: note.id, ...note, steps }));
      }, 1000);
      setsteps(tmpSteps);
    }
  };
  const doneTodo = () => {
    if (!step.done) audio.play();

    setsteps((steps) => steps.map((step_active) => (step_active.id === id ? { ...step_active, id: Date.now(), done: !step_active.done } : step_active)));
    dispatch(activeNote(note?.id, { ...note, date: Date.now(), steps }));

    dispatch(startSaveNotes({ id: note.id, ...note, steps }));
    setViewAddStep((prev) => !prev);
  };

  const handleAddStep = () => {
    setStateStep(true)
    dispatch(startSaveNotes({ id: note.id, ...note, steps }));
    setViewAddStep((prev) => !prev);
  
  };

  return (
    <div className='relative flex items-center'>
      <div onClick={doneTodo} className='grid w-4 h-4 m-2 text-indigo-500 border border-indigo-500 rounded-full place-items-center aspect-square'>
        {step.done && (
          <svg className='w-3 h-3' strokeWidth='3' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M5 13L9 17L19 7' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        )}
      </div>
      <input
        onChange={handleStepChange}
        className='w-full p-2 text-sm font-light border border-transparent rounded-sm focus:outline-none focus:border-gray-600'
        placeholder='New Step'
        value={titleStep}
        name='step'
      />
      {!viewAddStep && !stateStep  && (
        <button className='absolute text-sm right-4' onClick={handleAddStep}>
          Add
        </button>
      )}
      
    </div>
  );
};
