import { fetchCompensation } from './fetchCompensation';
import { createCompensation } from './createCompensation';
import { editCompensation } from './editCompensation';
import { deleteCompensation } from './deleteCompensation';

import { defaultCompensation } from '../../utilities/compensation/defaultCompensation';

const base_url = 'http://localhost:5000/compensation';
const headers = { "Content-Type": "application/json" }
const executiveId = 1;
const edits = { firstYearPayments: 1000 }

// const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
//   json: () => Promise.resolve(edits)
// }));

test('fetchCompensation should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ executive: executiveId, ...defaultCompensation })
  }));
  
  const url = `${base_url}/${executiveId}`;
  fetchCompensation(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createCompensation should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ executive: executiveId, ...defaultCompensation })
  }));
  
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ executive: executiveId, ...defaultCompensation })
  }
  createCompensation(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(base_url, options);
});

test('editCompensation should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve(edits)
  }));
  
  const url = `${base_url}/${executiveId}`;
  const options = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(edits)
  }
  editCompensation(executiveId, edits)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
});

test('deleteCompensation should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ })
  }));
  
  const url = `${base_url}/${executiveId}`;
  const options = { method: 'DELETE' }
  deleteCompensation(executiveId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
})