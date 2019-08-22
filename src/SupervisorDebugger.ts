import { SlackAttachment } from "./Slack";

interface SupervisorHeaders {
  eventname: string;
  server: string;
  any: string;
}

interface SupervisorData {
  processname: string;
  groupname: string;
  from_state: string;
  tries: string;
}

export default class SupervisorDebugger {
  static formatMessage(
    type: string,
    headers: SupervisorHeaders,
    data: SupervisorData
  ) {
    const procName: string =
      data.processname === data.groupname
        ? data.processname
        : `${data.groupname}:${data.processname}`;
    return procName
      ? `*\`${procName}\`* entered state \`${type}\``
      : `*\`${type}\`*`;
  }
  static formatAttachment(
    type: string,
    headers: SupervisorHeaders,
    data: SupervisorData
  ): SlackAttachment {
    const procName: string =
      data.processname === data.groupname
        ? data.processname
        : `${data.groupname}:${data.processname}`;
    return {
      fallback: SupervisorDebugger.formatMessage(type, headers, data),
      title: `Supervisord Monitor (server: ${headers.server})`,
      ts: new Date().getTime() / 1000,
      fields: [
        procName
          ? { title: "Process", value: `\`${procName}\``, short: true }
          : null,
        {
          title: "Type",
          value: `\`${type}\`${
            data.from_state ? ` (was \`${data.from_state})\`` : ""
          }`,
          short: true
        }
      ].filter(Boolean)
    };
  }
}
