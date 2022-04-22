import env from '../../../../main/config/env';
import { api } from '../api/api';
import { ApiHelper } from './api-helper';

describe('ApiHelper', () => {
  let getApiSpy: jest.SpyInstance;

  beforeEach(() => {
    getApiSpy = jest.spyOn(api, 'get').mockResolvedValue({});
  });

  describe('fetchQuote', () => {
    test('should calls get with correct params', async () => {
      await ApiHelper.fetchQuote('any');
      expect(getApiSpy)
        .toHaveBeenCalledWith(`query?function=TIME_SERIES_INTRADAY&symbol=any&interval=5min&apikey=${env.apiKey}`);
    });
  })
  describe('fetchStockHistory', () => {
    test('should calls get with correct params', async () => {
      const key = env.apiKey
      const funcDaily = "function=TIME_SERIES_DAILY"

      await ApiHelper.fetchStockHistory('any');
      expect(getApiSpy)
        .toHaveBeenCalledWith(`query?${funcDaily}&symbol=any&apikey=${key}`);
    });
  })
})