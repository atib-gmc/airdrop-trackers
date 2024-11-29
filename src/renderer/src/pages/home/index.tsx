import { useNavigate } from 'react-router-dom'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect } from 'react'
import { Airdrop } from '@renderer/schema/Airdrop'

function Home(): JSX.Element {
  const navigate = useNavigate()
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const columnHelper = createColumnHelper<Airdrop>()
  // Dummy data
  const data: Airdrop[] = [
    {
      tier: 'S',
      projectName: 'MoonToken',
      listing_date: '2024-12-01',
      claimDeadline: '2025-01-01',
      reward: '100 MTK',
      eligibility: 'Hold at least 500 MTK before 2024-11-01',
      status: 'Upcoming',
      network: 'Ethereum',
      website: 'https://moontoken.com',
      is_finish: false
    },
    {
      tier: 'S',
      projectName: 'StellarDrop',
      listing_date: '2024-11-20',
      claimDeadline: '2024-12-15',
      reward: '50 XLM',
      eligibility: "Sign up on Stellar's website before 2024-11-10",
      status: 'Ongoing',
      network: 'Stellar',
      website: 'https://stellardrop.org',
      is_finish: false
    }
  ]
  const columns = [
    columnHelper.accessor('projectName', {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('website', {
      header: () => 'website',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('listing_date', {
      header: () => <span>Listing Date</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('reward', {
      header: 'reward',
      footer: (info) => info.column.id
    })
  ]
  // Create table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  useEffect(() => {
    table.setColumnVisibility({
      website: false
    })
  }, [table])
  return (
    <>
      <h1 className="text-3xl my-5 text-center mx-auto">Airdrop tracker</h1>
      <div className="ctas p-2">
        <button onClick={() => navigate('/create')} className="btn-info btn btn-sm text-slate-700">
          create new
        </button>
      </div>
      <div className="container max-w-full ">
        <table className="table overflow-x-scroll w-full overflow-auto">
          <thead>
            {table.getHeaderGroups().map((data) => (
              <tr key={data.id}>
                {data.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((data) => (
              <tr key={data.id}>
                {data.getVisibleCells().map((td) => (
                  <td key={td.id}>{flexRender(td.column.columnDef.cell, td.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <Versions></Versions> */}
    </>
  )
}

export default Home
