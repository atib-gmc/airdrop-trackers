import { set, format } from 'date-fns'
import { FaTasks } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { isYesterday} from "date-fns";
import { useEffect, useState } from 'react'
import { Airdrop } from '@renderer/schema/Airdrop'

function isToday(date:string) {
  const today = new Date()
  const currentDate = new Date(date)

  return today.toDateString() === currentDate.toDateString()
}
function Home(): JSX.Element {
  const [data, setData] = useState<Airdrop[] | null>([])
  const navigate = useNavigate()
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const columnHelper = createColumnHelper<Airdrop>()
  // Dummy data
  async function handleTask(taskId: string): Promise<void> {
    const finishTask = data?.map((pre) => {
      if (pre.id == taskId) {
        // Get the current date and set the current time dynamically
        const currentDate = new Date()

        // Format the date to a readable format

         console.log( {...pre, completed_at: currentDate })
        return { ...pre, completed_at: currentDate }
      } else {
        return pre
      }
    })
    await window.electron.saveJson(finishTask!)

    setData(finishTask!)
  }

  function handlerSTier(){
    data.forEach(e=> {
      if(e.tier.toLowerCase() == "s"){
        window.open(e.website,"_blank")
      }

    });
  }
  function allTaskHandler(){
  data.forEach(pre=>{
     window.open(pre.website,"_blank")
    })
  }

  useEffect(() => {
    async function getData(): Promise<void> {
      const airdrops = await window.electron.loadJson()
      setData(airdrops)
      console.log(airdrops);


      // console.log('airdrops', airdrops)
      // setData()
    }
    getData()
    console.log(data)
  }, [])

  const columns = [
    columnHelper.accessor('projectName', {
      cell: (info) => (
        <div className="flex  gap-2 items-center">
          <input type="checkbox" checked={Boolean(isToday(info.row.original.completed_at))} name="" id="" />
          <Link
            to={`/detail/${info.row.original.id}`}
            className="hover:text-blue-600 hover:underline"
          >
            {info.getValue()}{' '}
          </Link>
        </div>
      ),
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('website', {
      header: () => 'website',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('tier', {
      header: () => <span>tier</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('completed_at', {
      cell: (info) =>
        info.getValue() ? (
          'finished'
        ) : (
          <>
            <a href={info.row.original.website} target="_blank">
              <button
                className="btn btn-success text-gray-900  btn-sm"
                onClick={() => handleTask(info.row.original.id!)}
              >
                do task
              </button>
            </a>
          </>
        ),
      header: 'task(today)',
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
      <div className="text-3xl items-center my-5 flex  justify-center gap-2 text-center mx-auto">
        <FaTasks />
        <div className="l">Airdrop</div>
        <div className="l">Tracker</div>
      </div>

      <div className="ctas p-2 flex gap-2 px-4">
        <button
          onClick={() => navigate('/create')}
          className="btn-info mr-auto btn btn-sm text-slate-700"
        >
          create new
        </button>

        <button
          onClick={handlerSTier}
          className=" btn-sm ml-auto btn btn-secondary text-slate-800"
        >
          do S tier
        </button>
        <button
          onClick={allTaskHandler}
          className="btn-accent btn btn-sm text-slate-700"
        >
          do all task
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
