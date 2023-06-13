import { Uf } from "../ultis/types"
import Link from "next/link"

// Define the components props
interface IndexProps {
  ufs: Array<Uf>
}


// define the page component
function Index(props: IndexProps) {
  const { ufs } = props
  console.log(ufs);
  console.log(props)

  return (
    <div>
      <h1>My Ufs List2 222222</h1>
      <h2>Click On Uf to see it individually</h2>
      {/* MAPPING OVER THE UFS */}
      {/* {ufs.map(u => (
        <div key={u.id}>
          <Link href={`/ufs/${u.id}`}>
            <h3 style={{ cursor: "pointer" }}>
              {u.id} - {u.nombreIndicador} - {u.codigoIndicador} - {u.unidadMedidaIndicador} - {u.valorIndicador} - {u.fechaIndicador} - {u.tiempoIndicador} - {u.origenIndicador}
            </h3>
          </Link>
        </div>
      ))} */}
    </div>

  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  console.log('jaskdhaskjhdaksjhdkajshdkjsahkjdsahkjdhaskjhd')
  const res = await fetch(process.env.API_URL as string)
  const ufs = await res.json()
  console.log(ufs);
  // return props
  return {
    props: { ufs },
  }
}

export default Index