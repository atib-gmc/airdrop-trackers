import React, { useEffect, useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Airdrop, airdropSchema } from '@renderer/schema/Airdrop'
import { Link } from 'react-router-dom'
import AirdropCard from './List'

// Define the schema
// Infer TypeScript type

const Create: React.FC = () => {
  const [data, setData] = useState<Airdrop[] | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<Airdrop>({
    resolver: zodResolver(airdropSchema)
  })
  const onSubmit = async (airdrop: Airdrop): Promise<void> => {
    if (data && data?.length > 0) {
      // console.log([...data, { ...airdrop, id: crypto.randomUUID() }])
      await window.electron.saveJson([
        ...data,
        { ...airdrop, id: crypto.randomUUID(), completed_at: null }
      ])
    } else {
      await window.electron.saveJson([{ ...airdrop, id: crypto.randomUUID(), completed_at: null }])
    }
    alert('Airdrop created successfully!')
    reset()
  }
  useEffect(() => {
    const jsonFile = async (): Promise<void> => {
      const data = await window.electron.loadJson()
      setData(data)
      // console.log(data)
    }
    jsonFile()
    // console.log(errors)
  }, [isSubmitSuccessful])
  // console.log(errors)

  return (
    <div className="min-h-screen  text-white p-4">
      <header className="relative">
        <Link to="/" className="btn btn-circle btn-ghost">
          <FaAngleDoubleLeft size={30} />
        </Link>
        <h1 className="text-2xl font-bold mb-6 text-center">Create Airdrop</h1>
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
            {Object.entries(airdropSchema.shape.tier.Values).map((data) => (
              <option key={data[0]} value={data[0]}>
                {data[0]}
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

        {/* Claim Deadline */}

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

        {/* Eligibility */}
        <div>
          <label className="block text-sm font-medium mb-1">Task</label>
          <textarea
            {...register('task')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="explain the airdrop tasks"
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
            {/* {Object.keys(airdropSchema.shape.status).map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))} */}
            <option value="">Select Status</option>
            {Object.entries(airdropSchema.shape.status.Values).map((data) => (
              <option key={data[0]} value={data[0]}>
                {data[0]}
              </option>
            ))}
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>
        {/* Network */}
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
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Create Airdrop
        </button>
      </form>
      {data && data?.length > 0 && data.map((card) => <AirdropCard key={card.id} airdrop={card} />)}{' '}
    </div>
  )
}
export default Create
