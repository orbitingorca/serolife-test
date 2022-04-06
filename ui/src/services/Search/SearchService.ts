import config from "../../config";

export class SearchService {
    async searchByName(searchTerm: string) {
        const list = await this.getList(config.api.recipesUrl)
        if (searchTerm) {
            return list.filter((r: string) => r.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            return list;
        }
    }

    private async getList(url = '') {
        const response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();
    }
}
