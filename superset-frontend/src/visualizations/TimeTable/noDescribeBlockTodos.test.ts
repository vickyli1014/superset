/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import fs from 'fs';
import path from 'path';

function findTestFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findTestFiles(full));
    } else if (/\.test\.(ts|tsx)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

test('TimeTable test files have no describe-block TODO suppressions', () => {
  const timeTableDir = path.resolve(__dirname);
  const testFiles = findTestFiles(timeTableDir);
  const TODO_PATTERN = ['TODO', 'Migrate from describe blocks'].join(': ');

  const filesWithTodo = testFiles
    .filter(f => !f.endsWith('noDescribeBlockTodos.test.ts'))
    .filter(f => fs.readFileSync(f, 'utf-8').includes(TODO_PATTERN));

  expect(filesWithTodo).toEqual([]);
});
