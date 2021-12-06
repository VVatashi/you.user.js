declare module GM {
  function setValue(
    key: string,
    value: string | number | boolean
  ): Promise<void>;

  function getValue(
    key: string,
    defaultValue: string | number | boolean
  ): Promise<string | number | boolean | undefined>;
}
