export async function getData(username: string) {
    const data = await fetch("http://localhost:5500/api/getMatch/" + username);
    const json = await data.json();
    return json;
}