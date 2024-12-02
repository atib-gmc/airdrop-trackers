// src/components/AirdropCard.jsx
import { Airdrop } from '@renderer/schema/Airdrop'
import { Link } from 'react-router-dom'

const AirdropCard = ({ airdrop }: { airdrop: Airdrop }): JSX.Element => {
  const { projectName, tier, id, status, listing_date, reward, task } = airdrop

  return (
    <div className="max-w-sm mx-auto mb-2  bg-slate-800 text-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
      <div className="p-6">
        <Link to={`/detail/${id}`}>
          <h2 className="text-2xl font-bold mb-2">{projectName}</h2>
        </Link>
        <div className="flex items-center mb-4">
          <span
            className={`px-2 py-1 text-sm rounded-full ${tier === 'S' ? 'bg-yellow-500' : tier === 'A' ? 'bg-green-500' : tier === 'B' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
          >
            {tier}
          </span>
          <span
            className={`ml-2 px-2 py-1 text-sm rounded-full ${status === 'Ongoing' ? 'bg-blue-500' : status === 'Upcoming' ? 'bg-gray-500' : status === 'Claimable' ? 'bg-green-500' : 'bg-red-500'} text-white`}
          >
            {status}
          </span>
        </div>

        <div className="text-sm mb-4">
          <p>
            <strong>Listing Date:</strong> {listing_date}
          </p>
        </div>

        <div className="mb-4">
          <p>
            <strong>Reward:</strong> {reward}
          </p>
          <p>
            <strong>Task:</strong> {task}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AirdropCard
