import { fetchExecutives } from './fetchExecutives';
import { fetchExecutive } from './fetchExecutive';
import { createExecutive } from './createExecutive';
import { editExecutive } from './editExecutive';
import { deleteExecutive } from './deleteExecutive';

const baseUrl = 'http://localhost:5000/executive';
const headers = { "Content-Type": "application/json" }
const companyId = 12;
const executiveId = 1;
const edits = { executiveName: 'John Doe' }

test('fetchExecutives should call fetch with correct url', async () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve([ ])
  }));
  
  const url = `http://localhost:5000/company/${companyId}/executives`

  fetchExecutives(companyId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('fetchExecutive should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: executiveId })
  }));
  
  const url = `${baseUrl}/${executiveId}`;
  fetchExecutive(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createExecutive should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: executiveId })
  }));
  
  const companyId = 12;
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ company: companyId })
  };
  createExecutive(companyId);
  expect(fetchSpy).toHaveBeenCalledWith(baseUrl, options);
});

test('editExecutive should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve(edits)
  }));
  
  const url = `${baseUrl}/${executiveId}`;
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
  
  const url = `${baseUrl}/${executiveId}`;
  const options = { method: 'DELETE' }
  deleteExecutive(executiveId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
})