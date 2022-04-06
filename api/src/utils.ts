export function justNames(response) {
    return response.rows.map(r => r.id);
}
