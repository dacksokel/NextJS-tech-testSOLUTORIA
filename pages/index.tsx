
import { Uf } from "../ultis/types"
import Link from "next/link"
import axios from 'axios'
import { useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts';

// Define the components props
interface IndexProps {
  ufs: Array<Uf>
}


// define the page component
function Index(props: IndexProps) {
  const { ufs } = props
  const [page, setPage] = useState(1)
  const ufsPerPage = 10
  const pages = Math.ceil(ufs.length / ufsPerPage)

  const handleClick = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const data = ufs.sort((a, b) => a.id - b.id).slice((page - 1) * ufsPerPage, page * ufsPerPage).map(u => ({
    name: u.nombreIndicador,
    value: u.valorIndicador
  }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h1>My Ufs List - Page {page}</h1>
      <h2>Click On Uf to see it individually</h2>
      <Link href={`/uf`}>Add new UF</Link>
      {/* MAPPING OVER THE UFS */}
      {ufs.sort((a, b) => a.id - b.id).slice((page - 1) * ufsPerPage, page * ufsPerPage).map(u => (
        <div key={u.id}>
          <Link href={`/uf/${u.id}`}>
            <h3 style={{ cursor: "pointer" }}>
              <span style={{marginRight: "10px"}}>
                {u.id}
              </span>
              <span style={{marginRight: "10px"}}>
                {u.nombreIndicador}
              </span>
              <span style={{marginRight: "10px"}}>
                {u.codigoIndicador}
              </span>
              <span style={{marginRight: "10px"}}>
                {u.unidadMedidaIndicador}
              </span>
              <span style={{marginRight: "10px"}}>
                {u.valorIndicador}
              </span>
              <span style={{marginRight: "10px"}}>
                {u.tiempoIndicador}
              </span>
              <span style={{marginRight: "10px"}}>
                {u.origenIndicador}
              </span>
            </h3>
          </Link>
        </div>
      ))}
      <div>
        {Array.from({ length: pages }, (_, i) => (
          <button key={i} onClick={() => handleClick(i + 1)} style={{marginRight: "5px"}}>{i + 1}</button>
        ))}
      </div>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    </div>

  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  const res = await axios.get(process.env.API_URL as string)
  const ufs = await res.data
  // return props
  return {
    props: { ufs },
  }
}

export default Index





