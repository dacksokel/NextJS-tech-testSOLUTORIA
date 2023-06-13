import { NextApiRequest, NextApiResponse } from "next"
import { ResponseFuncs } from "../../../ultis/types"
import { connect } from '../../../ultis/db';
import { getStaticProps } from "../../../ultis/axios"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    // GRAB ID FROM req.query (where next stores params)
     const id: string = req.query.id as string

    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // Potential Responses
    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Test } = await connect() // connect to database
            res.json(await Test.findOne({id: id}).catch(catcher))
        },
        PUT:async (req:NextApiRequest, res:NextApiResponse) => {
            const {Test } = await connect();
            res.json(await Test.updateOne({id: id}, req.body).catch(catcher))
        },
        DELETE:async (req:NextApiRequest, res:NextApiResponse) => {
            const {Test } = await connect();
            res.json(await Test.deleteOne({id: id}).catch(catcher))
        }
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler

