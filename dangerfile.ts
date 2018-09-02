import { message, warn, danger } from 'danger';

interface CodePosition {
  character: number;
  line: number;
  position: number;
}

interface TsLintResponse {
  startPosition: CodePosition;
  endPosition: CodePosition;
  //   fix: {};
  failure: string;
  name: string;
  ruleName: string;
  ruleSeverity: string;
}

const modifiedFiles = danger.git.modified_files;

const execSync = require('child_process').execSync;
const result = execSync('yarn tslint -c tslint.json src/**/*.ts -t json --force').toString();
const rawJson = result.substring(result.indexOf('\n') + 1);
const responses = JSON.parse(rawJson) as TsLintResponse[];
const firstItem = responses[0];
warn(firstItem.failure, firstItem.name, firstItem.startPosition.line);
const filterd = responses.filter((item: TsLintResponse) => {
  return modifiedFiles.includes(item.name);
});
filterd.forEach((item: TsLintResponse) => {
  warn(item.failure, item.name, item.startPosition.line);
});

message('Changed Files in this PR: \n - ');
