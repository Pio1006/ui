import React from 'react';
import classNames from 'classnames';
import { scaleLinear } from 'd3';
import useRangeInputField, { InputFieldProps } from '../useRangeInputField.hook';
import styles from './NumberInputField.component.scss';
import { formatNumber, getFractionDigits } from '../../../../formatters/formatters';
import { RangeHandler, Ticks } from '../range-handler.types';
import { formatD3Ticks } from '../slider-ticks.utils';
import { Range } from '../../../../types';

const formatter = (input: number) => `${input}`;
const parser = (input: string) => +input;

function getPrecision(limits: Range): number {
	return Math.max(getFractionDigits(limits.min), getFractionDigits(limits.max));
}

function getStep(limits: Range): string {
	// rc-slider is really picky
	const precision = getPrecision(limits);
	return Number(`1e-${precision}`).toFixed(precision);
}

function getTicks(limits: Range): Ticks {
	return formatD3Ticks(
		limits,
		scaleLinear()
			.domain([limits.min, limits.max])
			.ticks(
				// Use only 1 tick for big number
				limits.max < 1e10 && limits.max > 1e-10 ? 3 : 1,
			),
		v => formatNumber(v, +getPrecision(limits)),
	);
}

export function NumberInputField({
	id,
	value: rangeValue,
	onChange,
}: InputFieldProps): JSX.Element {
	const { setInputValue, submit, ...props } = useRangeInputField(
		rangeValue,
		formatter,
		parser,
		onChange,
	);

	return (
		<input
			id={id}
			className={classNames('form-control', styles['number-input-field'])}
			type="number"
			step="any"
			onChange={event => setInputValue(event.target.value)}
			{...props}
		/>
	);
}

export const NumberRangeHandler: RangeHandler = {
	inputField: NumberInputField,
	getStep,
	getTicks,
};