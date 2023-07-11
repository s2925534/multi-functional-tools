import fs from 'fs';

class ScanDir {
  static directories = [];
  static files = [];
  static extFilter = [];
  static recursive = false;

  static scan(dirpath, extensions, recursive = false) {
    // Initialize defaults
    ScanDir.recursive = recursive;
    ScanDir.directories = [];
    ScanDir.files = [];
    ScanDir.extFilter = [];

    // Check if recursive scan | default action: no sub-directories
    if (recursive) {
      ScanDir.recursive = true;
    }

    // Was a filter on file extensions included? | default action: return all file types
    if (extensions) {
      if (Array.isArray(extensions)) {
        ScanDir.extFilter = extensions.map((ext) => ext.toLowerCase());
      } else if (typeof extensions === 'string') {
        ScanDir.extFilter.push(extensions.toLowerCase());
      }
    }

    // Grab path(s)
    ScanDir.verifyPaths(Array.isArray(dirpath) ? dirpath : [dirpath]);
    return ScanDir.files;
  }

  static verifyPaths(paths) {
    const pathErrors = [];
    paths.forEach((path) => {
      if (fs.existsSync(path)) {
        ScanDir.directories.push(path);
        const dirContents = ScanDir.findContents(path);
      } else {
        pathErrors.push(path);
      }
    });

    if (pathErrors.length > 0) {
      console.error('The following directories do not exist:', pathErrors);
    }
  }

  static findContents(dir) {
    const result = [];
    const root = fs.readdirSync(dir);
    root.forEach((value) => {
      if (value === '.' || value === '..') {
        return;
      }
      const filePath = `${dir}/${value}`;
      if (fs.statSync(filePath).isFile()) {
        if (
          ScanDir.extFilter.length === 0 ||
          ScanDir.extFilter.includes(filePath.toLowerCase().split('.').pop())
        ) {
          ScanDir.files.push(filePath);
          result.push(filePath);
        }
        return;
      }
      if (ScanDir.recursive) {
        const subDirContents = ScanDir.findContents(filePath);
        ScanDir.files.push(...subDirContents);
        result.push(...subDirContents);
      }
    });
    return result;
  }
}

export { ScanDir };
