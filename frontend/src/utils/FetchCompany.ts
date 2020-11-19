interface ParamObjects {
    scope: number;
    xml: number;
}

const parseCinnosti = (obj: any) => {
    const objRes = obj[ 'dtt:Cinnosti' ][ 'dtt:Predmet_podnikani' ][ 'dtt:Text' ];
    const res = objRes.reduce((acc: any, current: any) => {
        acc.push({
            den: current[ '_attributes' ].dod,
            cinnost: current[ '_text' ].replace('/\n/g', '')
        });
        return acc;
    }, [])
    return res;
};

const parseKapital = (obj: any) => {
    const objRes = obj[ 'dtt:Kapital' ][ 'dtt:Zakladni' ];
    console.log(objRes);
    const res = objRes.reduce((acc: any, current: any) => {
        // only if that person stil owen portion of the company
        if (current[ '_attributes' ].ddo === undefined)
            acc.push({
                vklad: current[ 'dtt:Vklad' ][ 'dtt:Kc' ][ '_text' ],
                splaceno: current[ 'dtt:Splaceno' ][ 'dtt:Procenta' ][ '_text' ],
                den: current[ '_attributes' ].dod
            });
        return acc;
    }, [])
    return res;
};

export const FetchCompany = async (ico: string) => {
    try {
        ico = '48110566';
        const res = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/company/${ico}`);
        const resString = await res.json();
        const resJSON = JSON.parse(resString);
        const data = resJSON[ "are:Ares_odpovedi" ][ 'are:Odpoved' ][ 'dtt:Vypis_OR' ];
        console.log(data);

        // dtt:Prokura
        // dtt:Registrace
        // dtt:Spolecnici_s_vkladem
        // dtt:Statutarni_organ
        // dtt:Uvod
        // dtt:Zakladni_udaje

        return {
            cinnosti: parseCinnosti(data),
            kapital: parseKapital(data),
            prokura: {},
            registrace: {},
            spolecnici: {},
            organy: {},
            uvod: {},
            zaklUdaje: {}
        };
    } catch (err) {
        console.error(err);
        // and try to fetch it again
        await FetchCompany(ico);
    }
}