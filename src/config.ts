export class Config {
    public name: string;
    public trip: string;
    public myPostStyle: string;
    public replyPostStyle: string;
    public replyLinkStyle: string;

    private constructor(name: string, trip: string, myPostStyle: string, replyPostStyle: string, replyLinkStyle: string) {
        this.name = name;
        this.trip = trip;
        this.myPostStyle = myPostStyle;
        this.replyPostStyle = replyPostStyle;
        this.replyLinkStyle = replyLinkStyle;
    }

    public static readonly default: Config = new Config('Name', '!Trip',
        `{ box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8); }`,
        `{ box-shadow: 6px 0 2px -2px rgba(157,47,208,.8), -6px 0 2px -2px rgba(157,47,208,.8); }`,
        `:after { content: ' (You)'; }`);

    private static readonly localStorageKey = 'you-config';

    public static save(config: Config) {
        GM_setValue(Config.localStorageKey, JSON.stringify(config));
    }

    public static load(): Config {
        return JSON.parse(GM_getValue(Config.localStorageKey, JSON.stringify(Config.default)));
    }
}
