"use strict";

const fs = require(`fs`).promises;
const express = require(`express`);
const chalk = require(`chalk`);

const {HttpCode, MOCK_FILE_NAME} = require(`./../../constants`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(MOCK_FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.send(mocks);
  } catch (e) {
    res.send([]);
  }
});

app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.log(chalk.error(`Error on create ser: ${err}`));
      }
      return console.log(chalk.green(`Waiting to connect on ${port}`));
    });
  }
};
