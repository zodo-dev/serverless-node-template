const fs = require("fs");
const path = require("path");

const createProject = (projectPath) => {
  if (fs.existsSync(projectPath)) {
    throw new Error(
      `Folder ${projectPath} exists. Delete or use another name.`
    );
  }
  fs.mkdirSync(projectPath);
  return true;
};

const createParentPath = (file) => {
  const parentPath = path.dirname(file);
  if (fs.existsSync(parentPath)) {
    return;
  }
  fs.mkdirSync(parentPath);
};

const readFileContent = (file) => fs.readFileSync(file).toString();

const listFilesFromPath = (baseName, pathName = "") => {
  const pathToList = path.resolve(baseName, pathName);
  const currentDirFiles = fs.readdirSync(pathToList);
  return currentDirFiles.reduce((acc, fileName) => {
    const file = path.resolve(pathToList, fileName);
    const relativeFileName = [pathName, fileName].filter(Boolean).join("/");
    if (fs.lstatSync(file).isFile()) {
      return [...acc, relativeFileName];
    }
    return [...acc, ...listFilesFromPath(baseName, relativeFileName)];
  }, []);
};

const objectToJSONFormatted = (obj) => {
  return JSON.stringify(obj, null, 2);
};

const writeFileContent = (file, getContent, options) => {
  const { currentDir, projectName, templateBasePath } = options;

  const content = getContent(path.resolve(templateBasePath, file), options);

  const outputFile = path.resolve(currentDir, projectName, file);
  createParentPath(outputFile);
  fs.writeFile(outputFile, content, () =>
    console.log(`File write ${file} success.`)
  );
};

const createContents = (options) => {
  const { templateFiles } = options;
  Object.entries(templateFiles).forEach(([file, getContent]) => {
    console.log({ file });
    writeFileContent(file, getContent, options);
  });
};

const awsLambdaInit = (options) => {
  const { projectName, help } = options;
  const currentDir = process.cwd();

  console.log(`Init: ${help}`);
  createProject(projectName);
  createContents({ currentDir, ...options });
};

const gcpCloudFunctionInit = (options) => {
  console.log("Not implemented yet", { options });
};

const azureCloudFunctionInit = (options) => {
  console.log("Not implemented yet", { options });
};

module.exports = {
  awsLambdaInit,
  gcpCloudFunctionInit,
  azureCloudFunctionInit,
  readFileContent,
  objectToJSONFormatted,
  listFilesFromPath,
};
