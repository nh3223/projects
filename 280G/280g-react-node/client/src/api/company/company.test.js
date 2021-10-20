import { fetchCompanies } from './fetchCompanies';
import { fetchCompany } from './fetchCompany';
import { createCompany } from './createCompany';
import { editCompany } from './editCompany';
import { deleteCompany } from './deleteCompany';

const baseUrl = 'http://localhost:5000/company';
const headers = { "Content-Type": "application/json" }
const companyId = 12;
const edits = { companyName: 'company' }

test('fetchCompanies should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ })
  }));
    
  fetchCompanies();
  expect(fetchSpy).toHaveBeenCalledWith(baseUrl);
});

test('fetchCompany should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ })
  }));
  
  const url = `${baseUrl}/${companyId}`;
  fetchCompany(companyId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createCompany should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ })
  }));
  
  const options = {
    method: 'POST',
    headers,
    body: { }
  }
  createCompany();
  expect(fetchSpy).toHaveBeenCalledWith(baseUrl, options);
});

test('editCompany should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ })
  }));

  const url = `${baseUrl}/${companyId}`;
  const options = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(edits)
  }
  editCompany(companyId, edits)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
});

test('deleteCompany should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ })
  }));
  
  const url = `${baseUrl}/${companyId}`;
  const options = { method: 'DELETE' }
  deleteCompany(companyId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
});





