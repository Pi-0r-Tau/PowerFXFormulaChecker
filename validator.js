'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const formulaInput = document.getElementById('formulaInput');
    const validateBtn = document.getElementById('validateBtn');
    const validationResult = document.getElementById('validationResult');
    const functionInfo = document.getElementById('functionInfo');
    const functionDetails = document.getElementById('functionDetails');
    const dataTypes = ['Boolean', 'Number', 'String', 'Date', 'Record', 'Table'];  //TODO: Integrate with style Issues TODO feature 

    const operatorRules = {
        '+': {
            name: 'Addition',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Addition operator requires exactly two operands',
            description: 'Adds two numbers together or concatenates strings'
        },
        '-': {
            name: 'Subtraction',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Subtraction operator requires exactly two operands',
            description: 'Subtracts the second number from the first number'
        },
        '=': {
            name: 'Equality',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Equality operator requires exactly two operands',
            description: 'Tests if two values are equal and returns a boolean'
        },
        '*': {
            name: 'Multiplication',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Multiplication operator requires exactly two operands',
            description: 'Multiplies two numbers together'
        },
        '/': {
            name: 'Division',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2 && parseFloat(args[1]) !== 0,
            error: 'Division operator requires exactly two operands and divisor cannot be zero',
            description: 'Divides the first number by the second number'
        },
        '^': {
            name: 'Power',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Power operator requires exactly two operands',
            description: 'Raises the first number to the power of the second number'
        },
        '<>': {
            name: 'NotEqual',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Not equal operator requires exactly two operands',
            description: 'Tests if two values are not equal and returns a boolean'
        },
        '>': {
            name: 'GreaterThan',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Greater than operator requires exactly two operands',
            description: 'Tests if first value is greater than second value'
        },
        '>=': {
            name: 'GreaterThanOrEqual',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Greater than or equal operator requires exactly two operands',
            description: 'Tests if first value is greater than or equal to second value'
        },
        '<': {
            name: 'LessThan',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Less than operator requires exactly two operands',
            description: 'Tests if first value is less than second value'
        },
        '<=': {
            name: 'LessThanOrEqual',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Less than or equal operator requires exactly two operands',
            description: 'Tests if first value is less than or equal to second value'
        },
        '&&': {
            name: 'And',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'AND operator requires exactly two operands',
            description: 'Returns true if both conditions are true'
        },
        '||': {
            name: 'Or',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'OR operator requires exactly two operands',
            description: 'Returns true if either condition is true'
        },
        '!': {
            name: 'Not',
            minOperands: 1,
            maxOperands: 1,
            validate: (args) => args.length === 1,
            error: 'NOT operator requires exactly one operand',
            description: 'Negates a boolean value (true becomes false, false becomes true)'
        },
        '.': {
            name: 'ParentAccess',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'Parent access operator requires exactly two operands',
            description: 'Accesses a property or method of an object'
        },
        '@': {
            name: 'SelfReference',
            minOperands: 1,
            maxOperands: 1,
            validate: (args) => args.length === 1,
            error: 'Self-reference operator requires exactly one operand',
            description: 'References the current record in a data operation'
        },
        'in': {
            name: 'In',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'In operator requires exactly two operands',
            description: 'Tests if a value exists in a table or collection'
        },
        'exactin': {
            name: 'ExactIn',
            minOperands: 2,
            maxOperands: 2,
            validate: (args) => args.length === 2,
            error: 'ExactIn operator requires exactly two operands',
            description: 'Tests if a value exists in a table or collection (case-sensitive)'
        }
    };
   // TODO: Update with more documentation links for power fx functions
    const documentationLinks = {
        'Text': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-text',
        'DateAdd': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-dateadd-datediff',
        'Filter': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-filter-lookup',
        'If': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-if',
        'IsBlank': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-isblank-isempty',
        'CountRows': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table-counts',
        'Len': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-len',
        'StartsWith': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-startswith-endswith',
        'EndsWith': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-startswith-endswith',
        'IsEmpty': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-isblank-isempty',
        'Year': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datetime-parts',
        'Month': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datetime-parts',
        'Day': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datetime-parts',
        'Abs': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-abs',
        'AddColumns': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table-shaping',
        'And': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-logicals',
        'Average': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-aggregates',
        'Boolean': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-boolean',
        'Char': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-char',
        'Collect': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-clear-collect-clearcollect',
        'Clear': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-clear-collect-clearcollect',
        'ClearCollect': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-clear-collect-clearcollect',
        'ColorValue': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-colors',
        'Concat': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-concatenate',
        'Count': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table-counts',
        'CountA': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table-counts',
        'CountIf': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table-counts',
        'CountRows': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table-counts',
        'DataSourceInfo': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datasourceinfo',
        'EOMonth': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-dateadd-datediff',
        'Error': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-errors',
        'First': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-first-last',
        'GroupBy': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-groupby',
        'IsMatch': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-ismatch',
        'JSON': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-json',
        'Location': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-location',
        'Log': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-numericals',
        'LookUp': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-filter-lookup',
        'Lower': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-lower-upper-proper',
        'Match': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-ismatch',
        'Max': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-aggregates',
        'Min': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-aggregates',
        'Navigate': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-navigate',
        'Not': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-logicals',
        'ParseJSON': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-parsejson',
        'Power': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-numericals',
        'Proper': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-lower-upper-proper',
        'Rand': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-rand',
        'RandBetween': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-rand',
        'Remove': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-remove-removeif',
        'RemoveIf': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-remove-removeif',
        'Replace': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-replace-substitute',
        'Round': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-round',
        'RoundDown': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-round',
        'RoundUp': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-round',
        'Search': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-filter-lookup',
        'Sequence': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-sequence',
        'ShowColumns': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-table-shaping',
        'Sort': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-sort',
        'SortByColumns': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-sort',
        'Split': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-split',
        'Sqrt': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-numericals',
        'Sum': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-sum',
        'Switch': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-if',
        'Text': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-text',
        'Time': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datetime-parts',
        'Today': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datetime-parts',
        'Upper': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-lower-upper-proper',
        'Value': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-value',
        'VarP': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-aggregates',
        'Weekday': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datetime-parts',
        'WeekNum': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datetime-parts',
        'With': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-with',
        'Year': 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-datetime-parts'
    };



    validateBtn.addEventListener('click', function() {
        const formula = formulaInput.value;
        if (!formula.trim()) {
            showError('Formula cannot be empty');
            return;
        }
        validateAndAnalyzeFormula();
    });

    function validateAndAnalyzeFormula() {
        const formula = formulaInput.value;
        const explanationResult = document.getElementById('explanationResult');

        if (!formula.trim()) {
            showError('Formula cannot be empty');
            return;
        }

        // Basic syntax check
        const syntaxCheck = validateParentheses(formula);
        if (!syntaxCheck.isValid) {
            validationResult.innerHTML = generateDetailedReport({
                errors: syntaxCheck.errors,
                warnings: [],
                suggestions: [],
                functions: [],
                complexity: 'Simple',
                styleIssues: [],
                delegationIssues: [],
                formulaBreakdown: []
            });
            return;
        }

        // Main formula analysis
        const formulas = splitFormulas(formula);

        let hasErrors = false;
        let combinedAnalysis = {
            errors: [],
            warnings: [],
            suggestions: [],
            functions: [],
            complexity: 'Simple',
            styleIssues: [],
            delegationIssues: [],
            formulaBreakdown: []
        };
        // TODO: FIX index declared but never used
        formulas.forEach((singleFormula, index) => {
            // Parse nested functions and analyze
            const parsedFunctions = parseNestedFunctions(singleFormula) || [];
            const functionValidation = validateFunctions(singleFormula, parsedFunctions) || {
                errors: [],
                suggestions: [],
                functions: []
            };
            const complexity = assessComplexity(singleFormula);

            // Create formula breakdown with null checks
            if (parsedFunctions.length > 0) {
                combinedAnalysis.formulaBreakdown.push({
                    formula: singleFormula,
                    functions: parsedFunctions.map(func => ({
                        name: func?.name || 'Unknown',
                        args: func?.args || [],
                        description: getFunctionDescription(func?.name) || '',
                        documentation: func?.name ? documentationLinks[func.name] || null : null
                    }))
                });
            }

            // Check various aspects with proper initialization
            const analysis = {
                errors: [],
                warnings: [],
                suggestions: [],
                styleIssues: [],
                delegationIssues: []
            };

            checkBasicSyntax(singleFormula, analysis);
            checkDataTypeConsistency(singleFormula, analysis);
            checkDelegation(singleFormula, analysis);
            checkCollectionPatterns(singleFormula, analysis);

            // Combine results
            combinedAnalysis.errors.push(...functionValidation.errors);
            combinedAnalysis.warnings.push(...analysis.warnings);
            combinedAnalysis.suggestions.push(...analysis.suggestions);
            combinedAnalysis.styleIssues.push(...analysis.styleIssues);
            combinedAnalysis.delegationIssues.push(...analysis.delegationIssues);
            combinedAnalysis.functions.push(...functionValidation.functions);

            // Update complexity
            combinedAnalysis.complexity = getHigherComplexity(combinedAnalysis.complexity, complexity);

            if (functionValidation.errors.length > 0) {
                hasErrors = true;
            }
        });

        // Show final results with both validation and explanation
        if (hasErrors) {
            validationResult.innerHTML = generateDetailedReport(combinedAnalysis);
        } else {
            showSuccess('Formula validated successfully');
            validationResult.innerHTML = generateDetailedReport(combinedAnalysis);
        }

        // Show detailed function explanations in separate section
        const explanation = generateExplanation(combinedAnalysis.functions);
        explanationResult.innerHTML = explanation;

        // Initialize collapsibles after rendering the report TODO: FIX interactive collapsibles
        setTimeout(initializeCollapsibles, 0);
    }

    function validateParentheses(formula) {
        const stack = [];
        const errors = [];
        let inString = false;
        let lineNum = 1;
        let colNum = 0;

        for (let i = 0; i < formula.length; i++) {
            const char = formula[i];
            colNum++;

            // Handle string literals
            if (char === '"' && formula[i - 1] !== '\\') {
                inString = !inString;
                continue;
            }

            if (!inString) {
                if (char === '(' || char === '{' || char === '[') {
                    stack.push({ char, pos: i, line: lineNum, col: colNum });
                } else if (char === ')' || char === '}' || char === ']') {
                    if (stack.length === 0) {
                        errors.push(`Unexpected closing ${char} at position ${i} (line ${lineNum}, column ${colNum})`);
                        continue;
                    }

                    const last = stack.pop();
                    const pairs = { '(': ')', '{': '}', '[': ']' };
                    if (pairs[last.char] !== char) {
                        errors.push(`Mismatched brackets: expected ${pairs[last.char]} but found ${char} at position ${i} (line ${lineNum}, column ${colNum})`);
                    }
                }
            }

            if (char === '\n') {
                lineNum++;
                colNum = 0;
            }
        }

        // Check for unclosed brackets
        stack.forEach(item => {
            errors.push(`Unclosed ${item.char} at position ${item.pos} (line ${item.line}, column ${item.col})`);
        });

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    function generateDetailedReport(analysis) {
        let report = '<div class="analysis-report">';

        // Move error section to the top and always show it
        report += '<div class="section validation-results">';
        report += '<h3>Validation Results</h3>';
        if (analysis.errors && analysis.errors.length > 0) {
            report += createCollapsibleSection('Syntax Errors', analysis.errors, 'high', '⚠️');
        } else {
            report += '<div class="success-message">✓ No syntax errors detected</div>';
        }
        report += '</div>';

        // Formula Breakdown Section
        report += '<div class="section formula-breakdown">';
        report += '<h3>Formula Breakdown</h3>';
        //TODO: FIX index not used
        analysis.formulaBreakdown.forEach((item, index) => { 
            report += `
                <div class="formula-item">
                    <div class="formula-text"><code>${item.formula}</code></div>
                    <div class="functions-list">
                        ${generateNestedFunctionBreakdown(item.functions)}
                    </div>
                </div>`;
        });
        report += '</div>';

        // Validation Results Section
        if (analysis.errors.length > 0) {
            report += createCollapsibleSection('Errors Found', analysis.errors, 'high', '⚠️');
        } else {
            report += '<div class="success-message">✓ No syntax errors detected</div>';
        }

        // Warnings Section
        if (analysis.warnings.length > 0) {
            report += createCollapsibleSection('Warnings', analysis.warnings, 'medium', '⚠️');
        }

        // Delegation Issues Section
        if (analysis.delegationIssues.length > 0) {
            report += createCollapsibleSection('Delegation Considerations',
                analysis.delegationIssues, 'medium', '🔄');
        }

        // Style Suggestions Section
        if (analysis.styleIssues.length > 0) {
            report += createCollapsibleSection('Style Suggestions',
                analysis.styleIssues, 'low', '🎨');
        }

        // Complexity Analysis Section
        report += `<div class="section complexity-analysis">
            <h3>Complexity Analysis</h3>
            <div class="complexity-level ${analysis.complexity.toLowerCase()}">
                ${analysis.complexity}
            </div>
            <p class="complexity-explanation">
                ${getComplexityExplanation(analysis.complexity)}
            </p>
        </div>`;

        // Performance Suggestions Section
        if (analysis.suggestions.length > 0) {
            report += createCollapsibleSection('Performance Suggestions',
                analysis.suggestions, 'medium', '⚡');
        }

        report += '</div>';
        return report;
    }

    function generateNestedFunctionBreakdown(functions, level = 0) {
        let html = '<div class="formula-tree">';
        functions.forEach((func, idx) => {
            const uniqueId = `func-${level}-${Date.now()}-${idx}`;
            html += `
                <div class="tree-node">
                    <div class="function-node">
                        <div class="function-header" onclick="toggleFunction('${uniqueId}')">
                            <span class="function-name">${func.name}</span>
                            <div class="tree-controls">
                                ${documentationLinks[func.name] ?
                                    `<a href="${documentationLinks[func.name]}" target="_blank" class="doc-link">📚</a>` : ''}
                                <span class="tree-toggle">▼</span>
                            </div>
                        </div>
                        <div id="${uniqueId}" class="tree-content">
                            <div class="function-args">
                                ${func.args.map((arg, i) => `
                                    <div class="arg-item">
                                        <span class="arg-number">${i + 1}:</span>
                                        <code>${arg}</code>
                                        ${generateArgExplanation(arg)}
                                    </div>
                                `).join('')}
                            </div>
                            ${func.nestedFunctions && func.nestedFunctions.length > 0 ?
                                generateNestedFunctionBreakdown(func.nestedFunctions, level + 1) : ''}
                        </div>
                    </div>
                </div>`;
        });
        html += '</div>';
        return html;
    }

    window.toggleFunction = function(id) {
        const content = document.getElementById(id);
        const header = content.previousElementSibling;
        const toggle = header.querySelector('.tree-toggle');

        content.classList.toggle('collapsed');
        toggle.textContent = content.classList.contains('collapsed') ? '▶' : '▼';
    };

    function generateArgExplanation(arg) {
        // Check if the argument contains a function
        const nestedFunctions = parseNestedFunctions(arg);
        if (nestedFunctions.length > 0) {
            return `<div class="arg-explanation">
                <p>Contains nested function(s):</p>
                ${generateNestedFunctionBreakdown(nestedFunctions, 1)}
            </div>`;
        }

        // Check if it's a record literal
        if (arg.trim().startsWith('{') && arg.trim().endsWith('}')) {
            return '<div class="arg-explanation"><p>Record literal containing field definitions</p></div>';
        }

        return '';
    }

    function explainArgument(arg) {
        // Check for operators
        const operators = {
            '=': 'Equality comparison',
            '<>': 'Not equal to',
            '>': 'Greater than',
            '>=': 'Greater than or equal to',
            '<': 'Less than',
            '<=': 'Less than or equal to',
            '&&': 'Logical AND',
            '||': 'Logical OR',
            'in': 'Contains in collection'
        };

        let explanation = '';



        // This section is repeated due to annoying bug. TODO: Review and fix, remove redundant code.
    function isPartOfFunctionName(arg, op) {
        // Check if the 'in' is part of a function name like "ColumnNames" or other identifiers
        const functionPattern = new RegExp(`[A-Za-z]+${op}[A-Za-z]+`, 'i');
        return functionPattern.test(arg);
    }

    function hasOperator(arg, op) {
        // More precise operator detection
        const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`(?<![A-Za-z])${escapedOp}(?![A-Za-z])`, 'i');
        return pattern.test(arg);
    }

    function splitByOperator(arg, op) {
        // More precise splitting that respects function parentheses
        const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = arg.split(new RegExp(`(?<![A-Za-z])${escapedOp}(?![A-Za-z])`));
        return parts.length === 2 ? [parts[0].trim(), parts[1].trim()] : [null, null];
    }

        // Check for comparison operations with improved operator detection
        Object.entries(operators).forEach(([op, desc]) => {
            // Skip 'in' operator when it's part of a function name or identifier
            if (op === 'in' && isPartOfFunctionName(arg, 'in')) {
                return;
            }

            if (hasOperator(arg, op)) {
                const [left, right] = splitByOperator(arg, op);
                if (left && right) {
                    explanation += `
                        <div class="operator-explanation">
                            <p><strong>${desc}:</strong></p>
                            <ul>
                                <li>Left side: <code>${left}</code> ${explainValue(left)}</li>
                                <li>Right side: <code>${right}</code> ${explainValue(right)}</li>
                            </ul>
                        </div>`;
                }
            }
        });

        return explanation;
    }

    function generateStepExplanation(func) {  //TODO: Fix value not read
        return `
            <div class="step-explanation">
                <h5>What this step does:</h5>
                ${getFunctionExplanation(func.name)}
                <p>${getFunctionPurpose(func)}</p>
                ${generateExplanation(func)}
            </div>
        `;
    }

    function getFunctionExplanation(functionName) {
        const rule = window[functionName + 'Rule'];
        if (!rule) return '';

        const validationResult = rule.validate ? rule.validate([]) : null;

        return `
            <div class="function-description">
                ${rule.description ? `<p class="description">${rule.description}</p>` : ''}
                ${rule.syntax ? `<p class="syntax"><strong>Syntax:</strong> ${rule.syntax}</p>` : ''}
                ${rule.returnType ? `<p class="return-type"><strong>Returns:</strong> ${rule.returnType}</p>` : ''}
                ${validationResult && !validationResult.isValid ? `<p class="validation"><strong>Validation:</strong> ${validationResult.error}</p>` : ''}
                ${documentationLinks[functionName] ?
                    `<p class="documentation"><a href="${documentationLinks[functionName]}" target="_blank">📚 Documentation</a></p>`
                    : ''}
            </div>
        `;
    }

    function getComplexityExplanation(complexity) {
        const explanations = {
            'Simple': 'This formula is straightforward and easy to maintain.',
            'Moderate': 'This formula has some complexity but is still manageable.',
            'Complex': 'Consider breaking this formula into smaller parts for better maintainability.',
            'Very Complex': 'This formula is highly complex. Consider refactoring into multiple steps or variables.'
        };
        return explanations[complexity] || '';
    }

    function getHigherComplexity(current, new_) {
        const levels = ['Simple', 'Moderate', 'Complex', 'Very Complex'];
        const currentIndex = levels.indexOf(current);
        const newIndex = levels.indexOf(new_);
        return levels[Math.max(currentIndex, newIndex)];
    }

    function validateFunctions(formula, parsedFunctions) {
        const result = {
            errors: [],
            suggestions: [],
            functions: []
        };

        if (!parsedFunctions || parsedFunctions.length === 0) {
            // If no functions found, check if it's a valid expression
            if (!isValidExpression(formula)) {
                result.errors.push('Invalid formula structure');
            }
            return result;
        }

        parsedFunctions.forEach(func => {
            const validation = validateFunctionCall(func.name, func.args);
            if (!validation.isValid) {
                result.errors.push(validation.error);
            }

            result.functions.push({
                type: 'function',
                name: func.name,
                args: func.args,
                isValid: validation.isValid,
                description: getFunctionDescription(func.name),
                error: validation.isValid ? null : validation.error
            });

            // Recursively validate nested functions
            func.nestedFunctions.forEach(nestedFunc => {
                const nestedValidation = validateFunctionCall(nestedFunc.name, nestedFunc.args);
                if (!nestedValidation.isValid) {
                    result.errors.push(`In ${func.name}: ${nestedValidation.error}`);
                }
            });
        });

        return result;
    }

    // Add helper function to validate expressions
    function isValidExpression(expr) {
        // Basic expression validation
        try {
            // Check for balanced parentheses and operators
            let parens = 0;
            let lastChar = '';
            const operators = ['+', '-', '*', '/', '&', '|', '=', '<', '>', '!'];

            for (let char of expr) {
                if (char === '(') parens++;
                if (char === ')') parens--;
                if (parens < 0) return false;

                // Check for double operators
                if (operators.includes(char) && operators.includes(lastChar)) {
                    // Allow common double operators like '&&', '||', '<=', '>='
                    if (!['&&', '||', '<=', '>=', '<>', '=='].includes(lastChar + char)) {
                        return false;
                    }
                }
                lastChar = char;
            }
            return parens === 0;
        } catch (e) {
            return false;
        }
    }

    function getFunctionDescription(functionName) {
        // Get description from rules.js if available
        const rule = window[functionName + 'Rule'];
        return rule ? rule.description : 'Function description not available';
    }

    function generateExplanation(functions) {
        if (!functions || functions.length === 0) return '';

        let html = '<div class="formula-explanation">';
        html += '<h3>Formula Analysis</h3>';

        functions.forEach(func => {
            const docLink = documentationLinks[func.name] ?
                `<a href="${documentationLinks[func.name]}" target="_blank" class="doc-link">📚 Documentation</a>` : '';

            html += `
                <div class="explanation-item ${func.isValid ? 'valid' : 'invalid'}">
                    <div class="explanation-header">
                        <span class="name">${func.name}</span>
                        <span class="type">Function</span>
                        ${docLink}
                        ${func.isValid ?
                            '<span class="valid-badge">✓</span>' :
                            '<span class="error-badge">⚠️</span>'}
                    </div>
                    <div class="explanation-content">
                        <p>${func.description}</p>
                        <div class="args-section">
                            <h4>Arguments:</h4>
                            <ul>
                                ${func.args.map((arg, index) => `
                                    <li>
                                        <span class="arg-number">${index + 1}.</span>
                                        <code>${arg}</code>
                                        ${explainArgument(arg)}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        ${func.error ? `<p class="error">Error: ${func.error}</p>` : ''}
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    function explainArgument(arg) {
        // Check for operators
        const operators = {
            '=': 'Equality comparison',
            '<>': 'Not equal to',
            '>': 'Greater than',
            '>=': 'Greater than or equal to',
            '<': 'Less than',
            '<=': 'Less than or equal to',
            '&&': 'Logical AND',
            '||': 'Logical OR',
            'in': 'Contains in collection'
        };

        let explanation = '';

        function isPartOfFunctionName(arg, op) {
            // Check if the 'in' is part of a function name like "ColumnNames" or other identifiers
            const functionPattern = new RegExp(`[A-Za-z]+${op}[A-Za-z]+`, 'i');
            return functionPattern.test(arg);
        }

        function hasOperator(arg, op) {
            // More precise operator detection
            const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(`(?<![A-Za-z])${escapedOp}(?![A-Za-z])`, 'i');
            return pattern.test(arg);
        }

        function splitByOperator(arg, op) {
            // Splitting that respects function parentheses
            const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const parts = arg.split(new RegExp(`(?<![A-Za-z])${escapedOp}(?![A-Za-z])`));
            return parts.length === 2 ? [parts[0].trim(), parts[1].trim()] : [null, null];
        }

        // Check for comparison operations with improved operator detection
        Object.entries(operators).forEach(([op, desc]) => {
            // Skip 'in' operator when it's part of a function name or identifier
            if (op === 'in' && isPartOfFunctionName(arg, 'in')) {
                return;
            }

            if (hasOperator(arg, op)) {
                const [left, right] = splitByOperator(arg, op);
                if (left && right) {
                    explanation += `
                        <div class="operator-explanation">
                            <p><strong>${desc}:</strong></p>
                            <ul>
                                <li>Left side: <code>${left}</code> ${explainValue(left)}</li>
                                <li>Right side: <code>${right}</code> ${explainValue(right)}</li>
                            </ul>
                        </div>`;
                }
            }
        });

        return explanation;
    }

    function explainValue(value) {
        if (value.startsWith('"') && value.endsWith('"')) {
            return '(Text literal)';
        } else if (!isNaN(value)) {
            return '(Numeric value)';
        } else if (value === 'true' || value === 'false') {
            return '(Boolean value)';
        } else {
            return '(Variable or field reference)';
        }
    }

    function validateFunctionCall(functionName, args) {
        const rule = window[functionName + 'Rule'];
        if (!rule) {
            return { isValid: false, error: `Unknown function: ${functionName}` };
        }

        // MESSY TODO: FIX Mess and repeated logic

        // Special handling for With function
        if (functionName === 'With') {
            // With can have a complex first argument that contains nested functions
            if (args.length !== 2) {
                return { isValid: false, error: 'With requires exactly two arguments (record and formula)' };
            }
            // Validate the record argument
            if (!args[0].includes('{') && !args[0].includes('Patch') && !args[0].includes('Defaults')) {
                return { isValid: false, error: 'First argument of With must be a record or record-producing function' };
            }
            return { isValid: true };
        }

        // Special handling for Patch function
        if (functionName === 'Patch') {
            if (args.length < 3) {
                return { isValid: false, error: 'Patch requires at least three arguments' };
            }
            return { isValid: true };
        }

        // Special handling for ForAll function
        if (functionName === 'ForAll') {
            if (args.length !== 2) {
                return { isValid: false, error: 'ForAll requires exactly two arguments (table and formula)' };
            }
            return { isValid: true };
        }

        // Special case for DateDiff
        if (functionName === 'DateDiff') {
            if (args.length !== 2) {
                return { isValid: false, error: 'DateDiff requires exactly two arguments (date1, date2)' };
            }
            return { isValid: true };
        }

        // Regular function validation
        const requiredParams = rule.parameters ? rule.parameters.filter(p => p.required).length : 0;
        if (args.length < requiredParams) {
            return {
                isValid: false,
                error: `Function ${functionName} requires at least ${requiredParams} parameter(s)`
            };
        }

        // Run the function's validate method if it exists
        if (rule.validate) {
            return rule.validate(args);
        }

        return { isValid: true };
    }

    function parseNestedFunctions(formula) {
        const functions = [];
        let functionName = '';
        let argumentBuffer = '';
        let currentArg = '';
        let parenDepth = 0;
        let bracketDepth = 0;
        let inBrackets = false;
        let inQuotes = false;
        let collectingFunctionName = false;

        for (let i = 0; i < formula.length; i++) {
            const char = formula[i];

            // Handle quotes
            if (char === '"' && formula[i - 1] !== '\\') {
                inQuotes = !inQuotes;
                currentArg += char;
                continue;
            }

            if (inQuotes) {
                currentArg += char;
                continue;
            }

            // Handle curly brackets
            if (char === '{') {
                inBrackets = true;
                bracketDepth++;
                currentArg += char;
                continue;
            } else if (char === '}') {
                inBrackets = false;
                bracketDepth--;
                currentArg += char;
                continue;
            }

            // Function name collection
            if (/[A-Za-z]/.test(char) && parenDepth === 0 && !inBrackets) {
                collectingFunctionName = true;
                functionName += char;
                continue;
            }

            if (collectingFunctionName && /[A-Za-z0-9.]/.test(char)) {
                functionName += char;
                continue;
            }

            // Handle parentheses
            if (char === '(') {
                parenDepth++;
                if (parenDepth === 1) {
                    collectingFunctionName = false;
                    continue;
                }
                currentArg += char;
            } else if (char === ')') {
                parenDepth--;
                if (parenDepth === 0) {
                    if (currentArg.trim()) {
                        argumentBuffer += currentArg.trim();
                    }
                    if (functionName.trim() && argumentBuffer) {
                        const args = splitFunctionArguments(argumentBuffer);
                        // Parse nested functions within arguments
                        const processedArgs = args.map(arg => {
                            const nestedFuncs = parseNestedFunctions(arg);
                            return nestedFuncs.length > 0 ? arg : arg.trim();
                        });
                        functions.push({
                            name: functionName.trim(),
                            args: processedArgs,
                            nestedFunctions: args.map(arg => parseNestedFunctions(arg)).flat()
                        });
                    }
                    functionName = '';
                    argumentBuffer = '';
                    currentArg = '';
                } else {
                    currentArg += char;
                }
            } else if (char === ',' && parenDepth === 1 && bracketDepth === 0) {
                argumentBuffer += currentArg.trim() + ',';
                currentArg = '';
            } else if (parenDepth > 0 || inBrackets) {
                currentArg += char;
            }
        }

        return functions;
    }

    function splitFunctionArguments(argsString) {
        const args = [];
        let currentArg = '';
        let parenDepth = 0;
        let bracketDepth = 0;
        let inQuotes = false;

        for (let i = 0; i < argsString.length; i++) {
            const char = argsString[i];

            // Handle quotes
            if (char === '"' && argsString[i - 1] !== '\\') {
                inQuotes = !inQuotes;
                currentArg += char;
                continue;
            }

            if (inQuotes) {
                currentArg += char;
                continue;
            }

            // Handle nested parentheses
            if (char === '(') {
                parenDepth++;
                currentArg += char;
            } else if (char === ')') {
                parenDepth--;
                currentArg += char;
            }
            // Handle curly brackets
            else if (char === '{') {
                bracketDepth++;
                currentArg += char;
            } else if (char === '}') {
                bracketDepth--;
                currentArg += char;
            }
            // Handle commas
            else if (char === ',' && parenDepth === 0 && bracketDepth === 0) {
                args.push(currentArg.trim());
                currentArg = '';
            } else {
                currentArg += char;
            }
        }

        if (currentArg.trim()) {
            args.push(currentArg.trim());
        }

        return args;
    }

    // Helper function to split formulas by semicolons
    function splitFormulas(formula) {
        const formulas = [];
        let currentFormula = '';
        let depth = 0;
        let inString = false;

        for (let i = 0; i < formula.length; i++) {
            const char = formula[i];

            // Handle strings
            if (char === '"' && formula[i - 1] !== '\\') {
                inString = !inString;
            }

            // Handle brackets
            if (!inString) {
                if (char === '(' || char === '{' || char === '[') depth++;
                if (char === ')' || char === '}' || char === ']') depth--;
            }

            // Handle semicolon
            if (char === ';' && depth === 0 && !inString) {
                formulas.push(currentFormula.trim());
                currentFormula = '';
                continue;
            }

            currentFormula += char;
        }

        // Add the last formula
        if (currentFormula.trim()) {
            formulas.push(currentFormula.trim());
        }

        return formulas;
    }

    function showError(message) {
        validationResult.innerHTML = `<div class="error">❌ ${message}</div>`;
        functionInfo.classList.add('hidden');
    }

    function showSuccess(message) {
        const successHtml = `<div class="success-message">
            <span class="success-icon">✓</span>
            <span class="success-text">${message}</span>
        </div>`;
        validationResult.insertAdjacentHTML('beforeend', successHtml);
    }

    function showFunctionInfo(rule) {
        functionInfo.classList.remove('hidden');
        const explanation = getFunctionExplanation(rule.name);
        functionDetails.innerHTML = `
            ${explanation}
            <div class="examples-section">
                <h4>Examples:</h4>
                <ul>
                    ${rule.examples ? rule.examples.map(example => `
                        <li>
                            <code>${example.formula}</code>
                            ${example.result ? `<br>Result: ${example.result}` : ''}
                        </li>
                    `).join('') : ''}
                </ul>
            </div>
        `;
    }

    function assessComplexity(formula) {
        let score = 0;

        // Count nested functions
        score += (formula.match(/\(/g) || []).length * 2;

        // Count operators
        const operators = ['+', '-', '*', '/', '&', '|', '=', '<', '>', '!'];
        operators.forEach(op => {
            score += (formula.match(new RegExp('\\' + op, 'g')) || []).length;
        });

        if (score > 75) return 'Very Complex'; //TODO: Review scoring for complexity 
        if (score > 60) return 'Complex'; //TODO: Review scoring for complexity
        if (score > 30) return 'Moderate'; //TODO: Review scoring for complexity
        return 'Simple';
    }

    function checkBasicSyntax(formula, analysis) {
        // Parentheses matching with context
        const brackets = {
            '(': ')',
            '{': '}',
            '[': ']'
        };

        const stack = [];
        const errors = [];
        let pos = 0;  // TODO: FIX declared pos 
        let inString = false;

        for (let i = 0; i < formula.length; i++) {
            const char = formula[i];

            // Handle string literals
            if (char === '"' && formula[i - 1] !== '\\') {
                inString = !inString;
                continue;
            }

            if (!inString) {
                if (Object.keys(brackets).includes(char)) {
                    stack.push({ char, pos: i });
                } else if (Object.values(brackets).includes(char)) {
                    if (stack.length === 0) {
                        errors.push(`Unexpected closing ${char} at position ${i}`);
                    } else {
                        const last = stack.pop();
                        if (brackets[last.char] !== char) {
                            errors.push(`Mismatched brackets: expected ${brackets[last.char]} but found ${char} at position ${i}`);
                        }
                    }
                }

                // Check for Power FX specific syntax rules
                if (char === ';' && stack.length > 0) {
                    errors.push(`Invalid semicolon inside ${stack[stack.length - 1].char} block at position ${i}`);
                }
            }
        }

        // Check for unclosed brackets
        stack.forEach(item => {
            errors.push(`Unclosed ${item.char} at position ${item.pos}`);
        });

        // Add errors to analysis
        errors.forEach(error => analysis.errors.push(error));

        // Check for empty parentheses, but exclude valid function calls
        const emptyParenPattern = /(?<![A-Za-z0-9_])\(\s*\)/g;
        let emptyParenMatch;
        while ((emptyParenMatch = emptyParenPattern.exec(formula)) !== null) {
            // Verify it's not part of a function call
            const beforeParen = formula.substring(0, emptyParenMatch.index).trim();
            const isFunction = /[A-Za-z][A-Za-z0-9_]*$/.test(beforeParen);
            if (!isFunction) {
                analysis.warnings.push(`Empty parentheses found at position ${emptyParenMatch.index}`);
            }
        }

        // Check for function naming conventions TODO: FIX and IMPLEMENT styleIssues featire
        const functionPattern = /[A-Za-z]+\s*\(/g;
        let funcMatch;
        while ((funcMatch = functionPattern.exec(formula)) !== null) {
            const funcName = funcMatch[0].replace('(', '').trim();
            if (funcName !== funcName[0].toUpperCase() + funcName.slice(1).toLowerCase()) {
                analysis.styleIssues.push(`Ingore Error this is a work in progress ${funcName}`);
            }
        }

                // Helper function to get operands for an operator
        function getOperands(formula, operatorIndex) {
            // Extract left and right operands based on operator position
            const left = formula.substring(0, operatorIndex).trim();
            const right = formula.substring(operatorIndex + 1).trim();
            return [left, right].filter(Boolean);
}

        // Enhanced operator validation with context
        const operatorPattern = /(?<![<>!=%&|])([+\-*/^]=?|[<>]=?|<>|&&|\|\||!|\.@|in|exactin)(?![<>!=%&|])/g;
        const foundOperators = [...formula.matchAll(operatorPattern)];
        foundOperators.forEach(match => {
            const op = match[1];
            const operands = getOperands(formula, match.index);

            if (operatorRules[op]) {
                const validation = validateOperator(op, operands, formula);
                if (!validation.isValid) {
                    analysis.errors.push(validation.error);
                }
            } else {
                analysis.errors.push(`Invalid operator: ${op}`);
            }
        });

        // Check string literals with contextual information
        const stringLiterals = extractStringLiterals(formula);
        stringLiterals.forEach(literal => {
            if (!literal.closed) {
                analysis.errors.push(`Unclosed string literal starting at position ${literal.start}`);
            }
            if (literal.content.includes('\n')) {
                analysis.errors.push(`String literal contains line break at position ${literal.start}`);
            }
        });
    }

    function validateOperator(op, operands, formula) { // TODO: Fix formula declared but not read value
        const rule = operatorRules[op];
        if (!rule) return { isValid: false, error: `Unknown operator: ${op}` };

        // Check number of operands
        if (operands.length !== rule.minOperands) {
            return {
                isValid: false,
                error: `${rule.name} operator requires ${rule.minOperands} operand(s)`
            };
        }

        // Type checking for numeric operators
        if (['+', '-', '*', '/', '^'].includes(op)) {
            if (operands.some(operand => !isNumericExpression(operand))) {
                return {
                    isValid: false,
                    error: `${rule.name} operator requires numeric operands`
                };
            }
        }

        return { isValid: true };
    }

    function extractStringLiterals(formula) {
        const literals = [];
        let inString = false;
        let start = -1;
        let content = '';

        for (let i = 0; i < formula.length; i++) {
            const char = formula[i];
            if (char === '"' && formula[i - 1] !== '\\') {
                if (!inString) {
                    start = i;
                    content = '';
                } else {
                    literals.push({
                        start,
                        end: i,
                        content,
                        closed: true
                    });
                }
                inString = !inString;
            } else if (inString) {
                content += char;
            }
        }

        if (inString) {
            literals.push({
                start,
                content,
                closed: false
            });
        }

        return literals;
    }

    function createCollapsibleSection(title, items, severity, icon) {
        if (!items || items.length === 0) return '';

        // Create a unique ID for this section
        const sectionId = 'section-' + title.toLowerCase().replace(/\s+/g, '-');

        return `
            <button class="collapsible severity-${severity}">
                <span><span class="category-icon">${icon}</span>${title}</span>
                <span class="badge">${items.length}</span>
            </button>
            <div class="content" id="${sectionId}">
                <ul>
                    ${items.map(item => {
                        let docLink = '';
                        if (typeof item === 'object' && item.documentation) {
                            docLink = `<a href="${item.documentation}" target="_blank" class="doc-link ${severity}">📚 Documentation</a>`;
                            item = item.message;
                        }
                        return `<li>${item}${docLink}</li>`;
                    }).join('')}
                </ul>
            </div>
        `;
    }

    // Add event listeners for collapsible sections TODO: Fix the interative collapsible sections.
    function initializeCollapsibles() {
        document.querySelectorAll('.collapsible').forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }

    // Controls functionality
    const controlSelector = document.getElementById('controlSelector');
    const controlInfo = document.getElementById('controlInfo');
    const controlDetails = document.getElementById('controlDetails');

    // Populate control selector
    const controls = [
        AddressInputControl,
        AudioControl,
        BarcodeGeneratorControl,
        BarcodeScannerControl,
        ButtonControl,
        CalendarControl,
        CameraControl,
        CanvasControl,
        CardControl,
        ChartControl,
        CheckBoxControl,
        ColumnChartControl,
        ComboBoxControl,
        ContainerControl,
        DataTableControl,
        DatePickerControl,
        DocumentViewerControl,
        DropdownControl,
        FormControl,
        GalleryControl,
        GroupControl,
        HTMLTextControl,
        IconControl,
        LabelControl,
        LineChartControl,
        PCFControl,
        PDFViewerControl,
        PenInputControl,
        PieChartControl,
        PowerBITileControl,
        ProgressBarControl,
        RatingControl,
        RichTextEditorControl,
        SharePointFormControl,
        SliderControl,
        TextInputControl,
        TimerControl,
        ToggleControl,
        TreeViewControl,
        VideoControl,
        WebViewControl
    ];

    controls.forEach(control => {
        const option = document.createElement('option');
        option.value = control.name;
        option.textContent = control.name;
        controlSelector.appendChild(option);
    });

    // Handle control selection
    controlSelector.addEventListener('change', function() {
        const selectedControl = controls.find(c => c.name === this.value);

        if (selectedControl) {
            showControlInfo(selectedControl);
        } else {
            controlInfo.classList.add('hidden');
            controlDetails.innerHTML = '';
        }
    });

    function showControlInfo(control) {
        controlInfo.classList.remove('hidden');
        let html = `<h4>${control.name}</h4>`;
        html += `<p>${control.description}</p>`;

        // Display examples first
        if (control.examples && Array.isArray(control.examples)) {
            html += '<h4>Examples:</h4>';
            control.examples.forEach(example => {
                html += `<div class="example-item">
                    <div class="example-formula"><code>${example.formula}</code></div>
                    <div class="example-description">${example.description}</div>
                </div>`;
            });
        }

        // Display properties
        html += '<h4>Properties:</h4>';
        for (const [propName, propInfo] of Object.entries(control.properties)) {
            html += `<div class="property-item">
                <span class="property-name">${propName}</span>
                <span class="property-type">(${propInfo.type})</span>
                <div class="property-description">${propInfo.description}</div>
            </div>`;
        }

        controlDetails.innerHTML = html;
    }

    // Add function selector functionality
    const functionSelector = document.getElementById('functionSelector');

    // Get all rules from the global scope
    const rules = Object.keys(window)
        .filter(key => key.endsWith('Rule'))
        .map(key => window[key])
        .sort((a, b) => a.name.localeCompare(b.name));

    // Populate function selector
    rules.forEach(rule => {
        const option = document.createElement('option');
        option.value = rule.name;
        option.textContent = rule.name;
        functionSelector.appendChild(option);
    });

    // Handle function selection
    functionSelector.addEventListener('change', function() {
        const selectedRule = rules.find(r => r.name === this.value);
        if (selectedRule) {
            showFunctionInfo(selectedRule);
        } else {
            functionInfo.classList.add('hidden');
        }
    });
});

function checkDataTypeConsistency(formula, analysis) {
    // Check Text function usage
    const textFunctionRegex = /\bText\s*\(([^)]+)\)/g;
    let match;

    while ((match = textFunctionRegex.exec(formula)) !== null) {
        const args = match[1].split(',');
        if (args.length > 0) {
            const firstArg = args[0].trim();
            if (!isNaN(firstArg) && !firstArg.startsWith('"')) {
                analysis.suggestions.push(
                    `Consider verifying if explicit type conversion is necessary for the argument "${firstArg}" in the Text function`
                );
            }
        }
    }

    // Check numeric operations
    const numericPattern = /[\d.]+\s*[\+\-\*\/]\s*[A-Za-z]/;
    if (numericPattern.test(formula)) {
        analysis.suggestions.push('Verify that variables in numeric operations contain numeric values');
    }

    // Check type mixing
    const typeMixingPattern = /[\d.]+\s*\&\s*[A-Za-z]/;
    if (typeMixingPattern.test(formula)) {
        analysis.suggestions.push('Potential type mixing detected. Consider using Text() for explicit conversion');
    }

    // Check date operations
    const datePattern = /Date\(/gi;
    if (datePattern.test(formula)) {
        analysis.suggestions.push('Verify date format matches expected pattern');
    }
}

// Helper function to check if an expression is numeric
function isNumericExpression(expr) {
    // Remove spaces and check if it's a valid number or numeric variable pattern
    const cleanExpr = expr.trim();
    return !isNaN(cleanExpr) || /^[A-Za-z]+[0-9]*$/.test(cleanExpr);
}


const toggleScript = `
    function toggleFunction(id) {
        const content = document.getElementById(id);
        content.classList.toggle('collapsed');
        const button = content.previousElementSibling;
        button.classList.toggle('active');
    }
`;

function checkDelegation(formula, analysis) { //TODO: Review regex and improve messages
    const delegationRisks = {
        'Filter': {
            pattern: /Filter\s*\([^)]*[<>=!]+[^)]*\)/i,
            message: 'Filter operations with complex conditions may not delegate',
            documentation: 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-filter-lookup'
        },
        'Sort': {
            pattern: /Sort\s*\([^)]*\)/i,
            message: 'Sort may not delegate with complex sorting conditions',
            documentation: 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-sort'
        },
        'Search': {
            pattern: /Search\s*\([^)]*\)/i,
            message: 'Search only delegates with simple text patterns',
            documentation: 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-filter-lookup'
        },
        'LookUp': {
            pattern: /LookUp\s*\([^)]*\)/i,
            message: 'LookUp may have delegation limitations with complex conditions',
            documentation: 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-filter-lookup'
        },
        'Sum': {
            pattern: /Sum\s*\([^)]*\)/i,
            message: 'Sum may not delegate in certain scenarios',
            documentation: 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-aggregates'
        }
    };

    Object.entries(delegationRisks).forEach(([func, config]) => {
        if (config.pattern.test(formula)) {
            analysis.delegationIssues.push({
                type: 'delegation',
                message: `${func}: ${config.message}`,
                documentation: config.documentation
            });

            // Add specific suggestions based on the function
            if (func === 'Filter') {
                analysis.suggestions.push('Consider using simple comparison operators for delegation');
            } else if (func === 'Sort') {
                analysis.suggestions.push('Use SortByColumns for better delegation support');
            }
        }
    });

    // Check for common delegation issues
    if (/\.items/i.test(formula)) {
        analysis.delegationIssues.push({
            type: 'delegation',
            message: 'Using .Items may lead to delegation warnings with large datasets',
            documentation: 'https://learn.microsoft.com/en-us/power-apps/maker/data-platform/delegation-overview'
        });
    }

    // Check for nested functions that might break delegation
    const nestedDelegationPattern = /Filter\s*\([^)]*(?:Search|Sort|LookUp)[^)]*\)/i;
    if (nestedDelegationPattern.test(formula)) {
        analysis.delegationIssues.push({
            type: 'delegation',
            message: 'Nested delegation-capable functions may not delegate properly',
            documentation: 'https://learn.microsoft.com/en-us/power-apps/maker/data-platform/delegation-overview'
        });
    }
}

function checkCollectionPatterns(formula, analysis) {
    // Check for inefficient collection usage patterns
    if (/Collect\s*\([^)]+\)/i.test(formula)) {
        if (!formula.includes('UpdateContext') && !formula.includes('Set')) {
            analysis.suggestions.push({
                type: 'performance',
                message: 'Consider using UpdateContext or Set for single value updates instead of collections',
                documentation: 'https://learn.microsoft.com/en-us/power-platform/power-fx/working-with-variables'
            });
        }
    }

    // Check for ClearCollect vs Clear + Collect
    if (/Clear\s*\([^)]+\).*Collect\s*\([^)]+\)/i.test(formula)) {
        analysis.suggestions.push({
            type: 'performance',
            message: 'Consider using ClearCollect instead of separate Clear and Collect',
            documentation: 'https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-clear-collect-clearcollect'
        });
    }

    // Check for collection operations in loops
    if (/ForAll[^)]*Collect/i.test(formula)) {
        analysis.suggestions.push({
            type: 'performance',
            message: 'Collection operations inside ForAll may impact performance. Consider batch operations.',
            documentation: 'https://learn.microsoft.com/en-us/power-platform/power-fx/performance-optimization'
        });
    }

    // Check for nested collection operations
    const collectionOps = (formula.match(/(?:Collect|ClearCollect|Clear)\s*\([^)]+\)/g) || []).length;
    if (collectionOps > 1) {
        analysis.warnings.push('Multiple collection operations detected. Consider combining operations for better performance.');
    }
}
