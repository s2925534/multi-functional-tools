import { Validator } from './validator.js';

class Vectorization {
  constructor() {
    this.variableManipulation = new Validator();
  }

  jsonDecode(data) {
    data = JSON.parse(JSON.stringify(data));
    return Object.keys(data).reduce((carry, key) => {
      if (Array.isArray(data[key])) {
        carry[key] = this.jsonDecode(data[key]);
      } else if (
        data[key] !== null &&
        this.variableManipulation.isJson(data[key])
      ) {
        const decoded = JSON.parse(data[key]);
        if (Array.isArray(decoded)) {
          carry[key] = this.jsonDecode(decoded);
        } else {
          carry[key] = decoded;
        }
      } else {
        carry[key] = data[key];
      }
      return carry;
    }, []);
  }

  jsonCase(data) {
    data = JSON.parse(JSON.stringify(data));
    return Object.keys(data).reduce((carry, key) => {
      if (/_/.test(key)) {
        const jsonKey = key
          .split('_')
          .map((part, index) =>
            index === 0 ? part.toLowerCase() : part.toLowerCase().capitalize()
          )
          .join('');
        carry[jsonKey] = Array.isArray(data[key])
          ? this.jsonCase(data[key])
          : data[key];
      } else {
        carry[key] = Array.isArray(data[key])
          ? this.jsonCase(data[key])
          : data[key];
      }
      return carry;
    }, []);
  }

  sortValuesOfAnArrayByMultipleFields(array, keys, sortBy = null) {
    let sorted = this.arrSortBy(array, keys[0], 'asc');
    if (sorted.length > 0 && keys[1]) {
      sorted = this.arrSortBy(array, keys[0], 'asc', keys[1], 'desc');
    }
    if (sortBy) {
      sorted = this.arrSortBy(array, sortBy, 'asc');
    }
    return sorted;
  }

  arrSortBy(data, ...fields) {
    const args = [...fields.map((field) => data.map((item) => item[field]))];
    args.push(data);
    return args.pop().sort((a, b) => {
      for (let i = 0; i < args.length; i += 2) {
        const field = args[i];
        const order = args[i + 1];
        const aValue = field ? field[a] : null;
        const bValue = field ? field[b] : null;
        if (aValue < bValue) {
          return order === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
          return order === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
  }

  groupArrayByIndexGivenString(items, groupBy) {
    const groupedArray = {};
    for (const item of items) {
      if (item[groupBy]) {
        const group = item[groupBy];
        if (!groupedArray[group]) {
          groupedArray[group] = [];
        }
        groupedArray[group].push(item);
      }
    }
    return Object.values(groupedArray);
  }

  tree(table, tree = false) {
    const tableList = this.getTableList();
    return tree ? this.parseTree(tableList) : tableList;
  }

  getTableList(tableName = '') {
    let tableList;
    if (tableName === '') {
      tableList = {
        H: 'G',
        F: 'G',
        G: 'D',
        E: 'D',
        A: 'E',
        B: 'C',
        C: 'E',
        D: null,
      };
    } else {
      // @todo get data from database
    }
    return tableList;
  }

  parseTree(tree, root = null) {
    const result = [];
    for (const child in tree) {
      if (tree[child] === root) {
        delete tree[child];
        result.push({
          name: child,
          children: this.parseTree(tree, child),
        });
      }
    }
    return result.length === 0 ? null : result;
  }

  printTree(tree) {
    let html = '';
    if (tree && tree.length > 0) {
      html += '<ul>';
      for (const node of tree) {
        html += `<li>${node.name}${this.printTree(node.children)}</li>`;
      }
      html += '</ul>';
    }
    return html;
  }

  parseAndPrintTree(root, tree) {
    let html = '';
    if (tree && Object.keys(tree).length > 0) {
      html += '<ul>';
      for (const child in tree) {
        if (tree[child] === root) {
          delete tree[child];
          html += `<li>${child}${this.parseAndPrintTree(child, tree)}</li>`;
        }
      }
      html += '</ul>';
    }
    return html;
  }

  prepareData(data, groupBy, defaultField = 'id') {
    if (data.length === 0) {
      return [];
    } else if (groupBy && data.length > 1 && !data[0][defaultField]) {
      const groupedData = {};
      for (const item of data) {
        const keys = Object.keys(item);
        if (item[groupBy]) {
          const group = item[groupBy];
          let foundAtLeastOne = false;
          for (const key of keys) {
            if (item[key]) {
              foundAtLeastOne = true;
              break;
            }
          }
          if (foundAtLeastOne && group) {
            if (!groupedData[group]) {
              groupedData[group] = [];
            }
            groupedData[group].push(item);
          }
        }
      }
      return Object.values(groupedData);
    }
    return data;
  }

  unsetEmptyIndexes(tempValues, removeIndex = false) {
    const noIndexes = [];
    for (const key in tempValues) {
      const value = tempValues[key];
      if (!value || value === 'n/a') {
        delete tempValues[key];
      }
      if (removeIndex && value) {
        noIndexes.push(value);
      }
    }
    return removeIndex ? noIndexes : tempValues;
  }
}

export { Vectorization };
