#! /usr/bin/env node

const { clouds, getTemplateInitByCloud } = require("./config");

const args = process.argv.slice(2);
const [projectName, cloud] = args;

if (args.length < 2) {
  console.error(`Please use arguments: PROJECT_NAME CLOUD
PROJECT_NAME: Your project name.
CLOUD: ${clouds.join(", ")}`);
  process.exit(1);
}

const cloudInit = getTemplateInitByCloud(cloud);

const { help, templateBasePath, templateFiles } = cloudInit;
const options = { projectName, templateBasePath, help, templateFiles, cloud };
cloudInit.init(options);
