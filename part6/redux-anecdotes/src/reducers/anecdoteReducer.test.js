import anecdoteReducer from './anecdoteReducer';
import { anecdoteStateName } from './anecdoteReducer';
import deepFreeze from 'deep-freeze';
import utils from './utils';

describe(`State tests (${anecdoteStateName})`, () => {
  let initialState;

  beforeEach(() => {
    initialState = utils.getInitialState();
  });

  test('vote action works', () => {
    const firstAnecdote = initialState.anecdotes[0];
    const action = {
      type: 'VOTE', 
      data: {
        id: firstAnecdote.id
      }
    };

    deepFreeze(initialState);
    const newState = anecdoteReducer(initialState, action);
    const found = newState.anecdotes.find(anec => anec.id === firstAnecdote.id);
    expect(found).toBeDefined();
    expect(found.id).toBe(initialState.anecdotes[0].id);
    expect(found.votes).toBe(initialState.anecdotes[0].votes + 1);
    expect(newState.anecdotes.length).toBe(initialState.anecdotes.length);
  });

  test('creating new note action works', () => {
    const newContent = utils.getNewContent('new_content');
    const action = {
      type: 'NEW_NOTE', 
      data: newContent
    };

    deepFreeze(initialState);
    const newState = anecdoteReducer(initialState, action);
    const indexInInitialState = initialState.anecdotes.findIndex(anecdote => anecdote.id === newContent.id);
    const indexInNewState = newState.anecdotes.findIndex(anecdote => anecdote.id === newContent.id);
    
    expect(newState.anecdotes.length).toBe(initialState.anecdotes.length + 1);
    expect(indexInInitialState).toBe(-1);
    expect(indexInNewState).not.toBe(-1);
  });
});