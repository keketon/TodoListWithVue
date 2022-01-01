export interface Label {
  value: number;
  label: string;
}

export const sampleLabels: Array<Label> = [
  { value: -1, label: "すべて" },
  { value: 0, label: "作業中" },
  { value: 1, label: "完了" },
];

export interface Labels {
  [value: number]: string;
}
