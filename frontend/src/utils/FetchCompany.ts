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
    const res = objRes.reduce((acc: any, current: any) => {
        // only if that person is still part of the company
        if (current[ '_attributes' ].ddo === undefined)
            acc.push({
                od: current[ '_attributes' ].dod,
                bydliste: `${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Nazev_ulice' ][ '_text' ]} ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Cislo_orientacni' ][ '_text' ]}, ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Nazev_casti_obce' ][ '_text' ]}, ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Nazev_obce' ][ '_text' ]}, ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:Nazev_okresu' ][ '_text' ]}, ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Bydliste' ][ 'dtt:PSC' ][ '_text' ]}`,
                dob: current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Datum_narozeni' ][ '_text' ],
                name: `${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Titul_pred' ][ '_text' ]} ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Jmeno' ][ '_text' ]} ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Prijmeni' ][ '_text' ]}`,
            });
        return acc;
    }, []);
    return res;
}

const parseRegistrace = (obj: any) => {
    const objRes = obj[ 'dtt:Registrace' ][ 'dtt:Spisova_znacka' ];
    const res = `${objRes[ 'dtt:Soud' ][ 'dtt:Text' ][ '_text' ]}, ${objRes[ 'dtt:Oddil_vlozka' ][ '_text' ]}`;
    return res;
}

const parseSpolecnici = (obj: any) => {
    const objRes = obj[ 'dtt:Spolecnici_s_vkladem' ][ 'dtt:Spolecnik_s_vkladem' ];
    const res = objRes.reduce((acc: any, current: any) => {
        // only if that person is still part of the company
        if (current[ '_attributes' ].ddo === undefined && current[ 'dtt:Vklad_spolecnika' ][ 'dtt:Obchodni_podil' ] !== undefined)
            acc.push({
                osoba: `${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Titul_pred' ][ '_text' ]} ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Jmeno' ][ '_text' ]} ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Prijmeni' ][ '_text' ]}, ${current[ 'dtt:Fyzicka_osoba' ][ 'dtt:Datum_narozeni' ][ '_text' ]}`,
                podil: current[ 'dtt:Vklad_spolecnika' ][ 'dtt:Obchodni_podil' ][ 'dtt:Text' ][ '_text' ],
                splaceno: current[ 'dtt:Vklad_spolecnika' ][ 'dtt:Splaceno' ][ 'dtt:Procenta' ][ '_text' ],
                vklad: current[ 'dtt:Vklad_spolecnika' ][ 'dtt:Vklad' ][ 'dtt:Kc' ][ '_text' ],
                dod: current[ 'dtt:Vklad_spolecnika' ][ '_attributes' ].dod
            });
        return acc;
    }, []);
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

        // dtt:Spolecnici_s_vkladem
        // dtt:Statutarni_organ
        // dtt:Uvod
        // dtt:Zakladni_udaje

        return {
            cinnosti: parseCinnosti(data),
            kapital: parseKapital(data),
            prokura: parseProkuratura(data),
            registrace: parseRegistrace(data),
            spolecnici: parseSpolecnici(data),
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