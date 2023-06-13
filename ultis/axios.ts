
import axios from 'axios';
import Test from './model/uf';


const get_token = async () => {
    let data = JSON.stringify({
        "userName": "dacksokel@gmail.com",
        "flagJson": true
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://postulaciones.solutoria.cl/api/acceso',
        headers: {
            'Content-Type': 'application/json-patch+json',
            'Accept': '*/*'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        return response.data.token;
    } catch (error) {
        console.log(error);
    }
}

const make_get_request = async () => {
    const token = await get_token();
    console.log(token)
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://postulaciones.solutoria.cl/api/indicadores',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.request(config);
        for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i])
            await Test.create(response.data[i]);
        }
        return response.data
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getStaticProps() {
    const data = await make_get_request();
    return {
        props: {
            data
        }
    }
}
