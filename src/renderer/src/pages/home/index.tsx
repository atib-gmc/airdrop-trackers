import { Link, useNavigate } from 'react-router-dom'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Airdrop } from '@renderer/schema/Airdrop'

function Home(): JSX.Element {
  const [data, setData] = useState<Airdrop[] | null>([])
  const navigate = useNavigate()
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const columnHelper = createColumnHelper<Airdrop>()
  // Dummy data

  useEffect(() => {
    async function getData(): Promise<void> {
      const airdrops = await window.electron.loadJson()
      setData(airdrops)
      // console.log('airdrops', airdrops)
      // setData()
    }
    getData()
  }, [])

  const columns = [
    columnHelper.accessor('projectName', {
      cell: (info) => (
        <Link
          to={`/detail/${info.row.original.id}`}
          className="hover:text-blue-600 hover:underline"
        >
          {' '}
          {info.getValue()}{' '}
        </Link>
      ),
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
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  useEffect(() => {
    table.setColumnVisibility({
      website: false
    })
  }, [table])
  // return (
  // )
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
            {table?.getRowModel().rows?.map((data) => (
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
