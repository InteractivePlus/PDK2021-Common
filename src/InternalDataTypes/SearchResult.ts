class SearchResult<T>{
    numTotalResults? : number;
    numFetchedResults: number;
    results : T[];
    constructor(numFetchedResults : number, results : T[], numTotalResults?: number){
        this.numTotalResults = numTotalResults;
        this.numFetchedResults = numFetchedResults;
        this.results = results;
    }
}
export {SearchResult};