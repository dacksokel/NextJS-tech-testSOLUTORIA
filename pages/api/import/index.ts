import { NextApiRequest, NextApiResponse } from "next"
import { ResponseFuncs } from "../../../ultis/types"
import { connect } from '../../../ultis/db';
import { getStaticProps } from "../../../ultis/axios"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    await connect() // connect to database

    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // Potential Responses
    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {            
            const response = await getStaticProps();            
            res.json({ status: 'success', ...response })
        }
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler