import fs from 'fs';
import xml2js from 'xml2js';

class XmlManipulation {
  constructor() {
    this.stringManipulation = new Strings();
    this.webManipulation = new Web();
  }

  parseXMLToJson(reference) {
    let content = '';
    // Deal with XML already retrieved
    if (this.isValidXmlContent(reference)) {
      content = reference;
    } else if (this.webManipulation.validateURLString(reference)) {
      // Deal with XML to be retrieved from URL link
      content = fs.readFileSync(reference, 'utf-8');
    } else if (typeof reference === 'string') {
      // Local XML location is given
      content = fs.readFileSync(reference, 'utf-8');
    }
    const simpleXml = this.cleanXMLContent(content);

    return JSON.stringify(simpleXml);
  }

  isValidXmlContent(content) {
    content = content.trim();
    if (content === '') {
      return false;
    }

    if (content.toLowerCase().includes('<!doctype html>')) {
      return false;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'text/xml');
    const parserErrors = xmlDoc.getElementsByTagName('parsererror');
    return parserErrors.length === 0;
  }

  cleanXMLContent(content) {
    content = content.replace(/\n|\r|\t/g, '');
    content = content.trim().replace(/"/g, "'");
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'text/xml');
    return this.xmlToJson(xmlDoc);
  }

  xmlToJson(xml) {
    const result = {};
    if (xml.nodeType === 1) {
      // element
      if (xml.attributes.length > 0) {
        result['@attributes'] = {};
        for (let i = 0; i < xml.attributes.length; i++) {
          const attribute = xml.attributes[i];
          result['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      // text
      result['#text'] = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes[i];
        const nodeName = item.nodeName;
        if (typeof result[nodeName] === 'undefined') {
          result[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof result[nodeName].push === 'undefined') {
            const old = result[nodeName];
            result[nodeName] = [];
            result[nodeName].push(old);
          }
          result[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return result;
  }

  convertXMLToCSV(xml, input) {
    const csvData = [];
    this.convertXMLToCSVRecursive(xml, csvData);
    csvData.forEach((row) => {
      input.write(row.join(',') + '\n');
    });
  }

  convertXMLToCSVRecursive(xml, csvData, parentKey = '') {
    xml.forEach((item) => {
      const hasChild = Object.keys(item).some((key) => Array.isArray(item[key]));
      if (!hasChild) {
        const row = [];
        Object.keys(item).forEach((key) => {
          if (key !== '@attributes' && key !== '#text') {
            const value = item[key];
            const prefixedKey = parentKey ? parentKey + '.' + key : key;
            row.push(prefixedKey);
            row.push(value);
          }
        });
        csvData.push(row);
      } else {
        Object.keys(item).forEach((key) => {
          if (key !== '@attributes') {
            const value = item[key];
            const prefixedKey = parentKey ? parentKey + '.' + key : key;
            this.convertXMLToCSVRecursive(value, csvData, prefixedKey);
          }
        });
      }
    });
  }
}

export default XmlManipulation;
