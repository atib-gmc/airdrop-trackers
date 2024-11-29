import { Airdrop } from '@renderer/schema/Airdrop'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const AirdropDetail: React.FC = () => {
  const { id } = useParams() // Get dynamic parameter from URL
  const [data, setData] = useState<Airdrop | null>(null)

  // Mock data for demonstration. Replace with a fetch or context if data is stored globally.
  useEffect(() => {
    async function getSingleData(): Promise<void> {
      const airdrop = await (
        await window.electron.loadJson()
      ).filter((data: Airdrop) => data.id == id)
      setData(airdrop[0])
      //   console.log(airdrop, id)
    }
    getSingleData()
  }, [])

  const mockData = {
    projectName: 'Sample Project',
    tier: 'S',
    status: 'Ongoing',
    listing_date: '2024-11-01',
    claimDeadline: '2024-12-01',
    reward: '500 Tokens',
    task: 'Join Telegram, Follow Twitter',
    network: 'Ethereum',
    website: 'https://example.com',
    is_finish: false
  }
  //   return (
  //     <Link to="/" className="btn btn-circle btn-ghost text-blue-400 hover:underline">
  //       &larr; Back
  //     </Link>
  //   )
  if (!data) return <h1>Loading...</h1>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Back Button */}
      <header className="flex items-center gap-4 mb-6">
        <Link to="/" className="btn btn-circle btn-ghost text-blue-400 hover:underline">
          &larr; Back
        </Link>
        <h1 className="text-3xl font-bold">Airdrop Details</h1>
      </header>

      {/* Airdrop Info Section */}
      <div className="bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{data.projectName}</h2>

        <ul className="space-y-2">
          <li>
            <strong>Tier:</strong> {data?.tier}
          </li>
          <li>
            <strong>Status:</strong> {data?.status}
          </li>
          <li>
            <strong>Listing Date:</strong> {data?.listing_date}
          </li>
          <li>
            <strong>Claim Deadline:</strong> {data?.claimDeadline}
          </li>
          <li>
            <strong>Reward:</strong> {data?.reward}
          </li>
          <li>
            <strong>Task:</strong> {data?.task}
          </li>
          <li>
            <strong>Network:</strong> {data?.network}
          </li>
          <li>
            <strong>Website:</strong>{' '}
            <a
              href={data?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {data?.website}
            </a>
          </li>
          <li>
            <strong>Completed:</strong> {data?.is_finish ? 'Yes' : 'No'}
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        {/* Perform Task Button */}
        <button
          //   onClick={handleTask}
          className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Perform Task
        </button>

        {/* Edit Button */}
        <button
          //   onClick={handleEdit}
          className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          //   onClick={handleDelete}
          className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default AirdropDetail
