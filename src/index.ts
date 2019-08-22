import Slack from "./Slack";
import SupervisorDebugger from "./SupervisorDebugger";

import supervisor from "supervisord-eventlistener";
import config from "../config.json";

const webhookUrl: string = `https://hooks.slack.com/services/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`;

const slack = new Slack(webhookUrl);

const VERBOSE = true;

(async () => {
  supervisor.on("event", async (type: string, headers, data) => {
    if (VERBOSE) {
      console.error({ type, headers, data });
    }
    if (Object.keys(config.HOOKS).includes(type)) {
      await slack.send(
        SupervisorDebugger.formatMessage(type, headers, data),
        [SupervisorDebugger.formatAttachment(type, headers, data)],
        config.HOOKS[type]
      );
    }
  });
  supervisor.listen(process.stdin, process.stdout);
})();
