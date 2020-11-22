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
    const res = objRes.reduce((acc: any, current: any) => {
        // only if that person still owen portion of the company
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

const parseProkuratura = (obj: any) => {
    const objRes = obj[ 'dtt:Prokura' ][ 'dtt:Prokurista' ];
    console.log(objRes);
    const res = objRes.reduce((acc: any, current: any) => {
        // only if that person is still part of the company
        if (current[ '_attributes' ].ddo === undefined)
            console.log(current);
        acc.push({
            od: current[ '_attributes' ].dod,
            // bydliste: `${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Nazev_ulice' ][ '_text' ]} ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Cislo_orientacni' ][ '_text' ]}, ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Nazev_cesti_obce' ][ '_text' ]}, ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Nazev_obce' ][ '_text' ]}, ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Nazev_okresu' ][ '_text' ]}, ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:PSC' ][ '_text' ]}`,
            // dob: current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Datum_narozeni' ][ '_text' ],
            name: `${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Titul_pred' ][ '_text' ]} ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Jmeno' ][ '_text' ]} ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Prijmeni' ][ '_text' ]}`,
        });
        return acc;
    }, [])
    console.log(res);

    return res;
}

export const FetchCompany = async (ico: string) => {
    try {
        ico = '48110566';
        const res = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/company/${ico}`);
        const resString = await res.json();
        const resJSON = JSON.parse(resString);
        const data = resJSON[ "are:Ares_odpovedi" ][ 'are:Odpoved' ][ 'dtt:Vypis_OR' ];
        console.log(data);

        // dtt:Registrace
        // dtt:Spolecnici_s_vkladem
        // dtt:Statutarni_organ
        // dtt:Uvod
        // dtt:Zakladni_udaje

        return {
            cinnosti: parseCinnosti(data),
            kapital: parseKapital(data),
            prokura: parseProkuratura(data),
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