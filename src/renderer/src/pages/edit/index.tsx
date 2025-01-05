import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Airdrop, airdropSchema } from '@renderer/schema/Airdrop';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [airdrops, setAirdrops] = useState<Airdrop[] | null>(null);
  const [data, setData] = useState<Airdrop | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Airdrop>({
    resolver: zodResolver(airdropSchema),
  });

  // Fetch data and set the form values
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const airdropData = await window.electron.loadJson();
      setAirdrops(airdropData);

      const singleData = airdropData.find((pre: Airdrop) => pre.id === id);
      setData(singleData);
    };

    fetchData();
  }, [id]);

  // Reset the form whenever `data` changes
  useEffect(() => {
    if (data) {
      reset(data); // Populate the form with new data
    }
  }, [data, reset]);

  const onSubmit = async (airdrop: Airdrop): Promise<void> => {
    const restData = airdrops?.filter((pre) => pre.id !== id);
    const dataToSubmit = [...(restData || []), airdrop];
    try {
      await window.electron.saveJson(dataToSubmit);
      window.alert('Airdrop edited');
      reset(); // Clear the form
      navigate('/');
    } catch (error) {
      window.alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen text-white p-4">
      <header className="relative">
        <Link to="/" className="btn btn-circle btn-ghost">
          <FaAngleDoubleLeft size={30} />
        </Link>
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Airdrop</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto mb-2">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            type="text"
            {...register('projectName')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter project name"
          />
          {errors.projectName && (
            <p className="text-red-500 text-sm">{errors.projectName.message}</p>
          )}
        </div>

        {/* Tier */}
        <div>
          <label className="block text-sm font-medium mb-1">Tier</label>
          <select
            {...register('tier')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option disabled value="">
              Select Tier
            </option>
            {Object.entries(airdropSchema.shape.tier.Values).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          {errors.tier && <p className="text-red-500 text-sm">{errors.tier.message}</p>}
        </div>

        {/* Listing Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Listing Date</label>
          <input
            type="date"
            {...register('listing_date')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.listing_date && (
            <p className="text-red-500 text-sm">{errors.listing_date.message}</p>
          )}
        </div>

        {/* Reward */}
        <div>
          <label className="block text-sm font-medium mb-1">Reward</label>
          <input
            type="text"
            {...register('reward')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter reward details"
          />
          {errors.reward && <p className="text-red-500 text-sm">{errors.reward.message}</p>}
        </div>

        {/* Task */}
        <div>
          <label className="block text-sm font-medium mb-1">Task</label>
          <textarea
            {...register('task')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Explain the airdrop tasks"
          />
          {errors.task && <p className="text-red-500 text-sm">{errors.task.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            {...register('status')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            {Object.entries(airdropSchema.shape.status.Values).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <input
            type="url"
            {...register('website')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter website URL"
          />
          {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
