interface ParamObjects {
    scope: number;
    xml: number;
}

export const FetchCompany = async (ico: string, params?: ParamObjects) => {
    const url: string = `http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_or.cgi?ico=${ico}&xml=0`;
    const res = await fetch(url);
    console.log(res);

}