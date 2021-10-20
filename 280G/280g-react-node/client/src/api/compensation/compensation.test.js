import { fetchCompensation } from './fetchCompensation';
import { createCompensation } from './createCompensation';
import { editCompensation } from './editCompensation';
import { deleteCompensation } from './deleteCompensation';

const baseUrl = 'http://localhost:5000/compensation';
const headers = { "Content-Type": "application/json" }
const executiveId = 1;
const edits = { firstYearPayments: 1000 }

test('fetchCompensation should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ executive: executiveId })
  }));
  
  const url = `${baseUrl}/${executiveId}`;
  fetchCompensation(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createCompensation should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ executive: executiveId })
  }));
  
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ executive: executiveId })
  };
  createCompensation(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(baseUrl, options);
});

test('editCompensation should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve(edits)
  }));
  
  const url = `${baseUrl}/${executiveId}`;
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
  
  const url = `${baseUrl}/${executiveId}`;
  const options = { method: 'DELETE' }
  deleteCompensation(executiveId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
})