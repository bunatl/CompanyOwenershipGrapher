interface ParamObjects {
    scope: number;
    xml: number;
}

export const FetchCompany = async (ico: string) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/company/${ico}`);
        const resJSON = await res.json();
        console.log(resJSON);

        // console.log(resJSON[ "are:Ares_odpovedi" ][ "are:Odpoved" ]);
        // get only item we need
        return resJSON;
    } catch (err) {
        console.error(err);
        // and try to fetch it again
        await FetchCompany(ico);
    }
}