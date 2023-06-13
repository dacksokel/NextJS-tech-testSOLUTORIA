
// Import necessary modules
import { Uf } from "../../ultis/types"
import { useRouter } from "next/router"
import { useState } from "react"
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define Prop Interface
interface ShowProps {
    url: string
}

// Define Component
function Show(props: ShowProps) {
    // get the next router, so we can use router.push later
    const router = useRouter()

    // set the uf as state for modification
    const [uf, setUf] = useState<Uf>({
        id: 0,
        nombreIndicador: "",
        codigoIndicador: "",
        unidadMedidaIndicador: "",
        valorIndicador: 0,
        fechaIndicador: "",
        tiempoIndicador: "",
        origenIndicador: ""
    } as Uf)


    // function for handling changes in the input fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "fechaIndicador") {
            const dateValue = new Date(value);
            const formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`; // formatea la fecha como "ano-mes-dia"
            setUf({ ...uf, [name]: formattedDate }); // actualiza el estado de uf con la fecha formateada
        } else {
            setUf({ ...uf, [name]: value });
        }
    };

    // function for handling clicking the create button
    const handleCreate = async () => {
        // valida que si existe alguna propiedad vacia o sin dato y asignale un por defecto ''
        if (!uf.nombreIndicador || !uf.codigoIndicador || !uf.unidadMedidaIndicador || !uf.fechaIndicador || !uf.tiempoIndicador || !uf.origenIndicador) {
            alert('Por favor, complete todos los campos');
            return;
        }
        const ufWithDefaults = {
            id: 0,
            nombreIndicador: uf.nombreIndicador,
            codigoIndicador: uf.codigoIndicador,
            unidadMedidaIndicador: uf.unidadMedidaIndicador,
            valorIndicador: uf.valorIndicador || 0,
            fechaIndicador: uf.fechaIndicador,
            tiempoIndicador: uf.tiempoIndicador,
            origenIndicador: uf.origenIndicador
        } as Uf;

        // make api call to create a new uf in database
        await axios.post(props.url, JSON.stringify(ufWithDefaults), {
            headers: {
                "Content-Type": "application/json",
            },
        })

        // redirect user back to main page after creating
        router.push("/")
    }




    //return JSX
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>Create New UF</h1>
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
            <div style={{ marginTop: "20px" }}>
                <button style={{ marginRight: "10px" }} onClick={handleCreate}>Create</button>
                <button onClick={() => { router.push("/") }}>Go Back</button>

            </div>
        </div>
    )
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
    // return the url from our env variables for frontend api calls
    return { props: { url: process.env.API_URL } }
}

// export component
export default Show


