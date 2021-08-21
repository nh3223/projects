import { fetchExecutives } from './fetchExecutives';
import { fetchExecutive } from './fetchExecutive';
import { createExecutive } from './createExecutive';
import { editExecutive } from './editExecutive';
import { deleteExecutive } from './deleteExecutive';

import { defaultExecutive } from '../../utilities/executive/executive';

const base_url = 'http://localhost:5000/executive';
const headers = { "Content-Type": "application/json" }
const executiveId = 1;
const edits = { executiveName: 'John Doe' }

const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
  json: () => Promise.resolve({ })
}));

test('fetchExecutives should call fetch with correct url', () => {
  fetchExecutives();
  expect(fetchSpy).toHaveBeenCalledWith(base_url);
});

test('fetchExecutive should call fetch with correct url', () => {
  const url = `${base_url}/${executiveId}`;
  fetchExecutive(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createExecutive should call fetch with correct url and options', () => {
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(defaultExecutive)
  }
  createExecutive();
  expect(fetchSpy).toHaveBeenCalledWith(base_url, options);
});

test('editExecutive should call fetch with correct url and options', () => {
  const url = `${base_url}/${executiveId}`;
  const options = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(edits)
  }
  editExecutive(executiveId, edits)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
});

test('deleteExecutive should call fetch with correct url and options', () => {
  const url = `${base_url}/${executiveId}`;
  const options = { method: 'DELETE' }
  deleteExecutive(executiveId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
})