export class Config {
  private constructor(
    public name: string,
    public trip: string,
    public myPostStyle: string,
    public replyPostStyle: string,
    public replyLinkStyle: string
  ) {}

  public static readonly default: Config = new Config(
    "Name",
    "!Trip",
    `{ box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8); }`,
    `{ box-shadow: 6px 0 2px -2px rgba(157,47,208,.8), -6px 0 2px -2px rgba(157,47,208,.8); }`,
    `:after { content: ' (You)'; }`
  );

  private static readonly localStorageKey = "you-config";

  public static save(config: Config): Promise<void> {
    const configJson = JSON.stringify(config);

    return GM.setValue(Config.localStorageKey, configJson);
  }

  public static async load(): Promise<Config> {
    const defaultConfigJson = JSON.stringify(Config.default);
    const configJson = (
      await GM.getValue(Config.localStorageKey, defaultConfigJson)
    ).toString();

    return JSON.parse(configJson);
  }
}
