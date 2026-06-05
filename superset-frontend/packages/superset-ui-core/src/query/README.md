<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

## @superset-ui/core/query

Utility to make API requests to Superset backend.

#### Example usage

```ts
import {
  buildQueryContext,
  buildQueryObject,
  DatasourceKey,
  getMetricLabel,
} from '@superset-ui/core';

// Build a query context from chart form data
const queryContext = buildQueryContext(formData, {
  buildQuery: baseQuery => [
    {
      ...baseQuery,
      row_limit: 100,
      orderby: [['count(*)', false]],
    },
  ],
});

// Parse a datasource identifier
const key = new DatasourceKey('7__table');
console.log(key.id);   // 7
console.log(key.type); // "table"

// Resolve a metric label from an adhoc or saved metric
const label = getMetricLabel({ label: 'My Metric' });
```

#### API

| Export | Description |
| --- | --- |
| `buildQueryContext(formData, options?)` | Converts chart form data into a full `QueryContext` payload suitable for the `/api/v1/chart/data` endpoint. Accepts an optional `buildQuery` callback to customize the array of `QueryObject`s produced from the base query. |
| `buildQueryObject(formData, queryFields?)` | Builds a single `QueryObject` from form data, resolving filters, extras, time grain, metrics, and columns. Used internally by `buildQueryContext`. |
| `DatasourceKey` | Parses a `"<id>__<type>"` datasource string into its numeric `id` and `DatasourceType`. Provides `toString()` and `toObject()` helpers. |
| `makeApi(options)` | Factory that creates a typed async function for calling a Superset REST endpoint. Handles JSON/form/rison encoding, CSRF, and error normalization. |
| `getClientErrorObject(response)` | Extracts a normalized `ClientErrorObject` from a failed `SupersetClientResponse`, consolidating error messages, stack traces, and status codes. |
| `getMetricLabel(metric)` | Returns a display label for a metric, whether it is a saved metric string or an adhoc metric object. |
| `getColumnLabel(column)` | Returns a display label for a column, handling both simple string columns and adhoc column objects. |
| `convertFilter(filter)` | Converts a legacy filter object into the current `QueryObjectFilterClause` format. |
| `extractTimegrain(formData)` | Extracts the time grain value from form data, checking multiple legacy and current field names. |
| `normalizeOrderBy(queryObject)` | Normalizes the `orderby` field of a query object to ensure consistent `[metric, ascending]` tuple format. |
| `ApiLegacy` / `ApiV1` | Namespaced collections of pre-built API callers for Superset legacy and v1 endpoints. |
