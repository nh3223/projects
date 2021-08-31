import { fetchGrants } from './fetchGrants';
import { fetchGrant } from './fetchGrant';
import { createGrant } from './createGrant';
import { editGrant } from './editGrant';
import { deleteGrant } from './deleteGrant';

import { defaultGrant } from '../../utilities/equityGrant/default';

const base_url = 'http://localhost:5000/equitygrant';
const headers = { "Content-Type": "application/json" };
const executiveId = 3;
const grantId = 1;
const edits = { amount: 1001 }

test('fetchGrants should call fetch with correct url', async () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve([ ])
  }));
  
  const url = `${base_url}/executive/${executiveId}`

  fetchGrants(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('fetchGrant should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: grantId, ...defaultGrant })
  }));
  
  const url = `${base_url}/${grantId}`;
  fetchGrant(grantId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createGrant should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: executiveId, ...defaultGrant })
  }));
  
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ executive: executiveId, ...defaultGrant })
  }
  createGrant(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(base_url, options);
});

test('editGrant should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve(edits)
  }));
  
  const url = `${base_url}/${grantId}`;
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
  
  const url = `${base_url}/${grantId}`;
  const options = { method: 'DELETE' }
  deleteGrant(grantId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
})