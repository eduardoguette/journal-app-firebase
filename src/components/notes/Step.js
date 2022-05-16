import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startSaveNotes } from '../../actions/notes';
import ringer from '../../assets/sounds/ringer.mp3';
const audio = new Audio(ringer);

let saveStep;
export const Step = ({ step, setViewAddStep, viewAddStep }) => {
  const { active: note } = useSelector((state) => state.notes);
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const { done, id, titleStep } = step;
  const [stateStep, setStateStep] = useState(titleStep.length > 0 ? true : false);

  const handleStepChange = (e) => {
    const tmpSteps = note.steps.map((step_active) => (step_active.id === id ? { ...step_active, titleStep: e.target.value } : step_active));
    dispatch(activeNote(note?.id, { ...note, steps: tmpSteps }));
    clearTimeout(saveStep);
    if (stateStep) {
      saveStep = setTimeout(() => {
        dispatch(startSaveNotes({ id: note.id, ...note, steps: tmpSteps }));
      }, 1000);
    }
  };

  const doneTodo = () => {
    if (!isExist()) return;
    if (!step.done) audio.play();
    const tmpSteps = note.steps.map((step_active) => (step_active.id === id ? { ...step_active, id: Date.now(), done: !done } : step_active));
    dispatch(activeNote(note?.id, { ...note, date: Date.now(), steps: tmpSteps }));
    dispatch(startSaveNotes({ id: note.id, ...note, steps: tmpSteps }));
  };

  const handleAddStep = () => {
    setStateStep(true);
    dispatch(startSaveNotes({ id: note.id, ...note }));
    setViewAddStep((prev) => !prev);
  };

  const handleDeleteStep = (e) => {
    e.preventDefault(); 
    const tmpSteps = note.steps.filter((step_active) => step_active.id !== id); 
    dispatch(activeNote(note?.id, { ...note, date: Date.now(), steps: tmpSteps }));
    dispatch(startSaveNotes({ id: note.id, ...note,steps: tmpSteps }));
  };

  const isExist = () => {
    let exist = false;
    notes.forEach(({ steps }) => {
      steps.forEach((step) => {
        if (step.id === id) {
          exist = true;
        }
      });
    });
    return exist;
  };

  return (
    <div className='relative flex items-center group'>
      <div onClick={doneTodo} className={`grid w-4 h-4 m-2  border  rounded-full place-items-center aspect-square ${!isExist() ? 'border-gray-800' : 'border-indigo-500 text-indigo-500'}`}>
        {step.done && (
          <svg className='w-3 h-3' strokeWidth='3' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M5 13L9 17L19 7' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        )}
      </div>
      <input
        onChange={handleStepChange}
        className={`w-full px-2 py-3 text-sm border border-transparent rounded-sm focus:outline-none focus:border-b focus:border-b-gray-100 ${done ? 'line-through text-gray-400' : "text-gray-600"}`}
        placeholder='New Step'
        value={titleStep}
        name='step'
      />
      {!viewAddStep && !stateStep && titleStep.length > 0 && (
        <button type='button' className='absolute right-0 px-2 text-sm text-indigo-600' onClick={handleAddStep}>
          Add
        </button>
      )}
      {isExist() && (
        <button type='button' onClick={handleDeleteStep} className='w-8 h-8 text-gray-400 bg-white '>
          &times;
        </button>
      )}
    </div>
  );
};
