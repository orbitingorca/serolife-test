import config from "../../config";

export class SearchService {
    async searchByName(searchTerm: string) {
        const list = await this.getList(config.api.recipesUrl)
        if (searchTerm) {
            return list.filter((r: string) => r.toLowerCase().includes(searchTerm));
        } else {
            return list;
        }
    }

    async getList(url = '') {
        const response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();
    }
}
