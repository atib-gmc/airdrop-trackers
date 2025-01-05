import { Airdrop } from '@renderer/schema/Airdrop'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const AirdropDetail: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams() // Get dynamic parameter from URL
  const [data, setData] = useState<Airdrop | null>(null)
  const [fullData, setFullData] = useState<Airdrop[] | null>([])

  // Mock data for demonstration. Replace with a fetch or context if data is stored globally.
  useEffect(() => {
    async function getSingleData(): Promise<void> {
      const airdrop: Airdrop[] = await await window.electron.loadJson()
      setFullData(airdrop)
      const singleData = airdrop.filter((data: Airdrop) => data.id == id)
      //@ts-ignore
      setData(singleData[0])
      // console.log('single data : ', singleData)
      //   console.log(airdrop, id)
    }
    getSingleData()
  }, [])

  const handleDelete = async (): Promise<void> => {
    if (window.confirm(`Are you sure you want to delete ${data?.projectName}?`)) {
      alert('Airdrop deleted!')
      try {
        const filterData = fullData?.filter((pre) => pre.id !== id)
        await window.electron.saveJson(filterData!)
        navigate('/')
      } catch (error) {
        window.alert('something went wrong')
        return
      }
    }
  }

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
            <strong>Reward:</strong> {data?.reward}
          </li>
          <li>
            <strong>Task:</strong> {data?.task}
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
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        {/* Perform Task Button */}

        <a href={data.website} target="_blank" rel="noopener noreferrer">
          <button
            //   onClick={handleTask}
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Perform Task
          </button>
        </a>
        {/* Edit Button */}
        <Link to={`/edit/${id}`}>
          <button
            //   onClick={handleEdit}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Edit
          </button>
        </Link>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default AirdropDetail
