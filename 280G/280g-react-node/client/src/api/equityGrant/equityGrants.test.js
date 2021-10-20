import { fetchGrants } from './fetchGrants';
import { fetchGrant } from './fetchGrant';
import { createGrant } from './createGrant';
import { editGrant } from './editGrant';
import { deleteGrant } from './deleteGrant';

const baseUrl = 'http://localhost:5000/equitygrant';
const headers = { "Content-Type": "application/json" };
const executiveId = 3;
const grantId = 1;
const edits = { amount: 1001 }

test('fetchGrants should call fetch with correct url', async () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve([ ])
  }));
  
  const url = `${baseUrl}/executive/${executiveId}`

  fetchGrants(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('fetchGrant should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: grantId })
  }));
  
  const url = `${baseUrl}/${grantId}`;
  fetchGrant(grantId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createGrant should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: executiveId })
  }));
  
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ executive: executiveId })
  }
  createGrant(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(baseUrl, options);
});

test('editGrant should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve(edits)
  }));
  
  const url = `${baseUrl}/${grantId}`;
  const options = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(edits)
  }
  editGrant(grantId, edits)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
});

test('deleteGrant should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ })
  }));
  
  const url = `${baseUrl}/${grantId}`;
  const options = { method: 'DELETE' }
  deleteGrant(grantId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
})