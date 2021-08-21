import { fetchCompanies } from './fetchCompanies';
import { fetchCompany } from './fetchCompany';
import { createCompany } from './createCompany';
import { editCompany } from './editCompany';
import { deleteCompany } from './deleteCompany';

import { defaultCompany } from '../../utilities/company/company';

const base_url = 'http://localhost:5000/company';
const headers = { "Content-Type": "application/json" }
const companyId = 12;
const edits = { companyName: 'company' }

const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
  json: () => Promise.resolve({ })
}));

test('fetchCompanies should call fetch with correct url', () => {
  fetchCompanies();
  expect(fetchSpy).toHaveBeenCalledWith(base_url);
});

test('fetchCompany should call fetch with correct url', () => {
  const url = `${base_url}/${companyId}`;
  fetchCompany(companyId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createCompany should call fetch with correct url and options', () => {
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(defaultCompany)
  }
  createCompany();
  expect(fetchSpy).toHaveBeenCalledWith(base_url, options);
});

test('editCompany should call fetch with correct url and options', () => {
  const url = `${base_url}/${companyId}`;
  const options = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(edits)
  }
  editCompany(companyId, edits)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
});

test('deleteCompany should call fetch with correct url and options', () => {
  const url = `${base_url}/${companyId}`;
  const options = { method: 'DELETE' }
  deleteCompany(companyId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
})





