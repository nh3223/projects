import { fetchPayments } from './fetchPayments';
import { fetchPayment } from './fetchPayment';
import { createPayment } from './createPayment';
import { editPayment } from './editPayment';
import { deletePayment } from './deletePayment';

const baseUrl = 'http://localhost:5000/nonequitypayment';
const headers = { "Content-Type": "application/json" }
const executiveId = 3;
const paymentId = 1;
const edits = { paymentName: 'John Doe' }

test('fetchPayments should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve([ ])
  }));
  
  const url = `${baseUrl}/executive/${executiveId}`

  fetchPayments(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('fetchPayment should call fetch with correct url', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: paymentId })
  }));
  
  const url = `${baseUrl}/${paymentId}`;
  fetchPayment(paymentId);
  expect(fetchSpy).toHaveBeenCalledWith(url);
});

test('createPayment should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ _id: paymentId })
  }));
  
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ executive: executiveId })
  }
  createPayment(executiveId);
  expect(fetchSpy).toHaveBeenCalledWith(baseUrl, options);
});

test('editPayment should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve(edits)
  }));
  
  const url = `${baseUrl}/${paymentId}`;
  const options = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(edits)
  }
  editPayment(paymentId, edits)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
});

test('deletePayment should call fetch with correct url and options', () => {
  
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({ 
    json: () => Promise.resolve({ })
  }));
  
  const url = `${baseUrl}/${paymentId}`;
  const options = { method: 'DELETE' }
  deletePayment(paymentId)
  expect(fetchSpy).toHaveBeenCalledWith(url, options)
})