export type Range = {
	min: number;
	max: number;
	excludeMax?: boolean;
};

export enum DataType {
	DATE = 'DATE',
	NUMBER = 'NUMBER',
}

export enum ChartStyle {
	VALUE = 'value',
	PATTERN = 'pattern',
}
