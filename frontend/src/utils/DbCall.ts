export const listOweners = async () => {
    const res = await fetch(`${process.env.REACT_APP_DB_URI}/invoke/generate`);
    return await res.json();
}
