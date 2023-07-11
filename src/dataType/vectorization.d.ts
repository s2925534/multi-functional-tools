declare class Vectorization {
    jsonDecode(data: any[]): any[];
    jsonCase(data: any[]): any[];
    sortValuesOfAnArrayByMultipleFields(array: any[], keys: string[], sortBy?: string): any[];
    arrSortBy(...args: any[]): any;
    groupArrayByIndexGivenString(items: any[], groupBy: string): any[];
    tree(table: string, tree?: boolean): any[];
    getTableList(tableName?: string): any[];
    parseTree(tree: any, root?: any): any[] | null;
    printTree(tree: any): string;
    parseAndPrintTree(root: any, tree: any): string;
    prepareData(data: any, groupBy: string | null, defaultField: string): any[];
    unsetEmptyIndexes(tempValues: any, removeIndex?: boolean): any[];
  }
  
  export { Vectorization };
  