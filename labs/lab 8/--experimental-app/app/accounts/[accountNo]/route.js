export async function GET(req, {params}){
    const message = { message: `API endpoint http://loclhost:3000/api/accounts/${params.accountNo}`}
    return Response.json(message, {status: 200})
}