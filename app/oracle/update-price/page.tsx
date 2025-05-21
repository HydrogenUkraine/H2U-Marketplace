'use client';

import React, { useEffect, useState } from 'react';
import { useOracle } from '@/hooks/oracle.hooks';
import { useAuth } from '@/hooks/auth.hooks';

const UpdatePricePage = () => {
  const { oraclePrice, fetchOraclePrice, updateOraclePrice } = useOracle();
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const {authState} = useAuth()

  // Fetch oracle price on component mount
  useEffect(() => {
    fetchOraclePrice();
  }, [fetchOraclePrice]);

  // Update form fields when oraclePrice changes
  useEffect(() => {
    if (oraclePrice.minPricePerKg !== null) {
      setMinPrice(oraclePrice.minPricePerKg);
    }
    if (oraclePrice.maxPricePerKg !== null) {
      setMaxPrice(oraclePrice.maxPricePerKg);
    }
  }, [oraclePrice.minPricePerKg, oraclePrice.maxPricePerKg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (minPrice === '' || maxPrice === '') {
      alert('Please enter both minimum and maximum prices.');
      return;
    }

    if (!Number.isInteger(Number(minPrice)) || !Number.isInteger(Number(maxPrice))) {
      alert('Prices must be integers.');
      return;
    }

    if (Number(minPrice) < 0 || Number(maxPrice) < 0) {
      alert('Prices must be non-negative.');
      return;
    }

    try {
      await updateOraclePrice({
        newMin: Number(minPrice),
        newMax: Number(maxPrice),
        options: {
          onSuccess: () => {
            alert('Oracle price updated successfully!');
            fetchOraclePrice(); // Fetch updated prices after successful update
          },
          onError: () => {
            alert('Failed to update oracle price. Check the console for details.');
          },
        },
      });
    } catch (error) {
      console.error('Error updating oracle price:', error);
      alert('An unexpected error occurred while updating the price.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Oracle Price</h1>

      {oraclePrice.loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : oraclePrice.error ? (
        <p className="text-center text-red-500">Error: {oraclePrice.error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Minimum Price per kg
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter minimum price"
              required
              min="0"
              step="1"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Maximum Price per kg
            </label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter maximum price"
              required
              min="0"
              step="1"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600">
              Last Updated:{' '}
              {oraclePrice.lastUpdated
                ? new Date(oraclePrice.lastUpdated * 1000).toLocaleString()
                : 'N/A'}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={oraclePrice.loading || authState.user?.role !== 'Admin'}
          >
            {oraclePrice.loading ? 'Updating...' : 'Update Price'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdatePricePage;