import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Create from './pages/create'
import AirdropDetail from './pages/singlePage'

export default function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/detail/:id" element={<AirdropDetail />}></Route>
      </Routes>
    </>
  )
}
