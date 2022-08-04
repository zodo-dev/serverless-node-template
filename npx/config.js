const path = require("path");
const {
  awsLambdaInit,
  gcpCloudFunctionInit,
  azureCloudFunctionInit,
  readFileContent,
  objectToJSONFormatted,
  listFilesFromPath,
} = require("./helpers");

const templateBasePath = path.resolve(__dirname, "../", "templates/base");

const buildGetContent = (basePath) => (file, _) =>
  readFileContent(path.resolve(basePath, file));

const configurePackageJson = (file, options) => {
  const { projectName, cloud } = options;
  const content = JSON.parse(readFileContent(file));
  const { name = "", description = "", ...data } = content;
  return objectToJSONFormatted({
    name: projectName,
    description: `[${cloud}] ${description}`,
    ...data,
  });
};

const sharedFiles = {
  ...listFilesFromPath(templateBasePath).reduce(
    (acc, file) => ({
      ...acc,
      [file]: buildGetContent(templateBasePath),
    }),
    {}
  ),
  "package.json": configurePackageJson,
  "README.md": (file, { projectName }) => {
    const content = buildGetContent(templateBasePath)(file)
      .split("\n")
      .slice(1);
    return [`# ${projectName}`, ...content].join("\n");
  },
};

const cloudOptions = {
  aws: {
    help: "Template for use in AWS Lambda.",
    init: awsLambdaInit,
    templateFiles: { ...sharedFiles },
    templateBasePath,
  },
  gcp: {
    help: "Template for use in Google Cloud Function.",
    init: gcpCloudFunctionInit,
    templateFiles: { ...sharedFiles },
    templateBasePath,
  },
  azure: {
    help: "Template for use in Azure Cloud Function.",
    init: azureCloudFunctionInit,
    templateFiles: { ...sharedFiles },
    templateBasePath,
  },
};

const cloudOptionsHelp = () => {};

module.exports = {
  getTemplateInitByCloud: (cloud) => {
    const cloudInit = cloudOptions[cloud?.toLowerCase()];
    if (!cloudInit) {
      throw new Error(cloudOptionsHelp());
    }
    return cloudInit;
  },
  clouds: Object.keys(cloudOptions),
};
