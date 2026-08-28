export async function GrabObject<T>(url: string, commenadType: string = "GET", parmas: any = null): Promise<T>
{
    var options: any = {};
    if (commenadType != 'GET' || parmas != null)
    {
        options.method = commenadType;
        //options.headers = { 'Content-Type': 'application/json; charset=utf-8' };
        options.headers = { 'Content-Type': 'application/json' };

        if (parmas) 
        {
            options.body = JSON.stringify(parmas);
        }
    }

    const fetchResponse = await fetch(url, options);
    if (fetchResponse.ok)
    {
        const payload = await fetchResponse.json();
        return payload as T;
    }
    else
    {
        alert("response.OK was FALSE")
        return null as T;
    }
}