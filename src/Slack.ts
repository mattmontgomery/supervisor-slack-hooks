import fetch from "node-fetch";

export interface SlackAttachment {
  title: string;
  ts: number;
  fallback: string;
  color?: string;
  short?: boolean;
  fields?: Array<SlackAttachmentField>;
}
export interface SlackAttachmentField {
  title: string;
  value: string;
}
export interface SlackHookConfig {
  color: string;
  hook: string;
}

export default class Slack {
  private hookUrl = "";
  constructor(hookUrl: string) {
    this.hookUrl = hookUrl;
  }
  async send(
    message: string,
    attachments?: SlackAttachment[],
    hookConfig?: SlackHookConfig
  ) {
    return await fetch(hookConfig ? hookConfig.hook : this.hookUrl, {
      method: "POST",
      body: JSON.stringify({
        text: message,
        attachments: attachments
          ? attachments.map(attachment => ({
              color: hookConfig.color,
              ...attachment
            }))
          : null
      })
    });
  }
}
