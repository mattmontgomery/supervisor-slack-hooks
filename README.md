# Supervisor Slack Hooks

This is a small tool to read Supervisor events and send them in a quick, easy-to-read format to Slack.

## Configuration

Copy `config.dev.json` to `config.json`. Update as needed. Any available Supervisor event can be used.
At current, only webhooks are supported. Token support may be added at a later date. (Or you can make a pull request!)

## Usage

Using a built version of the application, configure the script in Supervisor. An example is below.

An example supervisor configuration is found in [`supervisor/supervisor-slackhooks.conf`](supervisor/supervisor-slackhooks.conf).

## Building

There are two build scripts. One builds using `tsc` (`yarn run build:tsc`) and one builds using `rollup` (`yarn run build`, `yarn run build:rollup`).

The rollup build is recommended for production use. The `tsc` build is recommended for development use. Either woudl work in either situation.
