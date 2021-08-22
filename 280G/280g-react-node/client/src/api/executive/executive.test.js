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

// const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
//   json: () => Promise.resolve(edits)
// }));

test('fetchExecutives should call fetch with correct url', async () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve([ ])
  }));
  
  fetchExecutives();
  expect(fetchSpy).toHaveBeenCalledWith(base_url);
});

test('fetchExecutive should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: executiveId, ...defaultExecutive })
  }));
  
  const url = `${base_url}/${executiveId}`;
  fetchExecutive(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createExecutive should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: executiveId, ...defaultExecutive })
  }));
  
  const companyId = 12;
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ company: companyId, ...defaultExecutive })
  }
  createExecutive(companyId);
  expect(fetchSpy).toHaveBeenCalledWith(base_url, options);
});

test('editExecutive should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve(edits)
  }));
  
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
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ })
  }));
  
  const url = `${base_url}/${executiveId}`;
  const options = { method: 'DELETE' }
  deleteExecutive(executiveId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
})