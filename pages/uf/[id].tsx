
import { Uf } from "../../ultis/types"
import { useRouter } from "next/router"
import { useState } from "react"
import axios from 'axios'

// Define Prop Interface
interface ShowProps {
  uf: Uf
  url: string
}

// Define Component
function Show(props: ShowProps) {
  // get the next router, so we can use router.push later
  const router = useRouter()

  // set the uf as state for modification
  const [uf, setUf] = useState<Uf>(props.uf)

  // function to complete a uf
  const handleComplete = async () => {
    // make copy of uf with completed set to true
    const newUf: Uf = { ...uf }
    // make api call to change completed in database
    await axios.put(props.url + "/" + uf.id, newUf, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    // once data is updated update state so ui matches without needed to refresh
    setUf(newUf)

    // if completed is already true this function won't do anything
  }

  // function for handling clicking the delete button
  const handleDelete = async () => {
    await axios.delete(props.url + "/" + uf.id)
    //push user back to main page after deleting
    router.push("/")
  }

  // function for handling clicking the update button
  const handleUpdate = async () => {
    await axios.put(props.url + "/" + uf.id, uf, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    //push user back to main page after updating
    router.push("/")
  }

  // function for handling changes in the input fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUf({ ...uf, [name]: value })
  }

  //return JSX
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>{uf.nombreIndicador}</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="nombreIndicador">Nombre Indicador:</label>
        <input type="text" name="nombreIndicador" value={uf.nombreIndicador} onChange={handleChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="codigoIndicador">Codigo Indicador:</label>
        <input type="text" name="codigoIndicador" value={uf.codigoIndicador} onChange={handleChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="unidadMedidaIndicador">Unidad Medida Indicador:</label>
        <input type="text" name="unidadMedidaIndicador" value={uf.unidadMedidaIndicador} onChange={handleChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="valorIndicador">Valor Indicador:</label>
        <input type="number" name="valorIndicador" value={uf.valorIndicador} onChange={handleChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="fechaIndicador">Fecha Indicador:</label>
        <input type="text" name="fechaIndicador" value={uf.fechaIndicador} onChange={handleChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="tiempoIndicador">Tiempo Indicador:</label>
        <input type="text" name="tiempoIndicador" value={uf.tiempoIndicador} onChange={handleChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="origenIndicador">Origen Indicador:</label>
        <input type="text" name="origenIndicador" value={uf.origenIndicador} onChange={handleChange} />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleDelete} style={{ marginRight: "10px" }}>Delete</button>
        <button onClick={handleUpdate} style={{ marginRight: "10px" }}>Update</button>
        <button
          onClick={() => {
            router.push("/")
          }}
        >
          Go Back
        </button>
      </div>
    </div>

  )
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
  // fetch the uf, the param was received via context.query.id
  const res = await axios.get(process.env.API_URL + "/" + context.query.id)
  const uf = await res.data

  //return the serverSideProps the uf and the url from out env variables for frontend api calls
  return { props: { uf, url: process.env.API_URL } }
}

// export component
export default Show


