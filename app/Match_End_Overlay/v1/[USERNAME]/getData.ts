export async function getData(username: string) {
    const url = process.env.BACKEND;
    const data = await fetch(url + "/api/getMatch/" + username);
    const json = await data.json();
    return json;
}