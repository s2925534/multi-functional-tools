import yaml from 'js-yaml';

class YamlManipulation {
  constructor() {
    this.stringManipulation = new Strings();
  }

  sqlCase(data) {
    data = JSON.parse(JSON.stringify(data));
    return Object.keys(data).reduce((carry, key) => {
      const sqlKey = this.stringManipulation.lccToSql(key);
      if (!Array.isArray(data[key])) {
        carry[sqlKey] = data[key];
      } else {
        carry[sqlKey] = this.sqlCase(data[key]);
      }
      return carry;
    }, {});
  }

  transformYamlToArray(yamlString) {
    try {
      const array = yaml.load(yamlString);
      return array;
    } catch (error) {
      console.error('Error transforming YAML to array:', error);
      return [];
    }
  }
}

export default YamlManipulation;
