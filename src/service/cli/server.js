"use strict";

const express = require(`express`);
const chalk = require(`chalk`);

const {HttpCode, API_PREFIX} = require(`./../../constants`);
const routers = require(`../api`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(API_PREFIX, routers);


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
