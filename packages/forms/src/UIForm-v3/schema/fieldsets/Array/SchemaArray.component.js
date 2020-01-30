import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import Widget, { PROPS_TO_REMOVE_FROM_INPUTS } from '../../Widget';
import ArrayFieldset from '../../../fieldsets/Array';

function injectItemIndex(itemIndex, genericSchema) {
	// insert index in first empty key part
	const key = [...genericSchema.key];
	const emptyIndex = key.findIndex(part => part === '');
	key[emptyIndex] = itemIndex;

	// insert index in all nested elements' key
	const schema = { ...genericSchema, key };
	if (schema.items) {
		schema.items = schema.items.map(nestedItemSchema =>
			injectItemIndex(itemIndex, nestedItemSchema),
		);
	}

	return schema;
}

export default function SchemaArray({ id, displayMode, schema, templates, ...restProps }) {
	const { title, items, options = {} } = schema;
	const { hideTitle, ...restOptions } = options;

	const templateName = displayMode ? `array_${displayMode}` : 'array';
	const ItemsTemplate = templates[templateName] || ArrayFieldset.ItemsTemplate;

	return (
		<ArrayFieldset
			legend={title}
			hideLegend={hideTitle}
			id={id}
			{...restOptions}
			{...omit(restProps, PROPS_TO_REMOVE_FROM_INPUTS)}
		>
			<ItemsTemplate id={id}>
				{itemIndex => (
					<React.Fragment>
						{items.map((itemSchema, index) => (
							<Widget key={index} id={id} schema={injectItemIndex(itemIndex, itemSchema)} />
						))}
					</React.Fragment>
				)}
			</ItemsTemplate>
		</ArrayFieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SchemaArray.propTypes = {
		id: PropTypes.string.isRequired,
		displayMode: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			items: PropTypes.array,
			options: PropTypes.shape({ hideTitle: PropTypes.bool }),
		}),
		templates: PropTypes.object,
	};
}