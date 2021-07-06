class SearchResult<T>{
    numTotalResults : number;
    numFetchedResults: number;
    results : T[];
    constructor(numTotalResults : number, numFetchedResults : number, results : T[]){
        this.numTotalResults = numTotalResults;
        this.numFetchedResults = numFetchedResults;
        this.results = results;
    }
}
export {SearchResult};