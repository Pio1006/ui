import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import { distanceInWordsToNow, format } from 'date-fns';
import isValid from 'date-fns/is_valid';
import parse from 'date-fns/parse';
import { withTranslation } from 'react-i18next';
import talendUtils from '@talend/utils';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import getLocale from '../../i18n/DateFnsLocale/locale';
import styles from './CellDatetime.scss';
import TooltipTrigger from '../../TooltipTrigger';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function computeValue(cellData, columnData, t) {
	const isDateValid = isValid(parse(cellData));

	if (isDateValid) {
		if (cellData && columnData.mode === 'ago') {
			return distanceInWordsToNow(cellData, {
				addSuffix: true,
				locale: getLocale(t),
			});
		} else if (columnData.mode === 'format') {
			if (columnData.timeZone) {
				return talendUtils.date.formatToTimeZone(cellData, columnData.pattern || DATE_TIME_FORMAT, {
					timeZone: columnData.timeZone,
				});
			}
			return format(cellData, columnData.pattern || DATE_TIME_FORMAT);
		}
	}

	return cellData;
}

export function getTooltipLabel(cellData, columnData) {
	if(typeof columnData.getTooltipLabel === 'function') {
		return columnData.getTooltipLabel(cellData);
	}
	if (columnData.mode === 'ago') {
		let tooltipLabel = '';
		if (columnData.timeZone) {
			tooltipLabel = talendUtils.date.formatToTimeZone(cellData, columnData.pattern || DATE_TIME_FORMAT, {
				timeZone: columnData.timeZone,
			});
		} else {
			tooltipLabel = format(cellData, columnData.pattern || DATE_TIME_FORMAT);
		}
		return tooltipLabel;
	}

	return columnData.tooltipLabel;
}
/**
 * Cell renderer that displays text + icon
 */
export class CellDatetimeComponent extends React.Component {
	shouldComponentUpdate(nextProps) {
		const watch = Object.keys(CellDatetimeComponent.propTypes.columnData);
		return (
			this.props.cellData !== nextProps.cellData ||
			!isEqual(pick(this.props.columnData, watch), pick(nextProps.columnData, watch))
		);
	}

	render() {
		const { cellData, columnData, t } = this.props;
		const computedValue = computeValue(cellData, columnData, t);
		const tooltipLabel = getTooltipLabel(cellData, columnData);

		const cell = (
			<div className={classnames('cell-datetime-container', styles['cell-datetime-container'])}>
				{computedValue}
			</div>
		);

		return (
			<TooltipTrigger
				label={tooltipLabel || computedValue}
				tooltipPlacement={columnData.tooltipPlacement || 'top'}
			>
				{cell}
			</TooltipTrigger>
		);
	}
}

CellDatetimeComponent.displayName = 'VirtualizedList(CellDatetime)';
CellDatetimeComponent.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	// Column data
	columnData: PropTypes.shape({
		tooltipPlacement: PropTypes.string,
		tooltipLabel: PropTypes.string,
		mode: PropTypes.string.isRequired,
		pattern: PropTypes.string,
		getTooltipLabel: PropTypes.func,
	}).isRequired,
	t: PropTypes.func,
};
CellDatetimeComponent.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(CellDatetimeComponent);
