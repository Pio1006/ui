import get from 'lodash/get';
import includes from 'lodash/includes';

function getValue(value, strategy) {
	if (!strategy) {
		return value;
	}
	switch (strategy) {
		case 'length':
			if (value && value.length) {
				return value.length;
			}
			return 0;
		default:
			return false;
	}
}

function evaluateCondition(properties, condition) {
	const value = get(properties, condition.path);
	const actual = getValue(value, condition.strategy);
	return (condition.shouldBe !== false) === includes(condition.values, actual);
}

/**
 * Evaluate a list (array) of conditions against a contextual set of values (properties).
 * Condition specification is done through objects with the following attributes:
 * <ul>
 *   <li><em>values</em> (required): list of values compared to the evaluated value</li>
 *   <li><em>path</em> (required): the path used to extract the value from properties
 *   to use to compare to values</li>
 *   <li><em>shouldBe</em> (optional): should the evaluation activate this widget when
 *   true (default) or false (when shouldBe = true).</li>
 *   <li><em>strategy</em> (optional): by default the property value extraction
 *   just uses the path, but for some cases like array you can want some more advanced strategy
 *   like extracting the length. For such cases, there are some <code>evaluationStrategy</code>.
 *   Currently you can set this property to <code>length</code> to evaluate the length of an array
 *   when the extracted instance is an array, otherwise it will set the value to zero. Other
 *   strategy values will just return false.</li>
 * </ul>
 *
 * @example {
 *   values:["A", "B"],
 *   path: "someProp.someArray",
 *   shouldBe: true,
 *   evaluationStrategy: "length"
 * }
 *
 * The combination of the conditions is done through an <code>AND</code>
 * whereas, for a single condition, the test against <code>values</code>
 * is an <code>includes</code> (<code>OR</code>).
 *
 * @param properties source of the value provider to evaluate conditions.
 * @param conditions array of conditions to evaluate.
 * @returns true if the conditions are met, false otherwise.
 */
export default function shouldRender(conditions, properties) {
	return !conditions || conditions.every(cond => evaluateCondition(properties, cond));
}