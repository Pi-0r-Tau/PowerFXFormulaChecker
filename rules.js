'use strict';

// Power FX Operators
//TODO: Check each formula, as mistakes may be present, check validations for incorrect validator params

// Concatenation operator (alternative to + for strings)
const ConcatenationOperatorRule = {
    name: "Concatenation",
    syntax: "value1 & value2",
    description: "Concatenates two text strings. Alternative to using the + operator for strings.",
    parameters: [
      {
        name: "value1",
        type: "text",
        required: true,
        description: "First string."
      },
      {
        name: "value2",
        type: "text",
        required: true,
        description: "Second string."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "\"Hello\" & \" World\"", result: "\"Hello World\"" },
      { formula: "FirstName & \" \" & LastName", result: "Full name with space between" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Concatenation operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // As operator (for naming the current record in scope functions)
  const AsOperatorRule = {
    name: "As",
    syntax: "record As name",
    description: "Names the current record in gallery, form, and record scope functions.",
    parameters: [
      {
        name: "record",
        type: "record",
        required: true,
        description: "Record to name."
      },
      {
        name: "name",
        type: "identifier",
        required: true,
        description: "Name to assign to the record."
      }
    ],
    returnType: "record",
    examples: [
      { formula: "ForAll(Table1, ThisRecord As Rec, Rec.Value + 10)",
        description: "Process each record in Table1, naming it 'Rec'" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "As operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Colon operator (for record construction)
  const ColonOperatorRule = {
    name: "Colon",
    syntax: "name: value",
    description: "Associates a name with a value in a record constructor.",
    parameters: [
      {
        name: "name",
        type: "identifier",
        required: true,
        description: "Name of the field."
      },
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value of the field."
      }
    ],
    returnType: "field-value pair",
    examples: [
      { formula: "{Name: \"John\", Age: 30}", description: "Record with Name and Age fields" },
      { formula: "Patch(Accounts, First(Accounts), {Status: \"Active\"})",
        description: "Updates the Status field to 'Active'" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Colon operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Comma operator (for separating list items)
  const CommaOperatorRule = {
    name: "Comma",
    syntax: "item1, item2 [, item3, ...]",
    description: "Separates items in a list of arguments or elements.",
    parameters: [
      {
        name: "item1, item2, ...",
        type: "any",
        required: true,
        description: "Items to separate."
      }
    ],
    returnType: "list",
    examples: [
      { formula: "Sum(1, 2, 3, 4)", description: "List of values for Sum function" },
      { formula: "[1, 2, 3, 4]", description: "Creates a single-column table with these values" },
      { formula: "{Name: \"John\", Age: 30, City: \"Seattle\"}",
        description: "Comma-separated field-value pairs in a record" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Comma operator requires at least two operands." };
      }
      return { isValid: true };
    }
  };

  // Semicolon operator (for separating formulas in behaviour properties)
  const SemicolonOperatorRule = {
    name: "Semicolon",
    syntax: "formula1; formula2 [; formula3; ...]",
    description: "Separates multiple formulas in behaviour properties, executing them in sequence.",
    parameters: [
      {
        name: "formula1, formula2, ...",
        type: "any",
        required: true,
        description: "Formulas to execute in sequence."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "UpdateContext({x: 1}); Navigate(Screen1)",
        description: "Updates context variable x then navigates to Screen1" },
      { formula: "Set(Counter, Counter + 1); Refresh(Table1)",
        description: "Increments Counter then refreshes Table1" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Semicolon operator requires at least two operands." };
      }
      return { isValid: true };
    }
  };

  // Square brackets operator (for table construction)
  const SquareBracketsOperatorRule = {
    name: "SquareBrackets",
    syntax: "[value1, value2, ...]",
    description: "Creates a single-column table with the specified values.",
    parameters: [
      {
        name: "value1, value2, ...",
        type: "any",
        required: false,
        description: "Values to include in the table."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "[1, 2, 3, 4]", result: "Single-column table with values 1, 2, 3, 4" },
      { formula: "[\"Red\", \"Green\", \"Blue\"]", result: "Single-column table with colour names" }
    ],
    validate: function(args) {
      return { isValid: true };
    }
  };

  // Curly braces operator (for record construction)
  const CurlyBracesOperatorRule = {
    name: "CurlyBraces",
    syntax: "{name1: value1 [, name2: value2, ...]}",
    description: "Creates a record with the specified field-value pairs.",
    parameters: [
      {
        name: "name1: value1, name2: value2, ...",
        type: "field-value pairs",
        required: false,
        description: "Field-value pairs to include in the record."
      }
    ],
    returnType: "record",
    examples: [
      { formula: "{Name: \"John\", Age: 30}", result: "Record with Name and Age fields" },
      { formula: "{ID: 1, IsActive: true, JoinDate: Today()}",
        result: "Record with ID, IsActive, and JoinDate fields" }
    ],
    validate: function(args) {
      return { isValid: true };
    }
  };

  // Dot operator (as postfix for collection operations)
  const DotOperatorRule = {
    name: "Dot",
    syntax: "table.operation()",
    description: "Applies an operation to a table or collection.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table or collection to operate on."
      },
      {
        name: "operation",
        type: "function",
        required: true,
        description: "Operation to apply."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "Accounts.Filter(IsActive = true)", result: "Filters the Accounts collection" },
      { formula: "Table1.First()", result: "First record in Table1" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Dot operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Parentheses operator (for grouping)
  const ParenthesesOperatorRule = {
    name: "Parentheses",
    syntax: "(expression)",
    description: "Groups expressions to control evaluation order.",
    parameters: [
      {
        name: "expression",
        type: "any",
        required: true,
        description: "Expression to evaluate."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "(1 + 2) * 3", result: "9 (addition is performed first)" },
      { formula: "If((x > 10) && (y < 20), \"Valid\", \"Invalid\")",
        description: "Groups logical conditions" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Parentheses operator requires exactly one expression." };
      }
      return { isValid: true };
    }
  };

  // Index operator (for accessing collection elements)
  const IndexOperatorRule = {
    name: "Index",
    syntax: "collection[index]",
    description: "Accesses an element in a collection by its index.",
    parameters: [
      {
        name: "collection",
        type: "collection",
        required: true,
        description: "Collection to access."
      },
      {
        name: "index",
        type: "number",
        required: true,
        description: "Index of the element to access (1-based)."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "FirstN(Table1, 5)[3]", result: "Third record in the first 5 records of Table1" },
      { formula: "Split(\"A,B,C\", \",\")[2]", result: "\"B\" (second item in the split result)" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Index operator requires a collection and an index." };
      }
      return { isValid: true };
    }
  };

   // Unary minus operator
   const UnaryMinusOperatorRule = {
    name: "UnaryMinus",
    syntax: "-value",
    description: "Negates a numeric value.",
    parameters: [
      {
        name: "value",
        type: "number",
        required: true,
        description: "Value to negate."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "-5", result: "-5" },
      { formula: "-(x + y)", result: "Negative of the sum of x and y" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Unary minus operator requires exactly one operand." };
      }
      return { isValid: true };
    }
  };

  // Percent operator
  const PercentOperatorRule = {
    name: "Percent",
    syntax: "value%",
    description: "Converts a number to its percentage value (divides by 100).",
    parameters: [
      {
        name: "value",
        type: "number",
        required: true,
        description: "Value to convert to percentage."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "50%", result: "0.5 (50 divided by 100)" },
      { formula: "Tax + (SubTotal * TaxRate%)", description: "Adds tax to subtotal using tax rate percentage" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Percent operator requires exactly one operand." };
      }
      return { isValid: true };
    }
  };

  // Self-identify operator (@)
  const AtOperatorRule = {
    name: "At",
    syntax: "@property",
    description: "References a property of the current control (shorthand for Self.property).",
    parameters: [
      {
        name: "property",
        type: "property name",
        required: true,
        description: "Property to access on the current control."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "@Width", result: "Width property of the current control" },
      { formula: "@Text", result: "Text property of the current control" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "At operator requires exactly one operand." };
      }
      return { isValid: true };
    }
  };

  // Parent operator
  const ParentOperatorRule = {
    name: "Parent",
    syntax: "Parent.property",
    description: "Accesses a property of the parent control.",
    parameters: [
      {
        name: "property",
        type: "property name",
        required: true,
        description: "Property to access on the parent control."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "Parent.Width", result: "Width property of the parent control" },
      { formula: "Parent.Color", result: "Color property of the parent control" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Parent operator requires exactly one operand." };
      }
      return { isValid: true };
    }
  };

  // Self operator
  const SelfOperatorRule = {
    name: "Self",
    syntax: "Self.property",
    description: "Accesses a property of the current control.",
    parameters: [
      {
        name: "property",
        type: "property name",
        required: true,
        description: "Property to access on the current control."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "Self.Width", result: "Width property of the current control" },
      { formula: "Self.Text", result: "Text property of the current control" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Self operator requires exactly one operand." };
      }
      return { isValid: true };
    }
  };

  // ThisItem operator
  const ThisItemOperatorRule = {
    name: "ThisItem",
    syntax: "ThisItem.property",
    description: "Accesses a property of the current item in a gallery or form control.",
    parameters: [
      {
        name: "property",
        type: "property name",
        required: true,
        description: "Property to access on the current item."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "ThisItem.Name", result: "Name property of the current item" },
      { formula: "ThisItem.Price * ThisItem.Quantity", result: "Calculated total for the current item" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "ThisItem operator requires exactly one operand." };
      }
      return { isValid: true };
    }
  };

  // DefaultDate operator (||)
  const DefaultDateOperatorRule = {
    name: "DefaultDate",
    syntax: "date || defaultDate",
    description: "Returns the first date if it's valid, otherwise returns the default date.",
    parameters: [
      {
        name: "date",
        type: "datetime",
        required: true,
        description: "Date to check."
      },
      {
        name: "defaultDate",
        type: "datetime",
        required: true,
        description: "Default date to use if the first date is invalid."
      }
    ],
    returnType: "datetime",
    examples: [
      { formula: "DateValue(TextInput1.Text) || Today()",
        result: "Date from TextInput1 if valid, otherwise Today's date" },
      { formula: "ExpectedDelivery || Today()",
        result: "ExpectedDelivery if valid, otherwise Today's date" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "DefaultDate operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Chain operator (.)
  const ChainOperatorRule = {
    name: "Chain",
    syntax: "object.property",
    description: "Accesses a property or calls a method on an object.",
    parameters: [
      {
        name: "object",
        type: "object",
        required: true,
        description: "Object that contains the property or method."
      },
      {
        name: "property",
        type: "property or method",
        required: true,
        description: "Property or method to access."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "Table1.FirstName", result: "FirstName property of Table1" },
      { formula: "Office365Users.MyProfile().DisplayName", result: "Display name of the current user" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Chain operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Method call operator
  const MethodCallOperatorRule = {
    name: "MethodCall",
    syntax: "object.method([arg1, arg2, ...])",
    description: "Calls a method on an object with optional arguments.",
    parameters: [
      {
        name: "object",
        type: "object",
        required: true,
        description: "Object that contains the method."
      },
      {
        name: "method",
        type: "method",
        required: true,
        description: "Method to call."
      },
      {
        name: "arg1, arg2, ...",
        type: "any",
        required: false,
        description: "Arguments to pass to the method."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "Collection1.Add({ID: 1, Name: \"John\"})", result: "Adds a record to Collection1" },
      { formula: "Text(Date(2023, 12, 31), \"yyyy-mm-dd\")", result: "\"2024-12-31\"" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Method call operator requires at least an object and a method." };
      }
      return { isValid: true };
    }
  };

  // Conditional operator (If)
  const ConditionalOperatorRule = {
    name: "Conditional",
    syntax: "If(condition, thenValue [, elseValue])",
    description: "Returns one value if a condition is true and another value if it's false.",
    parameters: [
      {
        name: "condition",
        type: "boolean",
        required: true,
        description: "Condition to evaluate."
      },
      {
        name: "thenValue",
        type: "any",
        required: true,
        description: "Value to return if condition is true."
      },
      {
        name: "elseValue",
        type: "any",
        required: false,
        description: "Value to return if condition is false."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "If(x > 10, \"Large\", \"Small\")", result: "\"Large\" if x > 10, otherwise \"Small\"" },
      { formula: "If(IsError(value), 0, value)", result: "0 if value contains an error, otherwise value itself" }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "Conditional operator requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // Addition operator
  const AdditionOperatorRule = {
    name: "Addition",
    syntax: "value1 + value2",
    description: "Adds two numbers or concatenates two strings.",
    parameters: [
      {
        name: "value1",
        type: "number or text",
        required: true,
        description: "First value."
      },
      {
        name: "value2",
        type: "number or text",
        required: true,
        description: "Second value."
      }
    ],
    returnType: "number or text",
    examples: [
      { formula: "1 + 2", result: "3" },
      { formula: "\"Hello\" + \" \" + \"World\"", result: "\"Hello World\"" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Addition operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Subtraction operator
  const SubtractionOperatorRule = {
    name: "Subtraction",
    syntax: "value1 - value2",
    description: "Subtracts the second number from the first.",
    parameters: [
      {
        name: "value1",
        type: "number",
        required: true,
        description: "Number to subtract from."
      },
      {
        name: "value2",
        type: "number",
        required: true,
        description: "Number to subtract."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "5 - 2", result: "3" },
      { formula: "Price - Discount", result: "Price with discount subtracted" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Subtraction operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Multiplication operator
  const MultiplicationOperatorRule = {
    name: "Multiplication",
    syntax: "value1 * value2",
    description: "Multiplies two numbers.",
    parameters: [
      {
        name: "value1",
        type: "number",
        required: true,
        description: "First number to multiply."
      },
      {
        name: "value2",
        type: "number",
        required: true,
        description: "Second number to multiply."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "5 * 2", result: "10" },
      { formula: "Quantity * Price", result: "Total value of items" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Multiplication operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Division operator
  const DivisionOperatorRule = {
    name: "Division",
    syntax: "value1 / value2",
    description: "Divides the first number by the second.",
    parameters: [
      {
        name: "value1",
        type: "number",
        required: true,
        description: "Number to divide (dividend)."
      },
      {
        name: "value2",
        type: "number",
        required: true,
        description: "Number to divide by (divisor)."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "10 / 2", result: "5" },
      { formula: "Total / Count", result: "Average value" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Division operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Power operator
  const PowerOperatorRule = {
    name: "Power",
    syntax: "value1 ^ value2",
    description: "Raises a number to a power.",
    parameters: [
      {
        name: "value1",
        type: "number",
        required: true,
        description: "Base number."
      },
      {
        name: "value2",
        type: "number",
        required: true,
        description: "Exponent."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "2 ^ 3", result: "8" },
      { formula: "10 ^ 2", result: "100" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Power operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Equal operator
  const EqualOperatorRule = {
    name: "Equal",
    syntax: "value1 = value2",
    description: "Checks if two values are equal.",
    parameters: [
      {
        name: "value1",
        type: "any",
        required: true,
        description: "First value to compare."
      },
      {
        name: "value2",
        type: "any",
        required: true,
        description: "Second value to compare."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "1 = 1", result: "true" },
      { formula: "Status = \"Active\"", result: "true if Status is \"Active\"" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Equal operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Not equal operator
  const NotEqualOperatorRule = {
    name: "NotEqual",
    syntax: "value1 <> value2",
    description: "Checks if two values are not equal.",
    parameters: [
      {
        name: "value1",
        type: "any",
        required: true,
        description: "First value to compare."
      },
      {
        name: "value2",
        type: "any",
        required: true,
        description: "Second value to compare."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "1 <> 2", result: "true" },
      { formula: "Status <> \"Inactive\"", result: "true if Status is not \"Inactive\"" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Not equal operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Greater than operator
  const GreaterThanOperatorRule = {
    name: "GreaterThan",
    syntax: "value1 > value2",
    description: "Checks if the first value is greater than the second.",
    parameters: [
      {
        name: "value1",
        type: "number or text",
        required: true,
        description: "Value to compare."
      },
      {
        name: "value2",
        type: "number or text",
        required: true,
        description: "Value to compare against."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "10 > 5", result: "true" },
      { formula: "Age > 18", result: "true if Age is greater than 18" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Greater than operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Greater than or equal operator
  const GreaterThanOrEqualOperatorRule = {
    name: "GreaterThanOrEqual",
    syntax: "value1 >= value2",
    description: "Checks if the first value is greater than or equal to the second.",
    parameters: [
      {
        name: "value1",
        type: "number or text",
        required: true,
        description: "Value to compare."
      },
      {
        name: "value2",
        type: "number or text",
        required: true,
        description: "Value to compare against."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "10 >= 10", result: "true" },
      { formula: "Age >= 21", result: "true if Age is 21 or older" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Greater than or equal operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Less than operator
  const LessThanOperatorRule = {
    name: "LessThan",
    syntax: "value1 < value2",
    description: "Checks if the first value is less than the second.",
    parameters: [
      {
        name: "value1",
        type: "number or text",
        required: true,
        description: "Value to compare."
      },
      {
        name: "value2",
        type: "number or text",
        required: true,
        description: "Value to compare against."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "5 < 10", result: "true" },
      { formula: "Quantity < MinimumStock", result: "true if Quantity is less than MinimumStock" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Less than operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Less than or equal operator
  const LessThanOrEqualOperatorRule = {
    name: "LessThanOrEqual",
    syntax: "value1 <= value2",
    description: "Checks if the first value is less than or equal to the second.",
    parameters: [
      {
        name: "value1",
        type: "number or text",
        required: true,
        description: "Value to compare."
      },
      {
        name: "value2",
        type: "number or text",
        required: true,
        description: "Value to compare against."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "10 <= 10", result: "true" },
      { formula: "Price <= Budget", result: "true if Price is within Budget" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Less than or equal operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Logical AND operator
  const AndOperatorRule = {
    name: "And",
    syntax: "value1 && value2",
    description: "Returns true if both values are true.",
    parameters: [
      {
        name: "value1",
        type: "boolean",
        required: true,
        description: "First logical value."
      },
      {
        name: "value2",
        type: "boolean",
        required: true,
        description: "Second logical value."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "true && true", result: "true" },
      { formula: "IsValid && IsComplete", result: "true if both conditions are true" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "AND operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Logical OR operator
  const OrOperatorRule = {
    name: "Or",
    syntax: "value1 || value2",
    description: "Returns true if either value is true.",
    parameters: [
      {
        name: "value1",
        type: "boolean",
        required: true,
        description: "First logical value."
      },
      {
        name: "value2",
        type: "boolean",
        required: true,
        description: "Second logical value."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "true || false", result: "true" },
      { formula: "IsAdmin || HasPermission", result: "true if either condition is true" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "OR operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Logical NOT operator
  const NotOperatorRule = {
    name: "Not",
    syntax: "!value",
    description: "Returns true if the value is false and false if the value is true.",
    parameters: [
      {
        name: "value",
        type: "boolean",
        required: true,
        description: "Logical value to negate."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "!true", result: "false" },
      { formula: "!IsDisabled", result: "true if IsDisabled is false" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "NOT operator requires exactly one operand." };
      }
      return { isValid: true };
    }
  };

  // Parent access operator
  const ParentAccessOperatorRule = {
    name: "ParentAccess",
    syntax: "object.property",
    description: "Accesses a property of an object, record, or control.",
    parameters: [
      {
        name: "object",
        type: "object, record, or control",
        required: true,
        description: "Object that contains the property."
      },
      {
        name: "property",
        type: "property name",
        required: true,
        description: "Property to access."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "Accounts.Name", result: "Name property of Accounts" },
      { formula: "TextInput1.Text", result: "Text property of TextInput1 control" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Parent access operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Self-reference operator
  const SelfReferenceOperatorRule = {
    name: "SelfReference",
    syntax: "@property",
    description: "References a property of the current control (shorthand for Self.property).",
    parameters: [
      {
        name: "property",
        type: "property name",
        required: true,
        description: "Property to access on the current control."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "@Width", result: "Width property of the current control" },
      { formula: "@Fill", result: "Fill property of the current control" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Self-reference operator requires exactly one operand." };
      }
      return { isValid: true };
    }
  };

  // In operator
  const InOperatorRule = {
    name: "In",
    syntax: "value in collection",
    description: "Checks if a value exists within a collection or string.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to search for."
      },
      {
        name: "collection",
        type: "table, string",
        required: true,
        description: "Collection or string to search in."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "\"o\" in \"Hello\"", result: "true" },
      { formula: "record in collection", result: "true if record exists in the collection" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "In operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Exact in operator
  const ExactInOperatorRule = {
    name: "ExactIn",
    syntax: "value exactin collection",
    description: "Checks if a value exists within a collection or string, case-sensitive.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to search for."
      },
      {
        name: "collection",
        type: "table, string",
        required: true,
        description: "Collection or string to search in."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "\"A\" exactin \"ABC\"", result: "true" },
      { formula: "\"a\" exactin \"ABC\"", result: "false" },
      { formula: "record exactin collection", result: "true if record exists in the collection with exact matching" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "ExactIn operator requires exactly two operands." };
      }
      return { isValid: true };
    }
  };

  // Function rules for Power FX Formula checker

  // Clear function
  const ClearRule = {
    name: "Clear",
    syntax: "Clear(collection)",
    description: "Removes all records from a collection.",
    parameters: [
      {
        name: "collection",
        type: "collection",
        required: true,
        description: "Collection to clear."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Clear(MyCollection)", result: "Removes all records from MyCollection" },
      { formula: "If(condition, Clear(TempData))", result: "Clears TempData if condition is true" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Clear requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // ClearCollect function
  const ClearCollectRule = {
    name: "ClearCollect",
    syntax: "ClearCollect(collection, item1 [, item2, ...])",
    description: "Clears all records from a collection and then adds new records.",
    parameters: [
      {
        name: "collection",
        type: "collection",
        required: true,
        description: "Collection to clear and add items to."
      },
      {
        name: "item1, item2, ...",
        type: "any",
        required: true,
        description: "Records to add to the collection."
      }
    ],
    returnType: "collection",
    examples: [
      { formula: "ClearCollect(MyCollection, {Name: \"John\", Age: 42})",
        result: "Clears MyCollection and adds a record" },
      { formula: "ClearCollect(MyCollection, First(Table1), Last(Table1))",
        result: "Clears MyCollection and adds first and last records from Table1" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "ClearCollect requires at least two arguments." };
      }
      return { isValid: true };
    }
  };


  // Abs function
  const AbsRule = {
    name: "Abs",
    syntax: "Abs(number)",
    description: "Returns the absolute value of a number.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "The number for which to find the absolute value."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Abs(1)", result: "1" },
      { formula: "Abs(-1)", result: "1" },
      { formula: "Abs(0)", result: "0" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Abs requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Acceleration function
  const AccelerationRule = {
    name: "Acceleration",
    syntax: "Acceleration()",
    description: "Returns the device's acceleration in three dimensions as a record with X, Y, and Z fields.",
    parameters: [],
    returnType: "record",
    properties: [
      { name: "X", type: "number", description: "X-axis acceleration in g-force units" },
      { name: "Y", type: "number", description: "Y-axis acceleration in g-force units" },
      { name: "Z", type: "number", description: "Z-axis acceleration in g-force units" }
    ],
    examples: [
      { formula: "Acceleration().X", result: "X-axis acceleration" },
      { formula: "Acceleration().Y", result: "Y-axis acceleration" },
      { formula: "Acceleration().Z", result: "Z-axis acceleration" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Acceleration function takes no arguments." };
      }
      return { isValid: true };
    }
  };

  // Acos function
  const AcosRule = {
    name: "Acos",
    syntax: "Acos(number)",
    description: "Returns the arccosine of a number, in radians.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "The cosine value for which to find the arccosine. Must be between -1 and 1."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Acos(0)", result: "1.5708..." },  // π/2
      { formula: "Acos(1)", result: "0" },
      { formula: "Acos(-1)", result: "3.1416..." }  // π
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Acos requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Acot function
  const AcotRule = {
    name: "Acot",
    syntax: "Acot(number)",
    description: "Returns the arccotangent of a number, in radians.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "The cotangent value for which to find the arccotangent."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Acot(0)", result: "1.5708..." },  // π/2
      { formula: "Acot(1)", result: "0.7854..." },  // π/4
      { formula: "Acot(-1)", result: "2.3562..." }  // 3π/4
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Acot requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // AddColumns function
  const AddColumnsRule = {
    name: "AddColumns",
    syntax: "AddColumns(table, name1, formula1 [, name2, formula2, ...])",
    description: "Adds columns to a table by evaluating a formula for each record.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "The table to which to add columns."
      },
      {
        name: "name1",
        type: "text",
        required: true,
        description: "The name for the first column to add."
      },
      {
        name: "formula1",
        type: "any",
        required: true,
        description: "The formula to evaluate for each record of the table."
      },
      {
        name: "name2, formula2, ...",
        type: "text, any",
        required: false,
        description: "Additional column names and formulas."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "AddColumns(Table1, \"FullName\", First & \" \" & Last)" },
      { formula: "AddColumns(Table1, \"FullName\", First & \" \" & Last, \"Age\", Today() - Birthdate)" }
    ],
    validate: function(args) {
      if (args.length < 3) {
        return { isValid: false, error: "AddColumns requires at least three arguments." };
      }
      if (args.length % 2 !== 1) {
        return { isValid: false, error: "AddColumns requires an odd number of arguments (table followed by name/formula pairs)." };
      }
      return { isValid: true };
    }
  };

  // And function
  const AndRule = {
    name: "And",
    syntax: "And(logical1, logical2, ...)",
    description: "Boolean logic AND. Returns true if all arguments are true. You can also use the && operator.",
    parameters: [
      {
        name: "logical1, logical2, ...",
        type: "boolean",
        required: true,
        description: "Two or more logical expressions to evaluate."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "And(true, true)", result: "true" },
      { formula: "And(true, false)", result: "false" },
      { formula: "And(false, true)", result: "false" },
      { formula: "And(false, false)", result: "false" },
      { formula: "true && true", result: "true" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "And requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // App function
  const AppRule = {
    name: "App",
    syntax: "App",
    description: "Provides information about the currently running app and control over the app's behavior.",
    parameters: [],
    returnType: "record",
    properties: [
      { name: "ActiveScreen", type: "screen", description: "The currently displayed screen" },
      { name: "Width", type: "number", description: "The width of the app in pixels" },
      { name: "Height", type: "number", description: "The height of the app in pixels" },
      { name: "Theme", type: "record", description: "The current theme of the app" }
    ],
    examples: [
      { formula: "App.ActiveScreen", result: "Returns the currently displayed screen" },
      { formula: "App.Width", result: "Returns the width of the app" },
      { formula: "App.Height", result: "Returns the height of the app" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "App should be used without arguments." };
      }
      return { isValid: true };
    }
  };

  // Asin function
  const AsinRule = {
    name: "Asin",
    syntax: "Asin(number)",
    description: "Returns the arcsine of a number, in radians.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "The sine value for which to find the arcsine. Must be between -1 and 1."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Asin(0)", result: "0" },
      { formula: "Asin(1)", result: "1.5708..." },  // π/2
      { formula: "Asin(-1)", result: "-1.5708..." }  // -π/2
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Asin requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Assert function
  const AssertRule = {
    name: "Assert",
    syntax: "Assert(condition)",
    description: "Evaluates to true or false in a test.",
    parameters: [
      {
        name: "condition",
        type: "boolean",
        required: true,
        description: "The condition to evaluate."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Assert(1 + 1 = 2)", result: "true" },
      { formula: "Assert(1 > 2)", result: "false" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Assert requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // As function
  const AsRule = {
    name: "As",
    syntax: "ForAll(table, currentRecord As name, formula)",
    description: "Names the current record in gallery, form, and record scope functions such as ForAll, With, and Sum.",
    parameters: [
      {
        name: "currentRecord",
        type: "record",
        required: true,
        description: "The current record being processed."
      },
      {
        name: "name",
        type: "identifier",
        required: true,
        description: "The name to assign to the current record."
      }
    ],
    returnType: "name",
    examples: [
      { formula: "ForAll(Table1, ThisRecord As Rec, Rec.Column1 + Rec.Column2)",
        description: "Process each record in Table1, naming it 'Rec'" }
    ],
    validate: function() {
      // As is a special syntax element used with other functions, not typically validated on its own
      return { isValid: true };
    }
  };

  // AsType function
  const AsTypeRule = {
    name: "AsType",
    syntax: "AsType(record, tableName)",
    description: "Treats a record reference as a specific table type.",
    parameters: [
      {
        name: "record",
        type: "record",
        required: true,
        description: "A record to treat as a specific type."
      },
      {
        name: "tableName",
        type: "text",
        required: true,
        description: "The name of the table type."
      }
    ],
    returnType: "record",
    examples: [
      { formula: "AsType(record, \"Accounts\")",
        description: "Treats the record as an Accounts table type" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "AsType requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Atan function
  const AtanRule = {
    name: "Atan",
    syntax: "Atan(number)",
    description: "Returns the arctangent of a number, in radians.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "The tangent value for which to find the arctangent."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Atan(0)", result: "0" },
      { formula: "Atan(1)", result: "0.7854..." },  // π/4
      { formula: "Atan(-1)", result: "-0.7854..." }  // -π/4
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Atan requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Atan2 function
  const Atan2Rule = {
    name: "Atan2",
    syntax: "Atan2(y, x)",
    description: "Returns the arctangent based on an (x,y) coordinate, in radians.",
    parameters: [
      {
        name: "y",
        type: "number",
        required: true,
        description: "The y-coordinate."
      },
      {
        name: "x",
        type: "number",
        required: true,
        description: "The x-coordinate."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Atan2(1, 1)", result: "0.7854..." },  // π/4
      { formula: "Atan2(1, -1)", result: "2.3562..." },  // 3π/4
      { formula: "Atan2(-1, -1)", result: "-2.3562..." }  // -3π/4
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Atan2 requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Average function
  const AverageRule = {
    name: "Average",
    syntax: "Average(table, [valueColumn])\nAverage(value1, value2, ...)",
    description: "Calculates the average of a table expression or a set of arguments.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table from which to calculate the average."
      },
      {
        name: "valueColumn",
        type: "column",
        required: false,
        description: "Single column to average. If not provided, the table must be a single-column table."
      },
      {
        name: "value1, value2, ...",
        type: "number",
        required: false,
        description: "Alternative syntax: Two or more numbers to average."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Average([1, 2, 3, 4, 5])", result: "3" },
      { formula: "Average(Table1, Value)", result: "Average of all values in the Value column" },
      { formula: "Average(1, 3, 5)", result: "3" }
    ],
    validate: function(args) {
      if (args.length < 1) {
        return { isValid: false, error: "Average requires at least one argument." };
      }
      return { isValid: true };
    }
  };

  // Blank function
  const BlankRule = {
    name: "Blank",
    syntax: "Blank()",
    description: "Returns a blank value that can be used to insert a NULL value in a data source.",
    parameters: [],
    returnType: "blank",
    examples: [
      { formula: "Blank()", result: "A blank value" },
      { formula: "If(condition, value, Blank())", result: "Returns value or blank based on condition" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Blank function takes no arguments." };
      }
      return { isValid: true };
    }
  };

  //NotIsBlank function (!IsBlank)
  const NotIsBlankRule = {
    name: "!IsBlank",
    syntax: "!IsBlank(value)",
    description: "Checks if a value is not blank.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "The value to check."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "!IsBlank(TextInput1.Text)", result: "Returns true if TextInput1.Text is not blank" },
      { formula: "!IsBlank(SelectedItem)", result: "Returns true if SelectedItem is not blank" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "!IsBlank requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Boolean function
  const BooleanRule = {
    name: "Boolean",
    syntax: "Boolean(value)",
    description: "Converts a text string, number, or untyped value to a Boolean value.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "The value to convert to a Boolean."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Boolean(1)", result: "true" },
      { formula: "Boolean(0)", result: "false" },
      { formula: "Boolean(\"true\")", result: "true" },
      { formula: "Boolean(\"false\")", result: "false" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Boolean requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Calendar function
  const CalendarRule = {
    name: "Calendar",
    syntax: "Calendar",
    description: "Retrieves information about the calendar for the current locale.",
    parameters: [],
    returnType: "record",
    properties: [
      { name: "MonthsLong", type: "table", description: "Table of long month names" },
      { name: "MonthsShort", type: "table", description: "Table of abbreviated month names" },
      { name: "WeekdaysLong", type: "table", description: "Table of long weekday names" },
      { name: "WeekdaysShort", type: "table", description: "Table of abbreviated weekday names" }
    ],
    examples: [
      { formula: "Calendar.MonthsLong", result: "Table of long month names" },
      { formula: "Calendar.WeekdaysShort", result: "Table of abbreviated weekday names" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Calendar should be used without arguments." };
      }
      return { isValid: true };
    }
  };

  // Char function
  const CharRule = {
    name: "Char",
    syntax: "Char(number)",
    description: "Translates a character code into a string.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "A character code between 0 and 65535."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Char(65)", result: "\"A\"" },
      { formula: "Char(97)", result: "\"a\"" },
      { formula: "Char(9)", result: "Tab character" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Char requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Choices function
  const ChoicesRule = {
    name: "Choices",
    syntax: "Choices(lookupColumn)",
    description: "Returns a table of the possible values for a lookup column.",
    parameters: [
      {
        name: "lookupColumn",
        type: "column",
        required: true,
        description: "The lookup column for which to return choices."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "Choices(Status)", result: "Table of possible Status values" },
      { formula: "Choices('Account Type')", result: "Table of possible Account Type values" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Choices requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Clock function
  const ClockRule = {
    name: "Clock",
    syntax: "Clock",
    description: "Retrieves information about the clock for the current locale.",
    parameters: [],
    returnType: "record",
    properties: [
      { name: "AmPm", type: "table", description: "Table of AM/PM designators" },
      { name: "AmPmShort", type: "table", description: "Table of abbreviated AM/PM designators" }
    ],
    examples: [
      { formula: "Clock.AmPm", result: "Table of AM/PM designators" },
      { formula: "Clock.AmPmShort", result: "Table of abbreviated AM/PM designators" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Clock should be used without arguments." };
      }
      return { isValid: true };
    }
  };

  // Coalesce function
  const CoalesceRule = {
    name: "Coalesce",
    syntax: "Coalesce(value1, value2, ...)",
    description: "Replaces blank values while leaving non-blank values unchanged.",
    parameters: [
      {
        name: "value1",
        type: "any",
        required: true,
        description: "The first value to evaluate. If not blank, it's returned."
      },
      {
        name: "value2, ...",
        type: "any",
        required: false,
        description: "Additional values to check if previous values are blank."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "Coalesce(FirstName, \"Unknown\")", result: "FirstName if not blank, otherwise \"Unknown\"" },
      { formula: "Coalesce(Value1, Value2, Value3, 0)", result: "First non-blank value from Value1, Value2, Value3, or 0" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Coalesce requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // Collect function
  const CollectRule = {
    name: "Collect",
    syntax: "Collect(collection, item1 [, item2, ...])",
    description: "Creates a collection or adds data to a data source.",
    parameters: [
      {
        name: "collection",
        type: "collection",
        required: true,
        description: "The collection to create or to which to add items."
      },
      {
        name: "item1, item2, ...",
        type: "any",
        required: true,
        description: "Records to add to the collection."
      }
    ],
    returnType: "collection",
    examples: [
      { formula: "Collect(MyCollection, {Name: \"John\", Age: 42})", result: "Adds record to MyCollection" },
      { formula: "Collect(MyCollection, Gallery1.Selected)", result: "Adds selected gallery item to MyCollection" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Collect requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // Color function
  const ColorRule = {
    name: "Color",
    syntax: "Color.ColorName",
    description: "Sets a property to a built-in color value.",
    parameters: [],
    returnType: "color",
    examples: [
      { formula: "Color.Red", result: "Red color" },
      { formula: "Color.Blue", result: "Blue color" },
      { formula: "Color.LightGray", result: "Light gray color" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Color should be used with a color name property (e.g., Color.Red)." };
      }
      return { isValid: true };
    }
  };

  // ColorFade function
  const ColorFadeRule = {
    name: "ColorFade",
    syntax: "ColorFade(color, fadeDelta)",
    description: "Fades a color value.",
    parameters: [
      {
        name: "color",
        type: "color",
        required: true,
        description: "The color to fade."
      },
      {
        name: "fadeDelta",
        type: "number",
        required: true,
        description: "The amount to fade. Negative values make the color darker, positive values make it lighter."
      }
    ],
    returnType: "color",
    examples: [
      { formula: "ColorFade(Color.Red, 0.2)", result: "Lighter red" },
      { formula: "ColorFade(Color.Blue, -0.3)", result: "Darker blue" },
      { formula: "ColorFade(RGBA(100, 150, 200, 1), 0.5)", result: "Lighter version of the RGBA color" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "ColorFade requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // ColorValue function
  const ColorValueRule = {
    name: "ColorValue",
    syntax: "ColorValue(colorName)",
    description: "Translates a CSS color name or a hex code to a color value.",
    parameters: [
      {
        name: "colorName",
        type: "text",
        required: true,
        description: "Color name (e.g., \"Red\") or hex code (e.g., \"#FF0000\")."
      }
    ],
    returnType: "color",
    examples: [
      { formula: "ColorValue(\"Red\")", result: "Red color" },
      { formula: "ColorValue(\"#FF0000\")", result: "Red color" },
      { formula: "ColorValue(\"#00FF00\")", result: "Green color" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "ColorValue requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Column function
  const ColumnRule = {
    name: "Column",
    syntax: "Column(untyped, columnName)",
    description: "Retrieves column names and values from an Untyped object data type.",
    parameters: [
      {
        name: "untyped",
        type: "untyped",
        required: true,
        description: "Untyped object from which to retrieve a column."
      },
      {
        name: "columnName",
        type: "text",
        required: true,
        description: "Name of the column to retrieve."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "Column(ParseJSON(jsonString), \"name\")", result: "Value of the 'name' column from the parsed JSON" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Column requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // ColumnNames function
  const ColumnNamesRule = {
    name: "ColumnNames",
    syntax: "ColumnNames(untyped)",
    description: "Retrieves column names from an Untyped object data type.",
    parameters: [
      {
        name: "untyped",
        type: "untyped",
        required: true,
        description: "Untyped object from which to retrieve column names."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "ColumnNames(ParseJSON(jsonString))", result: "Table of column names from the parsed JSON" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "ColumnNames requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Compass function
  const CompassRule = {
    name: "Compass",
    syntax: "Compass()",
    description: "Returns your compass heading.",
    parameters: [],
    returnType: "record",
    properties: [
      { name: "Heading", type: "number", description: "The compass heading in degrees (0-360)" }
    ],
    examples: [
      { formula: "Compass().Heading", result: "Current compass heading in degrees" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Compass function takes no arguments." };
      }
      return { isValid: true };
    }
  };

  // Concat function
  const ConcatRule = {
    name: "Concat",
    syntax: "Concat(table, formula [, separator])",
    description: "Concatenates strings in a data source.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "The table that contains the strings to concatenate."
      },
      {
        name: "formula",
        type: "text",
        required: true,
        description: "Formula to evaluate for each record, returning a string to concatenate."
      },
      {
        name: "separator",
        type: "text",
        required: false,
        description: "String to insert between the concatenated strings. Empty by default."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Concat(Table1, Name)", result: "All names concatenated" },
      { formula: "Concat(Table1, FirstName & \" \" & LastName, \", \")", result: "All full names concatenated with commas" }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "Concat requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // Concatenate function
  const ConcatenateRule = {
    name: "Concatenate",
    syntax: "Concatenate(text1, text2, ...)",
    description: "Concatenates strings.",
    parameters: [
      {
        name: "text1, text2, ...",
        type: "text",
        required: true,
        description: "Two or more strings to concatenate."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Concatenate(\"Hello\", \" \", \"World\")", result: "\"Hello World\"" },
      { formula: "Concatenate(FirstName, \" \", LastName)", result: "Full name" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Concatenate requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // Concurrent function
  const ConcurrentRule = {
    name: "Concurrent",
    syntax: "Concurrent(formula1 [, formula2, ...])",
    description: "Evaluates multiple formulas concurrently with one another.",
    parameters: [
      {
        name: "formula1, formula2, ...",
        type: "any",
        required: true,
        description: "Formulas to evaluate concurrently."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "Concurrent(Set(x, 1), Navigate(Screen1))",
        description: "Sets variable x to 1 and navigates to Screen1 concurrently" }
    ],
    validate: function(args) {
      if (args.length < 1) {
        return { isValid: false, error: "Concurrent requires at least one argument." };
      }
      return { isValid: true };
    }
  };

  // Connection function
  const ConnectionRule = {
    name: "Connection",
    syntax: "Connection",
    description: "Returns information about your network connection.",
    parameters: [],
    returnType: "record",
    properties: [
      { name: "Connected", type: "boolean", description: "Whether the device has a network connection" },
      { name: "ConnectionType", type: "text", description: "The type of connection: None, WiFi, or Cell" }
    ],
    examples: [
      { formula: "Connection.Connected", result: "true if connected to a network" },
      { formula: "Connection.ConnectionType", result: "\"WiFi\" if connected via WiFi" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Connection should be used without arguments." };
      }
      return { isValid: true };
    }
  };

  // Copy function
  const CopyRule = {
    name: "Copy",
    syntax: "Copy(text)",
    description: "Copies text to the clipboard on the device where the app is running.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "Text to copy to the clipboard."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Copy(\"Hello World\")", result: "Copies \"Hello World\" to clipboard and returns it" },
      { formula: "Copy(TextInput1.Text)", result: "Copies text from TextInput1 to clipboard" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Copy requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Count function
  const CountRule = {
    name: "Count",
    syntax: "Count(table, [valueColumn])",
    description: "Counts table records that contain numbers.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to count records from."
      },
      {
        name: "valueColumn",
        type: "column",
        required: false,
        description: "Column to count non-blank numeric values. If not provided, the table must be a single-column table."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Count(Table1, ValueColumn)", result: "Number of records with non-blank numeric values in ValueColumn" },
      { formula: "Count([1, 2, null, 3])", result: "3" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "Count requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // Cos function
  const CosRule = {
    name: "Cos",
    syntax: "Cos(angle)",
    description: "Returns the cosine of an angle specified in radians.",
    parameters: [
      {
        name: "angle",
        type: "number",
        required: true,
        description: "The angle in radians for which to find the cosine."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Cos(0)", result: "1" },
      { formula: "Cos(Pi()/2)", result: "0" },
      { formula: "Cos(Pi())", result: "-1" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Cos requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Cot function
  const CotRule = {
    name: "Cot",
    syntax: "Cot(angle)",
    description: "Returns the cotangent of an angle specified in radians.",
    parameters: [
      {
        name: "angle",
        type: "number",
        required: true,
        description: "The angle in radians for which to find the cotangent."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Cot(Pi()/4)", result: "1" },
      { formula: "Cot(Pi()/2)", result: "0" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Cot requires exactly one argument." };
      }
      return { isValid: true };
    }
  };


  // CountA function
  const CountARule = {
    name: "CountA",
    syntax: "CountA(table, [valueColumn])",
    description: "Counts table records that aren't empty.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to count records from."
      },
      {
        name: "valueColumn",
        type: "column",
        required: false,
        description: "Column to count non-blank values. If not provided, the table must be a single-column table."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "CountA(Table1, Comments)", result: "Number of records with non-blank values in Comments column" },
      { formula: "CountA([1, \"text\", null, true])", result: "3" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "CountA requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // CountIf function
  const CountIfRule = {
    name: "CountIf",
    syntax: "CountIf(table, condition)",
    description: "Counts table records that satisfy a condition.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to count records from."
      },
      {
        name: "condition",
        type: "boolean",
        required: true,
        description: "Condition to test against each record."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "CountIf(Table1, Age > 30)", result: "Number of records where Age is greater than 30" },
      { formula: "CountIf(Table1, StartsWith(Name, \"A\"))", result: "Number of records where Name starts with A" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "CountIf requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // CountRows function
  const CountRowsRule = {
    name: "CountRows",
    syntax: "CountRows(table)",
    description: "Counts table records.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to count records from."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "CountRows(Table1)", result: "Number of records in Table1" },
      { formula: "CountRows(Filter(Table1, IsActive))", result: "Number of active records in Table1" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "CountRows requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // DataSourceInfo function
  const DataSourceInfoRule = {
    name: "DataSourceInfo",
    syntax: "DataSourceInfo(dataSource, property)",
    description: "Provides information about a data source.",
    parameters: [
      {
        name: "dataSource",
        type: "datasource",
        required: true,
        description: "Data source to get information about."
      },
      {
        name: "property",
        type: "text",
        required: true,
        description: "Property to get information about."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "DataSourceInfo(Accounts, \"Items\")", result: "Items in the Accounts data source" },
      { formula: "DataSourceInfo(Accounts, \"AllItemsCount\")", result: "Number of items in the Accounts data source" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "DataSourceInfo requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Date function
  const DateRule = {
    name: "Date",
    syntax: "Date(year, month, day)",
    description: "Returns a date/time value, based on Year, Month, and Day values.",
    parameters: [
      {
        name: "year",
        type: "number",
        required: true,
        description: "Year value (1900-9999)."
      },
      {
        name: "month",
        type: "number",
        required: true,
        description: "Month value (1-12)."
      },
      {
        name: "day",
        type: "number",
        required: true,
        description: "Day value (1-31)."
      }
    ],
    returnType: "datetime",
    examples: [
      { formula: "Date(2023, 12, 31)", result: "December 31, 2023 at midnight" },
      { formula: "Date(Year(Now()), Month(Now()), 1)", result: "First day of current month at midnight" }
    ],
    validate: function(args) {
      if (args.length !== 3) {
        return { isValid: false, error: "Date requires exactly three arguments." };
      }
      return { isValid: true };
    }
  };

  // DateAdd function
  const DateAddRule = {
    name: "DateAdd",
    syntax: "DateAdd(date, delta, unit)",
    description: "Adds days, months, quarters, or years to a date/time value.",
    parameters: [
      {
        name: "date",
        type: "datetime",
        required: true,
        description: "Date/time value to add to."
      },
      {
        name: "delta",
        type: "number",
        required: true,
        description: "The number of units to add to the date."
      },
      {
        name: "unit",
        type: "text",
        required: true,
        description: "Unit of time to add: \"days\", \"months\", \"quarters\", or \"years\"."
      }
    ],
    returnType: "datetime",
    examples: [
      { formula: "DateAdd(Today(), 7, \"days\")", result: "Date 7 days from today" },
      { formula: "DateAdd(Now(), 1, \"months\")", result: "Same time next month" },
      { formula: "DateAdd(StartDate, -1, \"years\")", result: "Same date one year ago" }
    ],
    validate: function(args) {
      if (args.length !== 3) {
        return { isValid: false, error: "DateAdd requires exactly three arguments." };
      }
      return { isValid: true };
    }
  };

  // DateDiff function
  const DateDiffRule = {
    name: "DateDiff",
    syntax: "DateDiff(startDate, endDate, unit)",
    description: "Subtracts two date values, and shows the result in days, months, quarters, or years.",
    parameters: [
      {
        name: "startDate",
        type: "datetime",
        required: true,
        description: "Starting date/time value."
      },
      {
        name: "endDate",
        type: "datetime",
        required: true,
        description: "Ending date/time value."
      },
      {
        name: "unit",
        type: "text",
        required: true,
        description: "Unit of time for the result: \"days\", \"months\", \"quarters\", or \"years\"."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "DateDiff(StartDate, EndDate, \"days\")", result: "Number of days between dates" },
      { formula: "DateDiff(Date(2022, 1, 1), Today(), \"months\")", result: "Number of months since January 1, 2022" }
    ],
    validate: function(args) {
      if (args.length !== 3) {
        return { isValid: false, error: "DateDiff requires exactly three arguments." };
      }
      return { isValid: true };
    }
  };

  // DateTime function
  const DateTimeRule = {
    name: "DateTime",
    syntax: "DateTime(year, month, day, hour, minute, second)",
    description: "Returns a date/time value, based on both date and time components.",
    parameters: [
      {
        name: "year",
        type: "number",
        required: true,
        description: "Year value (1900-9999)."
      },
      {
        name: "month",
        type: "number",
        required: true,
        description: "Month value (1-12)."
      },
      {
        name: "day",
        type: "number",
        required: true,
        description: "Day value (1-31)."
      },
      {
        name: "hour",
        type: "number",
        required: true,
        description: "Hour value (0-23)."
      },
      {
        name: "minute",
        type: "number",
        required: true,
        description: "Minute value (0-59)."
      },
      {
        name: "second",
        type: "number",
        required: true,
        description: "Second value (0-59)."
      }
    ],
    returnType: "datetime",
    examples: [
      { formula: "DateTime(2023, 12, 31, 23, 59, 59)", result: "December 31, 2023 at 11:59:59 PM" },
      { formula: "DateTime(Year(Now()), Month(Now()), Day(Now()), 9, 0, 0)", result: "Today at 9:00 AM" }
    ],
    validate: function(args) {
      if (args.length !== 6) {
        return { isValid: false, error: "DateTime requires exactly six arguments." };
      }
      return { isValid: true };
    }
  };

  // DateTimeValue function
  const DateTimeValueRule = {
    name: "DateTimeValue",
    syntax: "DateTimeValue(dateTimeText)",
    description: "Converts a date and time string to a date/time value.",
    parameters: [
      {
        name: "dateTimeText",
        type: "text",
        required: true,
        description: "Date and time text to convert (e.g., \"12/31/2023 11:59 PM\")."
      }
    ],
    returnType: "datetime",
    examples: [
      { formula: "DateTimeValue(\"12/31/2023 11:59 PM\")", result: "December 31, 2023 at 11:59 PM" },
      { formula: "DateTimeValue(\"2023-12-31T23:59:59Z\")", result: "December 31, 2023 at 11:59:59 PM (UTC)" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "DateTimeValue requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // DateValue function
  const DateValueRule = {
    name: "DateValue",
    syntax: "DateValue(dateText)",
    description: "Converts a date-only string to a date/time value.",
    parameters: [
      {
        name: "dateText",
        type: "text",
        required: true,
        description: "Date text to convert (e.g., \"12/31/2023\")."
      }
    ],
    returnType: "datetime",
    examples: [
      { formula: "DateValue(\"12/31/2023\")", result: "December 31, 2023 at midnight" },
      { formula: "DateValue(\"2023-12-31\")", result: "December 31, 2023 at midnight" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "DateValue requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Day function
  const DayRule = {
    name: "Day",
    syntax: "Day(date)",
    description: "Retrieves the day portion of a date/time value.",
    parameters: [
      {
        name: "date",
        type: "datetime",
        required: true,
        description: "Date/time value from which to extract the day."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Day(Today())", result: "Current day of the month" },
      { formula: "Day(DateValue(\"12/31/2023\"))", result: "31" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Day requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Dec2Hex function
  const Dec2HexRule = {
    name: "Dec2Hex",
    syntax: "Dec2Hex(number)",
    description: "Convert a number to a hexadecimal text string.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "The decimal number to convert to hexadecimal."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Dec2Hex(10)", result: "\"A\"" },
      { formula: "Dec2Hex(255)", result: "\"FF\"" },
      { formula: "Dec2Hex(1000)", result: "\"3E8\"" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Dec2Hex requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Defaults function
  const DefaultsRule = {
    name: "Defaults",
    syntax: "Defaults(dataSource)",
    description: "Returns the default values for a data source.",
    parameters: [
      {
        name: "dataSource",
        type: "datasource",
        required: true,
        description: "Data source for which to get default values."
      }
    ],
    returnType: "record",
    examples: [
      { formula: "Defaults(Accounts)", result: "Record with default values for Accounts" },
      { formula: "Patch(Accounts, Defaults(Accounts), {Name: \"New Account\"})",
        description: "Create new record with defaults and override Name" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Defaults requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Degrees function
  const DegreesRule = {
    name: "Degrees",
    syntax: "Degrees(radians)",
    description: "Converts radians to degrees.",
    parameters: [
      {
        name: "radians",
        type: "number",
        required: true,
        description: "Angle in radians to convert to degrees."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Degrees(Pi())", result: "180" },
      { formula: "Degrees(Pi()/2)", result: "90" },
      { formula: "Degrees(Pi()/4)", result: "45" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Degrees requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Disable function
  const DisableRule = {
    name: "Disable",
    syntax: "Disable(signal)",
    description: "Disables a signal, such as Location for reading the GPS.",
    parameters: [
      {
        name: "signal",
        type: "signal",
        required: true,
        description: "The signal to disable (Location)."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Disable(Location)", result: "Disables the GPS location signal" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Disable requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Download function
  const DownloadRule = {
    name: "Download",
    syntax: "Download(address)",
    description: "Downloads a file from the web to the local device.",
    parameters: [
      {
        name: "address",
        type: "text",
        required: true,
        description: "The URL of the file to download."
      }
    ],
    returnType: "blob",
    examples: [
      { formula: "Download(\"https://example.com/file.pdf\")",
        description: "Downloads file.pdf from example.com" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Download requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // DropColumns function
  const DropColumnsRule = {
    name: "DropColumns",
    syntax: "DropColumns(table, column1 [, column2, ...])",
    description: "Returns a table with one or more columns removed.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table from which to drop columns."
      },
      {
        name: "column1, column2, ...",
        type: "column",
        required: true,
        description: "Names of columns to remove."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "DropColumns(Table1, \"InternalId\")", result: "Table1 without the InternalId column" },
      { formula: "DropColumns(Table1, \"InternalId\", \"Timestamp\")", result: "Table1 without InternalId and Timestamp columns" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "DropColumns requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // EDate function
  const EDateRule = {
    name: "EDate",
    syntax: "EDate(startDate, monthsToAdd)",
    description: "Adds or subtracts months to a date, without changing the day of the month.",
    parameters: [
      {
        name: "startDate",
        type: "datetime",
        required: true,
        description: "The date to which to add or subtract months."
      },
      {
        name: "monthsToAdd",
        type: "number",
        required: true,
        description: "Number of months to add (positive) or subtract (negative)."
      }
    ],
    returnType: "datetime",
    examples: [
      { formula: "EDate(Date(2023, 1, 31), 1)", result: "February 28, 2023" },
      { formula: "EDate(Today(), 3)", result: "Same day of the month, three months from today" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "EDate requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // EncodeHTML function
  const EncodeHtmlRule = {
    name: "EncodeHtml",
    syntax: "EncodeHtml(text)",
    description: "Encodes characters that need to be escaped to be used in an HTML context.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "The string to encode for HTML."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "EncodeHtml(\"<script>alert('Hello');</script>\")",
        result: "\"&lt;script&gt;alert('Hello');&lt;/script&gt;\"" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "EncodeHtml requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // EncodeUrl function
  const EncodeUrlRule = {
    name: "EncodeUrl",
    syntax: "EncodeUrl(text)",
    description: "Encodes special characters using URL encoding.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "The string to encode for URLs."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "EncodeUrl(\"Hello World\")", result: "\"Hello%20World\"" },
      { formula: "EncodeUrl(\"search?q=Power Apps\")", result: "\"search%3Fq%3DPower%20Apps\"" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "EncodeUrl requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // EndsWith function
  const EndsWithRule = {
    name: "EndsWith",
    syntax: "EndsWith(text, endText)",
    description: "Checks whether a text string ends with another text string.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "String to check."
      },
      {
        name: "endText",
        type: "text",
        required: true,
        description: "String to look for at the end of text."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "EndsWith(\"Hello World\", \"World\")", result: "true" },
      { formula: "EndsWith(\"Hello World\", \"Hello\")", result: "false" },
      { formula: "EndsWith(Email, \"@example.com\")", result: "true if Email ends with @example.com" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "EndsWith requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };


  // EOMonth function
  const EOMonthRule = {
    name: "EOMonth",
    syntax: "EOMonth(startDate, monthsToAdd)",
    description: "Adds or subtracts months to a date, returning the last day of that month.",
    parameters: [
      {
        name: "startDate",
        type: "datetime",
        required: true,
        description: "The date from which to calculate."
      },
      {
        name: "monthsToAdd",
        type: "number",
        required: true,
        description: "Number of months to add (positive) or subtract (negative)."
      }
    ],
    returnType: "datetime",
    examples: [
      { formula: "EOMonth(Date(2023, 1, 15), 0)", result: "January 31, 2023" },
      { formula: "EOMonth(Today(), 1)", result: "Last day of next month" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "EOMonth requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Error function
  const ErrorRule = {
    name: "Error",
    syntax: "Error(message)",
    description: "Create a custom error or pass through an error.",
    parameters: [
      {
        name: "message",
        type: "text",
        required: true,
        description: "The error message or an existing error."
      }
    ],
    returnType: "error",
    examples: [
      { formula: "Error(\"Invalid input\")", result: "Error with message \"Invalid input\"" },
      { formula: "If(amount < 0, Error(\"Amount cannot be negative\"), amount)",
        description: "Returns an error if amount is negative" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Error requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Errors function
  const ErrorsRule = {
    name: "Errors",
    syntax: "Errors(dataSource, record)",
    description: "Provides error information for previous changes to a data source.",
    parameters: [
      {
        name: "dataSource",
        type: "datasource",
        required: true,
        description: "Data source to check for errors."
      },
      {
        name: "record",
        type: "record",
        required: false,
        description: "Specific record to check for errors."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "Errors(Accounts)", result: "Table of errors for the Accounts data source" },
      { formula: "Errors(Accounts, First(Accounts))", result: "Errors for the first record in Accounts" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "Errors requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // exactin function
  const ExactInRule = {
    name: "exactin",
    syntax: "value exactin collection",
    description: "Checks if a text string is contained within another text string or table, case dependent. Also used to check if a record is in a table.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "The value to look for."
      },
      {
        name: "collection",
        type: "any",
        required: true,
        description: "The string or table to look in."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "\"A\" exactin \"ABC\"", result: "true" },
      { formula: "\"a\" exactin \"ABC\"", result: "false (case-sensitive)" },
      { formula: "record exactin table", result: "true if the record exists in the table" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "exactin requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Exp function
  const ExpRule = {
    name: "Exp",
    syntax: "Exp(number)",
    description: "Returns e raised to a power.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "The exponent to raise e to."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Exp(1)", result: "2.718... (e)" },
      { formula: "Exp(2)", result: "7.389... (e²)" },
      { formula: "Exp(0)", result: "1" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Exp requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Filter function
  const FilterRule = {
    name: "Filter",
    syntax: "Filter(table, condition1 [, condition2, ...])",
    description: "Returns a filtered table based on one or more criteria.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to filter."
      },
      {
        name: "condition1, condition2, ...",
        type: "boolean",
        required: true,
        description: "One or more conditions that records must satisfy to be included in the result."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "Filter(Table1, Age > 30)", result: "Records from Table1 where Age > 30" },
      { formula: "Filter(Table1, StartsWith(Name, \"A\"), Status = \"Active\")",
        result: "Records where Name starts with A and Status is Active" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Filter requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // Find function
  const FindRule = {
    name: "Find",
    syntax: "Find(findText, withinText [, startIndex])",
    description: "Checks whether one string appears within another and returns the location.",
    parameters: [
      {
        name: "findText",
        type: "text",
        required: true,
        description: "The string to find."
      },
      {
        name: "withinText",
        type: "text",
        required: true,
        description: "The string to look in."
      },
      {
        name: "startIndex",
        type: "number",
        required: false,
        description: "Position to start the search (1-based)."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Find(\"World\", \"Hello World\")", result: "7" },
      { formula: "Find(\"o\", \"Hello World\", 5)", result: "8" },
      { formula: "Find(\"z\", \"Hello World\")", result: "0 (not found)" }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "Find requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // First function
  const FirstRule = {
    name: "First",
    syntax: "First(table)",
    description: "Returns the first record of a table.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to extract the first record from."
      }
    ],
    returnType: "record",
    examples: [
      { formula: "First(Table1)", result: "First record of Table1" },
      { formula: "First(Filter(Table1, Status = \"Active\"))", result: "First active record" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "First requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // FirstN function
  const FirstNRule = {
    name: "FirstN",
    syntax: "FirstN(table, numberOfRecords)",
    description: "Returns the first set of records (N records) of a table.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to extract records from."
      },
      {
        name: "numberOfRecords",
        type: "number",
        required: true,
        description: "Number of records to return."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "FirstN(Table1, 5)", result: "First 5 records of Table1" },
      { formula: "FirstN(Sort(Table1, Name), 10)", result: "First 10 records after sorting by Name" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "FirstN requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // ForAll function
  const ForAllRule = {
    name: "ForAll",
    syntax: "ForAll(table, formula)",
    description: "Calculates values and performs actions for all records of a table.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to iterate over."
      },
      {
        name: "formula",
        type: "formula",
        required: true,
        description: "Formula to evaluate for each record."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "ForAll(Table1, Value + 10)", result: "Table with Value + 10 for each record" },
      { formula: "ForAll(Table1, Patch(Table2, Defaults(Table2), {ID: ID, Name: Name}))",
        description: "Copies records from Table1 to Table2" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "ForAll requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // GroupBy function
  const GroupByRule = {
    name: "GroupBy",
    syntax: "GroupBy(table, groupColumn1 [, groupColumn2, ...] [, options])",
    description: "Returns a table with records grouped together.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to group."
      },
      {
        name: "groupColumn1, groupColumn2, ...",
        type: "column",
        required: true,
        description: "One or more columns to group by."
      },
      {
        name: "options",
        type: "record",
        required: false,
        description: "Options that control the grouping operation."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "GroupBy(Table1, 'Department')", result: "Table1 grouped by Department" },
      { formula: "GroupBy(Table1, 'Department', 'Location')", result: "Table1 grouped by Department and Location" },
      { formula: "GroupBy(Table1, 'Department', {Data: Table1})", result: "Table1 grouped by Department with Data option" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "GroupBy requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // GUID function
  const GUIDRule = {
    name: "GUID",
    syntax: "GUID()\nGUID(text)",
    description: "Converts a GUID string to a GUID value or creates a new GUID value.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: false,
        description: "The GUID string to convert (optional)."
      }
    ],
    returnType: "guid",
    examples: [
      { formula: "GUID()", result: "A new GUID value" },
      { formula: "GUID(\"f81d4fae-7dec-11d0-a765-00a0c91e6bf6\")", result: "The specified GUID value" }
    ],
    validate: function(args) {
      if (args.length > 1) {
        return { isValid: false, error: "GUID takes zero or one argument." };
      }
      return { isValid: true };
    }
  };

  // HashTags function
  const HashTagsRule = {
    name: "HashTags",
    syntax: "HashTags(text)",
    description: "Extracts the hashtags (#strings) from a string.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "String from which to extract hashtags."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "HashTags(\"Hello #world this is a #test\")", result: "Table with [\"world\", \"test\"]" },
      { formula: "HashTags(\"No hashtags here\")", result: "Empty table" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "HashTags requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Hex2Dec function
  const Hex2DecRule = {
    name: "Hex2Dec",
    syntax: "Hex2Dec(hexText)",
    description: "Convert a hexadecimal text string to a number.",
    parameters: [
      {
        name: "hexText",
        type: "text",
        required: true,
        description: "The hexadecimal string to convert."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Hex2Dec(\"A\")", result: "10" },
      { formula: "Hex2Dec(\"FF\")", result: "255" },
      { formula: "Hex2Dec(\"3E8\")", result: "1000" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Hex2Dec requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Host function
  const HostRule = {
    name: "Host",
    syntax: "Host",
    description: "Provides information about the current host running the app.",
    parameters: [],
    returnType: "record",
    properties: [
      { name: "Type", type: "text", description: "Type of host (e.g., \"Web\", \"PowerApps\")" }
    ],
    examples: [
      { formula: "Host.Type", result: "Type of host running the app" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Host should be used without arguments." };
      }
      return { isValid: true };
    }
  };

  // Hour function
  const HourRule = {
    name: "Hour",
    syntax: "Hour(dateTime)",
    description: "Returns the hour portion of a date/time value.",
    parameters: [
      {
        name: "dateTime",
        type: "datetime",
        required: true,
        description: "Date/time value from which to extract the hour."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Hour(Now())", result: "Current hour in 24-hour format" },
      { formula: "Hour(DateTimeValue(\"2024-12-31T14:30:00Z\"))", result: "14" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Hour requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // If function
  const IfRule = {
    name: "If",
    syntax: "If(condition, thenResult [, elseResult])",
    description: "Returns one value if a condition is true and another value if not.",
    parameters: [
      {
        name: "condition",
        type: "boolean",
        required: true,
        description: "The condition to test."
      },
      {
        name: "thenResult",
        type: "any",
        required: true,
        description: "The value to return if condition is true."
      },
      {
        name: "elseResult",
        type: "any",
        required: false,
        description: "The value to return if condition is false (defaults to blank)."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "If(Score > 70, \"Pass\", \"Fail\")", result: "\"Pass\" if Score > 70, otherwise \"Fail\"" },
      { formula: "If(IsBlank(Name), \"Unknown\")", result: "\"Unknown\" if Name is blank, otherwise blank" }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "If requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // IfError function
  const IfErrorRule = {
    name: "IfError",
    syntax: "IfError(formula, errorHandler)",
    description: "Detects errors and provides an alternative value or takes action.",
    parameters: [
      {
        name: "formula",
        type: "any",
        required: true,
        description: "Formula that might produce an error."
      },
      {
        name: "errorHandler",
        type: "any",
        required: true,
        description: "Value or formula to use if an error occurs."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "IfError(1/0, 0)", result: "0" },
      { formula: "IfError(Lookup(Table1, ID = CurrentID), {ID: CurrentID, Name: \"Not Found\"})",
        result: "Default record if lookup fails" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "IfError requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // in function
  const InRule = {
    name: "in",
    syntax: "value in collection",
    description: "Checks if a text string is contained within another text string or table, case independent. Also used to check if a record is in a table.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "The value to look for."
      },
      {
        name: "collection",
        type: "any",
        required: true,
        description: "The string or table to look in."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "\"a\" in \"ABC\"", result: "true (case-insensitive)" },
      { formula: "record in table", result: "true if the record exists in the table" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "in requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Index function
  const IndexRule = {
    name: "Index",
    syntax: "Index(table, index)",
    description: "Returns a record from a table based on ordered position.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table from which to extract a record."
      },
      {
        name: "index",
        type: "number",
        required: true,
        description: "The index of the record to extract (1-based)."
      }
    ],
    returnType: "record",
    examples: [
      { formula: "Index(Table1, 3)", result: "Third record of Table1" },
      { formula: "Index(Sort(Table1, Name), 1)", result: "First record after sorting by Name" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Index requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Int function
  const IntRule = {
    name: "Int",
    syntax: "Int(number)",
    description: "Rounds down to the nearest integer.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "Number to round down."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Int(1.5)", result: "1" },
      { formula: "Int(1.99)", result: "1" },
      { formula: "Int(-1.5)", result: "-2" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Int requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // IsBlank function
  const IsBlankRule = {
    name: "IsBlank",
    syntax: "IsBlank(value)",
    description: "Checks for a blank value.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to test."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "IsBlank(\"\")", result: "true" },
      { formula: "IsBlank(Blank())", result: "true" },
      { formula: "IsBlank(0)", result: "false" },
      { formula: "IsBlank(\"Hello\")", result: "false" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "IsBlank requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // IsBlankOrError function
  const IsBlankOrErrorRule = {
    name: "IsBlankOrError",
    syntax: "IsBlankOrError(value)",
    description: "Checks for a blank value or error.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to test."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "IsBlankOrError(\"\")", result: "true" },
      { formula: "IsBlankOrError(1/0)", result: "true" },
      { formula: "IsBlankOrError(\"Hello\")", result: "false" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "IsBlankOrError requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // IsEmpty function
  const IsEmptyRule = {
    name: "IsEmpty",
    syntax: "IsEmpty(table)",
    description: "Checks for an empty table.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to check."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "IsEmpty(Table1)", result: "true if Table1 has no records" },
      { formula: "IsEmpty(Filter(Table1, Status = \"Active\"))", result: "true if no active records" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "IsEmpty requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // IsError function
  const IsErrorRule = {
    name: "IsError",
    syntax: "IsError(value)",
    description: "Checks for an error.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to test."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "IsError(1/0)", result: "true" },
      { formula: "IsError(Error(\"Custom error\"))", result: "true" },
      { formula: "IsError(\"Hello\")", result: "false" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "IsError requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // IsMatch function
  const IsMatchRule = {
    name: "IsMatch",
    syntax: "IsMatch(text, pattern [, options])",
    description: "Checks a string against a pattern. Regular expressions can be used.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "The string to test."
      },
      {
        name: "pattern",
        type: "text",
        required: true,
        description: "Pattern to check against. Can be a regular expression."
      },
      {
        name: "options",
        type: "record",
        required: false,
        description: "Options for matching (e.g., {IgnoreCase: true})."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "IsMatch(\"123\", \"^\\d+$\")", result: "true" },
      { formula: "IsMatch(\"abc\", \"ABC\", {IgnoreCase: true})", result: "true" },
      { formula: "IsMatch(\"Hello World\", \"hello\")", result: "false" }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "IsMatch requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // IsNumeric function
  const IsNumericRule = {
    name: "IsNumeric",
    syntax: "IsNumeric(value)",
    description: "Checks for a numeric value.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to test."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "IsNumeric(123)", result: "true" },
      { formula: "IsNumeric(\"123\")", result: "true" },
      { formula: "IsNumeric(\"Hello\")", result: "false" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "IsNumeric requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // ISOWeekNum function
  const ISOWeekNumRule = {
    name: "ISOWeekNum",
    syntax: "ISOWeekNum(date)",
    description: "Returns the ISO week number of a date/time value.",
    parameters: [
      {
        name: "date",
        type: "datetime",
        required: true,
        description: "Date/time value to get the ISO week number of."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "ISOWeekNum(Today())", result: "Current ISO week number" },
      { formula: "ISOWeekNum(DateValue(\"2024-01-01\"))", result: "52 or 1 depending on the year" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "ISOWeekNum requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // IsToday function
  const IsTodayRule = {
    name: "IsToday",
    syntax: "IsToday(dateTime)",
    description: "Checks whether a date/time value is sometime today in the user's time zone.",
    parameters: [
      {
        name: "dateTime",
        type: "datetime",
        required: true,
        description: "Date/time value to check."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "IsToday(Now())", result: "true" },
      { formula: "IsToday(DateAdd(Today(), -1, \"days\"))", result: "false" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "IsToday requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // IsType function
  const IsTypeRule = {
    name: "IsType",
    syntax: "IsType(record, tableName)",
    description: "Checks whether a record reference refers to a specific table type.",
    parameters: [
      {
        name: "record",
        type: "record",
        required: true,
        description: "Record to check."
      },
      {
        name: "tableName",
        type: "text",
        required: true,
        description: "Name of the table type to check against."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "IsType(record, \"Accounts\")", result: "true if record is of Accounts type" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "IsType requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // IsUTCToday function
  const IsUTCTodayRule = {
    name: "IsUTCToday",
    syntax: "IsUTCToday(dateTime)",
    description: "Checks whether a date/time value is sometime today in Coordinated Universal Time (UTC).",
    parameters: [
      {
        name: "dateTime",
        type: "datetime",
        required: true,
        description: "Date/time value to check."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "IsUTCToday(Now())", result: "true if current time in local timezone is the same day in UTC" },
      { formula: "IsUTCToday(UTCNow())", result: "true" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "IsUTCToday requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // JSON function
  const JSONRule = {
    name: "JSON",
    syntax: "JSON(value [, options])",
    description: "Generates a JSON text string for a table, a record, or a value.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to convert to JSON."
      },
      {
        name: "options",
        type: "record",
        required: false,
        description: "Options for JSON conversion (e.g., {IncludeBinaryData: true})."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "JSON(Table1)", result: "JSON string representing Table1" },
      { formula: "JSON(First(Table1))", result: "JSON string representing first record" },
      { formula: "JSON({Name: \"John\", Age: 42})", result: "{\"Name\":\"John\",\"Age\":42}" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "JSON requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // Last function
  const LastRule = {
    name: "Last",
    syntax: "Last(table)",
    description: "Returns the last record of a table.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to extract the last record from."
      }
    ],
    returnType: "record",
    examples: [
      { formula: "Last(Table1)", result: "Last record of Table1" },
      { formula: "Last(Filter(Table1, Status = \"Active\"))", result: "Last active record" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Last requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // LastN function
  const LastNRule = {
    name: "LastN",
    syntax: "LastN(table, numberOfRecords)",
    description: "Returns the last set of records (N records) of a table.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to extract records from."
      },
      {
        name: "numberOfRecords",
        type: "number",
        required: true,
        description: "Number of records to return."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "LastN(Table1, 5)", result: "Last 5 records of Table1" },
      { formula: "LastN(Sort(Table1, Name), 10)", result: "Last 10 records after sorting by Name" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "LastN requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Left function
  const LeftRule = {
    name: "Left",
    syntax: "Left(text, numberOfChars)",
    description: "Returns the left-most portion of a string.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "String to extract from."
      },
      {
        name: "numberOfChars",
        type: "number",
        required: true,
        description: "Number of characters to extract."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Left(\"Hello World\", 5)", result: "\"Hello\"" },
      { formula: "Left(Name, 1)", result: "First character of Name" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Left requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Len function
  const LenRule = {
    name: "Len",
    syntax: "Len(text)",
    description: "Returns the length of a string.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "String to measure."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Len(\"Hello World\")", result: "11" },
      { formula: "Len(\"\")", result: "0" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Len requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Ln function
  const LnRule = {
    name: "Ln",
    syntax: "Ln(number)",
    description: "Returns the natural log.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "The positive number for which to find the natural logarithm."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Ln(1)", result: "0" },
      { formula: "Ln(2.7182818)", result: "Approximately 1" },
      { formula: "Ln(10)", result: "2.3025..." }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Ln requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Location function
  const LocationRule = {
    name: "Location",
    syntax: "Location()",
    description: "Returns your location as a map coordinate by using the Global Positioning System (GPS) and other information.",
    parameters: [],
    returnType: "record",
    properties: [
      { name: "Latitude", type: "number", description: "The latitude part of the coordinate" },
      { name: "Longitude", type: "number", description: "The longitude part of the coordinate" },
      { name: "Altitude", type: "number", description: "The altitude in meters" }
    ],
    examples: [
      { formula: "Location().Latitude", result: "Current latitude" },
      { formula: "Location().Longitude", result: "Current longitude" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Location function takes no arguments." };
      }
      return { isValid: true };
    }
  };

  // Log function
  const LogRule = {
    name: "Log",
    syntax: "Log(number, [base])",
    description: "Returns the logarithm in any base of a number.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "The positive number for which to find the logarithm."
      },
      {
        name: "base",
        type: "number",
        required: false,
        description: "The base to use. If omitted, base 10 is used."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Log(100)", result: "2 (base 10 logarithm)" },
      { formula: "Log(8, 2)", result: "3 (logarithm base 2)" },
      { formula: "Log(2.7182818, 2.7182818)", result: "1" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "Log requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // LookUp function
  const LookUpRule = {
    name: "LookUp",
    syntax: "LookUp(table, formula [, returnColumn])",
    description: "Looks up a single record in a table based on one or more criteria.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to search."
      },
      {
        name: "formula",
        type: "boolean",
        required: true,
        description: "Formula that evaluates to true for the record(s) to find."
      },
      {
        name: "returnColumn",
        type: "column",
        required: false,
        description: "Column to return. If omitted, the entire record is returned."
      }
    ],
    returnType: "any",
    examples: [
      { formula: "LookUp(Table1, ID = 12)", result: "Record where ID = 12" },
      { formula: "LookUp(Table1, ID = 12, Name)", result: "The Name value where ID = 12" },
      { formula: "LookUp(Employees, Department = \"Sales\" && Status = \"Active\", Email)",
        result: "Email of the first active Sales employee" }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "LookUp requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // Lower function
  const LowerRule = {
    name: "Lower",
    syntax: "Lower(text)",
    description: "Converts letters in a string of text to all lowercase.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "String to convert to lowercase."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Lower(\"Hello World\")", result: "\"hello world\"" },
      { formula: "Lower(FirstName)", result: "FirstName in lowercase" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Lower requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Match function
  const MatchRule = {
    name: "Match",
    syntax: "Match(text, pattern [, options])",
    description: "Extracts a substring based on a pattern. Regular expressions can be used.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "The string to search within."
      },
      {
        name: "pattern",
        type: "text",
        required: true,
        description: "Pattern to match. Can be a regular expression."
      },
      {
        name: "options",
        type: "record",
        required: false,
        description: "Options for matching (e.g., {IgnoreCase: true})."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Match(\"Hello123\", \"\\d+\")", result: "\"123\"" },
      { formula: "Match(\"Hello World\", \"hello\", {IgnoreCase: true})", result: "\"Hello\"" }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "Match requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // MatchAll function
  const MatchAllRule = {
    name: "MatchAll",
    syntax: "MatchAll(text, pattern [, options])",
    description: "Extracts multiple substrings based on a pattern. Regular expressions can be used.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "The string to search within."
      },
      {
        name: "pattern",
        type: "text",
        required: true,
        description: "Pattern to match. Can be a regular expression."
      },
      {
        name: "options",
        type: "record",
        required: false,
        description: "Options for matching (e.g., {IgnoreCase: true})."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "MatchAll(\"Hello123 World456\", \"\\d+\")", result: "Table with [\"123\", \"456\"]" },
      { formula: "MatchAll(\"red, green, BLUE\", \"[a-z]+\", {IgnoreCase: true})",
        result: "Table with [\"red\", \"green\", \"BLUE\"]" }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "MatchAll requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // Max function
  const MaxRule = {
    name: "Max",
    syntax: "Max(table, [valueColumn])\nMax(value1, value2, ...)",
    description: "Maximum value of a table expression or a set of arguments.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to find the maximum value in."
      },
      {
        name: "valueColumn",
        type: "column",
        required: false,
        description: "Column to find the maximum value of. If not provided, the table must be a single-column table."
      },
      {
        name: "value1, value2, ...",
        type: "number",
        required: false,
        description: "Alternative syntax: Two or more values to find the maximum of."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Max(Table1, Amount)", result: "Maximum value in the Amount column" },
      { formula: "Max([1, 2, 3, 4, 5])", result: "5" },
      { formula: "Max(1, 3, 5, 7, 9)", result: "9" }
    ],
    validate: function(args) {
      if (args.length < 1) {
        return { isValid: false, error: "Max requires at least one argument." };
      }
      return { isValid: true };
    }
  };

  // Mid function
  const MidRule = {
    name: "Mid",
    syntax: "Mid(text, start, numberOfChars)",
    description: "Returns the middle portion of a string.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "String to extract from."
      },
      {
        name: "start",
        type: "number",
        required: true,
        description: "Starting position (1-based)."
      },
      {
        name: "numberOfChars",
        type: "number",
        required: true,
        description: "Number of characters to extract."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Mid(\"Hello World\", 7, 5)", result: "\"World\"" },
      { formula: "Mid(\"Power Apps\", 7, 4)", result: "\"Apps\"" }
    ],
    validate: function(args) {
      if (args.length !== 3) {
        return { isValid: false, error: "Mid requires exactly three arguments." };
      }
      return { isValid: true };
    }
  };

  // Min function
  const MinRule = {
    name: "Min",
    syntax: "Min(table, [valueColumn])\nMin(value1, value2, ...)",
    description: "Minimum value of a table expression or a set of arguments.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to find the minimum value in."
      },
      {
        name: "valueColumn",
        type: "column",
        required: false,
        description: "Column to find the minimum value of. If not provided, the table must be a single-column table."
      },
      {
        name: "value1, value2, ...",
        type: "number",
        required: false,
        description: "Alternative syntax: Two or more values to find the minimum of."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Min(Table1, Amount)", result: "Minimum value in the Amount column" },
      { formula: "Min([1, 2, 3, 4, 5])", result: "1" },
      { formula: "Min(1, 3, 5, 7, 9)", result: "1" }
    ],
    validate: function(args) {
      if (args.length < 1) {
        return { isValid: false, error: "Min requires at least one argument." };
      }
      return { isValid: true };
    }
  };

  // Minute function
  const MinuteRule = {
    name: "Minute",
    syntax: "Minute(dateTime)",
    description: "Retrieves the minute portion of a date/time value.",
    parameters: [
      {
        name: "dateTime",
        type: "datetime",
        required: true,
        description: "Date/time value from which to extract the minute."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Minute(Now())", result: "Current minute (0-59)" },
      { formula: "Minute(DateTimeValue(\"2023-12-31T14:30:00Z\"))", result: "30" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Minute requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Mod function
  const ModRule = {
    name: "Mod",
    syntax: "Mod(dividend, divisor)",
    description: "Returns the remainder after a dividend is divided by a divisor.",
    parameters: [
      {
        name: "dividend",
        type: "number",
        required: true,
        description: "The number to divide."
      },
      {
        name: "divisor",
        type: "number",
        required: true,
        description: "The number to divide by."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Mod(10, 3)", result: "1" },
      { formula: "Mod(11, 3)", result: "2" },
      { formula: "Mod(12, 3)", result: "0" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Mod requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Month function
  const MonthRule = {
    name: "Month",
    syntax: "Month(date)",
    description: "Retrieves the month portion of a date/time value.",
    parameters: [
      {
        name: "date",
        type: "datetime",
        required: true,
        description: "Date/time value from which to extract the month."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Month(Today())", result: "Current month (1-12)" },
      { formula: "Month(DateValue(\"12/31/2024\"))", result: "12" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Month requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Navigate function
  const NavigateRule = {
    name: "Navigate",
    syntax: "Navigate(screen [, transitionType [, updateContextRecord]])",
    description: "Changes which screen is displayed.",
    parameters: [
      {
        name: "screen",
        type: "screen",
        required: true,
        description: "The screen to navigate to."
      },
      {
        name: "transitionType",
        type: "text",
        required: false,
        description: "The visual transition type (\"None\", \"Cover\", \"UnCover\", \"CoverRight\", etc.)."
      },
      {
        name: "updateContextRecord",
        type: "record",
        required: false,
        description: "A record that updates the context variables of the app."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Navigate(Screen2)", result: "Navigates to Screen2" },
      { formula: "Navigate(Screen2, ScreenTransition.Fade)", result: "Navigates to Screen2 with fade transition" },
      { formula: "Navigate(DetailScreen, ScreenTransition.None, {ID: gallery.Selected.ID})",
        result: "Navigates to DetailScreen and sets ID context variable" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 3) {
        return { isValid: false, error: "Navigate requires one to three arguments." };
      }
      return { isValid: true };
    }
  };

  // Not function
  const NotRule = {
    name: "Not",
    syntax: "Not(logical)",
    description: "Boolean logic NOT. Returns true if its argument is false, and returns false if its argument is true. You can also use the ! operator.",
    parameters: [
      {
        name: "logical",
        type: "boolean",
        required: true,
        description: "Boolean value to negate."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Not(true)", result: "false" },
      { formula: "Not(false)", result: "true" },
      { formula: "!true", result: "false" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Not requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Notify function
  const NotifyRule = {
    name: "Notify",
    syntax: "Notify(message [, notificationType [, timeout]])",
    description: "Displays a banner message to the user.",
    parameters: [
      {
        name: "message",
        type: "text",
        required: true,
        description: "Message to display."
      },
      {
        name: "notificationType",
        type: "text",
        required: false,
        description: "Type of notification (\"Success\", \"Error\", \"Warning\", or \"Information\")."
      },
      {
        name: "timeout",
        type: "number",
        required: false,
        description: "Time in milliseconds before the notification disappears."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Notify(\"Record saved successfully\")", result: "Shows default notification" },
      { formula: "Notify(\"Error occurred\", NotificationType.Error)", result: "Shows error notification" },
      { formula: "Notify(\"Changes saved\", NotificationType.Success, 3000)",
        result: "Shows success notification for 3 seconds" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 3) {
        return { isValid: false, error: "Notify requires one to three arguments." };
      }
      return { isValid: true };
    }
  };

  // Now function
  const NowRule = {
    name: "Now",
    syntax: "Now()",
    description: "Returns the current date/time value in the user's time zone.",
    parameters: [],
    returnType: "datetime",
    examples: [
      { formula: "Now()", result: "Current date and time" },
      { formula: "DateDiff(Now(), DateTimeValue(\"2024-01-01T00:00:00Z\"), Days)",
        result: "Days between Jan 1, 2024, and now" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Now function takes no arguments." };
      }
      return { isValid: true };
    }
  };

  // Or function
  const OrRule = {
    name: "Or",
    syntax: "Or(logical1, logical2, ...)",
    description: "Boolean logic OR. Returns true if any of its arguments are true. You can also use the || operator.",
    parameters: [
      {
        name: "logical1, logical2, ...",
        type: "boolean",
        required: true,
        description: "Two or more logical expressions to evaluate."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Or(true, true)", result: "true" },
      { formula: "Or(true, false)", result: "true" },
      { formula: "Or(false, true)", result: "true" },
      { formula: "Or(false, false)", result: "false" },
      { formula: "true || false", result: "true" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Or requires at least two arguments." };
      }
      return { isValid: true };
    }
  };


  // Parent function
  const ParentRule = {
    name: "Parent",
    syntax: "Parent",
    description: "Provides access to a container control's properties.",
    parameters: [],
    returnType: "control",
    examples: [
      { formula: "Parent.Fill", result: "The Fill property of the parent control" },
      { formula: "Parent.Width", result: "The Width property of the parent control" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Parent should be used without arguments." };
      }
      return { isValid: true };
    }
  };

  // ParseJSON function
  const ParseJSONRule = {
    name: "ParseJSON",
    syntax: "ParseJSON(JSONtext)",
    description: "Converts JSON document represented as text to an Untyped object value.",
    parameters: [
      {
        name: "JSONtext",
        type: "text",
        required: true,
        description: "The JSON text to convert to an Untyped object."
      }
    ],
    returnType: "untyped",
    examples: [
      { formula: "ParseJSON(\"{\\\"Name\\\":\\\"John\\\",\\\"Age\\\":42}\")", result: "Untyped object with Name and Age properties" },
      { formula: "ParseJSON(JSONresponse)", result: "Converts JSON response to an Untyped object" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "ParseJSON requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Patch function
  const PatchRule = {
    name: "Patch",
    syntax: "Patch(dataSource, baseRecord, changeRecord1 [, changeRecord2, ...])",
    description: "Modifies or creates a record in a data source, or merges records outside of a data source.",
    parameters: [
      {
        name: "dataSource",
        type: "datasource",
        required: true,
        description: "The data source that contains the record."
      },
      {
        name: "baseRecord",
        type: "record",
        required: true,
        description: "The record to modify or a blank record to create."
      },
      {
        name: "changeRecord1, changeRecord2, ...",
        type: "record",
        required: true,
        description: "The change(s) to apply to the base record."
      }
    ],
    returnType: "record",
    examples: [
      { formula: "Patch(Accounts, First(Filter(Accounts, ID = 12)), {Status: \"Active\"})",
        result: "Updates the Status of account with ID = 12" },
      { formula: "Patch(Accounts, Defaults(Accounts), {Name: \"New Account\", Status: \"Active\"})",
        result: "Creates a new account with the specified properties" }
    ],
    validate: function(args) {
      if (args.length < 3) {
        return { isValid: false, error: "Patch requires at least three arguments." };
      }
      return { isValid: true };
    }
  };

  // PDF function
  const PDFRule = {
    name: "PDF",
    syntax: "PDF(options)",
    description: "Export contents from the current screen to an object for use in multiple scenarios.",
    parameters: [
      {
        name: "options",
        type: "record",
        required: false,
        description: "Options for PDF generation (e.g., {PageWidth: 8.5, PageHeight: 11})."
      }
    ],
    returnType: "object",
    examples: [
      { formula: "PDF()", result: "PDF object with default settings" },
      { formula: "PDF({PageWidth: 8.5, PageHeight: 11})", result: "PDF object with specified page size" }
    ],
    validate: function(args) {
      if (args.length > 1) {
        return { isValid: false, error: "PDF takes zero or one argument." };
      }
      return { isValid: true };
    }
  };

  // Pi function
  const PiRule = {
    name: "Pi",
    syntax: "Pi()",
    description: "Returns the number π.",
    parameters: [],
    returnType: "number",
    examples: [
      { formula: "Pi()", result: "3.14159..." },
      { formula: "2 * Pi() * Radius", result: "Circumference of a circle" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Pi function takes no arguments." };
      }
      return { isValid: true };
    }
  };

  // PlainText function
  const PlainTextRule = {
    name: "PlainText",
    syntax: "PlainText(htmlText)",
    description: "Removes HTML and XML tags from a string.",
    parameters: [
      {
        name: "htmlText",
        type: "text",
        required: true,
        description: "String containing HTML or XML to convert to plain text."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "PlainText(\"<p>Hello <b>World</b></p>\")", result: "\"Hello World\"" },
      { formula: "PlainText(HtmlContent)", result: "HtmlContent without HTML tags" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "PlainText requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Power function
  const PowerRule = {
    name: "Power",
    syntax: "Power(base, exponent)",
    description: "Returns a number raised to a power. You can also use the ^ operator.",
    parameters: [
      {
        name: "base",
        type: "number",
        required: true,
        description: "The base number."
      },
      {
        name: "exponent",
        type: "number",
        required: true,
        description: "The exponent to raise the base to."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Power(2, 3)", result: "8" },
      { formula: "Power(10, 2)", result: "100" },
      { formula: "2 ^ 3", result: "8" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Power requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Proper function
  const ProperRule = {
    name: "Proper",
    syntax: "Proper(text)",
    description: "Converts the first letter of each word in a string to uppercase, and converts the rest to lowercase.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "String to convert to proper case."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Proper(\"hello world\")", result: "\"Hello World\"" },
      { formula: "Proper(\"JOHN DOE\")", result: "\"John Doe\"" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Proper requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Radians function
  const RadiansRule = {
    name: "Radians",
    syntax: "Radians(degrees)",
    description: "Converts degrees to radians.",
    parameters: [
      {
        name: "degrees",
        type: "number",
        required: true,
        description: "Angle in degrees to convert to radians."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Radians(180)", result: "3.14159... (π)" },
      { formula: "Radians(90)", result: "1.5708... (π/2)" },
      { formula: "Radians(45)", result: "0.7854... (π/4)" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Radians requires exactly one argument." };
      }
      return { isValid: true };
    }
  };
  // Rand function
  const RandRule = {
    name: "Rand",
    syntax: "Rand()",
    description: "Returns a pseudo-random number between 0 and 1.",
    parameters: [],
    returnType: "number",
    examples: [
      { formula: "Rand()", result: "Random number between 0 and 1" },
      { formula: "Rand() * 100", result: "Random number between 0 and 100" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Rand function takes no arguments." };
      }
      return { isValid: true };
    }
  };

  // RandBetween function
  const RandBetweenRule = {
    name: "RandBetween",
    syntax: "RandBetween(lowerLimit, upperLimit)",
    description: "Returns a pseudo-random number between two numbers.",
    parameters: [
      {
        name: "lowerLimit",
        type: "number",
        required: true,
        description: "The lower boundary of the random number."
      },
      {
        name: "upperLimit",
        type: "number",
        required: true,
        description: "The upper boundary of the random number."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "RandBetween(1, 6)", result: "Random integer between 1 and 6 (like a die roll)" },
      { formula: "RandBetween(1, 100)", result: "Random integer between 1 and 100" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "RandBetween requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // RecordInfo function
  const RecordInfoRule = {
    name: "RecordInfo",
    syntax: "RecordInfo(dataSource, record)",
    description: "Provides information about a record of a data source.",
    parameters: [
      {
        name: "dataSource",
        type: "datasource",
        required: true,
        description: "Data source that contains the record."
      },
      {
        name: "record",
        type: "record",
        required: true,
        description: "Record to get information about."
      }
    ],
    returnType: "record",
    examples: [
      { formula: "RecordInfo(Accounts, First(Accounts)).Created", result: "Creation date of the first account" },
      { formula: "RecordInfo(Accounts, ThisItem).LastModifiedBy", result: "Who last modified the current account" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "RecordInfo requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Refresh function
  const RefreshRule = {
    name: "Refresh",
    syntax: "Refresh(dataSource)",
    description: "Refreshes the records of a data source.",
    parameters: [
      {
        name: "dataSource",
        type: "datasource",
        required: true,
        description: "Data source to refresh."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Refresh(Accounts)", result: "Refreshes the Accounts data source" },
      { formula: "If(changes, Refresh(Accounts))", result: "Refreshes Accounts if changes exist" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Refresh requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Relate function
  const RelateRule = {
    name: "Relate",
    syntax: "Relate(relationshipName, firstTable, firstTableKey, secondTable, secondTableKey)",
    description: "Relates records of two tables through a one-to-many or many-to-many relationship.",
    parameters: [
      {
        name: "relationshipName",
        type: "text",
        required: true,
        description: "Name of the relationship to use."
      },
      {
        name: "firstTable",
        type: "table",
        required: true,
        description: "First table in the relationship."
      },
      {
        name: "firstTableKey",
        type: "column",
        required: true,
        description: "Key column of the first table."
      },
      {
        name: "secondTable",
        type: "table",
        required: true,
        description: "Second table in the relationship."
      },
      {
        name: "secondTableKey",
        type: "column",
        required: true,
        description: "Key column of the second table."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Relate(\"ContactAccounts\", Contacts, ContactID, Accounts, AccountID)",
        result: "Creates relationships between contacts and accounts" }
    ],
    validate: function(args) {
      if (args.length !== 5) {
        return { isValid: false, error: "Relate requires exactly five arguments." };
      }
      return { isValid: true };
    }
  };

  // Remove function
  const RemoveRule = {
    name: "Remove",
    syntax: "Remove(dataSource, record1 [, record2, ...])",
    description: "Removes one or more specific records from a data source.",
    parameters: [
      {
        name: "dataSource",
        type: "datasource",
        required: true,
        description: "Data source from which to remove records."
      },
      {
        name: "record1, record2, ...",
        type: "record",
        required: true,
        description: "One or more records to remove."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Remove(Accounts, First(Accounts))", result: "Removes the first account" },
      { formula: "Remove(Accounts, Gallery1.Selected)", result: "Removes the selected account from Gallery1" }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Remove requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // RemoveIf function
  const RemoveIfRule = {
    name: "RemoveIf",
    syntax: "RemoveIf(dataSource, condition)",
    description: "Removes records from a data source based on a condition.",
    parameters: [
      {
        name: "dataSource",
        type: "datasource",
        required: true,
        description: "Data source from which to remove records."
      },
      {
        name: "condition",
        type: "boolean",
        required: true,
        description: "Condition that determines which records to remove."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "RemoveIf(Accounts, Status = \"Inactive\")", result: "Removes all inactive accounts" },
      { formula: "RemoveIf(Accounts, Created < DateAdd(Today(), -365, Days))",
        result: "Removes accounts older than a year" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "RemoveIf requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // RenameColumns function
  const RenameColumnsRule = {
    name: "RenameColumns",
    syntax: "RenameColumns(table, oldColumnName1, newColumnName1 [, oldColumnName2, newColumnName2, ...])",
    description: "Renames columns of a table.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table whose columns to rename."
      },
      {
        name: "oldColumnName1",
        type: "text",
        required: true,
        description: "Original name of the first column to rename."
      },
      {
        name: "newColumnName1",
        type: "text",
        required: true,
        description: "New name for the first column."
      },
      {
        name: "oldColumnName2, newColumnName2, ...",
        type: "text",
        required: false,
        description: "Additional columns to rename."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "RenameColumns(Table1, \"OldName\", \"NewName\")",
        result: "Table1 with OldName column renamed to NewName" },
      { formula: "RenameColumns(Table1, \"FirstName\", \"First\", \"LastName\", \"Last\")",
        result: "Table1 with renamed columns" }
    ],
    validate: function(args) {
      if (args.length < 3) {
        return { isValid: false, error: "RenameColumns requires at least three arguments." };
      }
      if (args.length % 2 !== 1) {
        return { isValid: false, error: "RenameColumns requires an odd number of arguments (table followed by name pairs)." };
      }
      return { isValid: true };
    }
  };

  // Replace function
  const ReplaceRule = {
    name: "Replace",
    syntax: "Replace(text, startPos, numberOfChars, replacementText)",
    description: "Replaces part of a string with another string, by starting position of the string.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "String to modify."
      },
      {
        name: "startPos",
        type: "number",
        required: true,
        description: "Starting position (1-based) to replace."
      },
      {
        name: "numberOfChars",
        type: "number",
        required: true,
        description: "Number of characters to replace."
      },
      {
        name: "replacementText",
        type: "text",
        required: true,
        description: "String to substitute."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Replace(\"Hello World\", 7, 5, \"PowerApps\")", result: "\"Hello PowerApps\"" },
      { formula: "Replace(Phone, 1, 3, \"(\" & Left(Phone, 3) & \")\")",
        result: "Formats phone number with area code in parentheses" }
    ],
    validate: function(args) {
      if (args.length !== 4) {
        return { isValid: false, error: "Replace requires exactly four arguments." };
      }
      return { isValid: true };
    }
  };

  // Reset function
  const ResetRule = {
    name: "Reset",
    syntax: "Reset(control)",
    description: "Resets an input control to its default value, discarding any user changes.",
    parameters: [
      {
        name: "control",
        type: "control",
        required: true,
        description: "Control to reset."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Reset(TextInput1)", result: "Resets TextInput1 to its default value" },
      { formula: "Reset(Form1)", result: "Resets all input controls in Form1" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Reset requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Set function
  const SetRule = {
    name: "Set",
    syntax: "Set(variable, value)",
    description: "Sets the value of a global variable.",
    parameters: [
      {
        name: "variable",
        type: "string",
        required: true,
        description: "The name of the global variable to set."
      },
      {
        name: "value",
        type: "any",
        required: true,
        description: "The value to assign to the global variable."
      }
    ],
    returnType: "void",
    examples: [
      { formula: "Set(UserName, \"John Doe\")", result: "Sets the global variable UserName to 'John Doe'" },
      { formula: "Set(Counter, Counter + 1)", result: "Increments the global variable Counter by 1" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Set requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // RGBA function
  const RGBARule = {
    name: "RGBA",
    syntax: "RGBA(red, green, blue, alpha)",
    description: "Returns a color value for a set of red, green, blue, and alpha components.",
    parameters: [
      {
        name: "red",
        type: "number",
        required: true,
        description: "Red component (0-255)."
      },
      {
        name: "green",
        type: "number",
        required: true,
        description: "Green component (0-255)."
      },
      {
        name: "blue",
        type: "number",
        required: true,
        description: "Blue component (0-255)."
      },
      {
        name: "alpha",
        type: "number",
        required: true,
        description: "Alpha component (0-1)."
      }
    ],
    returnType: "color",
    examples: [
      { formula: "RGBA(255, 0, 0, 1)", result: "Opaque red color" },
      { formula: "RGBA(0, 0, 255, 0.5)", result: "Semi-transparent blue color" }
    ],
    validate: function(args) {
      if (args.length !== 4) {
        return { isValid: false, error: "RGBA requires exactly four arguments." };
      }
      return { isValid: true };
    }
  };

  // Right function
  const RightRule = {
    name: "Right",
    syntax: "Right(text, numberOfChars)",
    description: "Returns the right-most portion of a string.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "String to extract from."
      },
      {
        name: "numberOfChars",
        type: "number",
        required: true,
        description: "Number of characters to extract."
      }
    ],
    returnType: "text",
    examples: [
      { formula: "Right(\"Hello World\", 5)", result: "\"World\"" },
      { formula: "Right(Phone, 4)", result: "Last 4 digits of Phone" }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Right requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Round function
  const RoundRule = {
    name: "Round",
    syntax: "Round(number [, decimals])",
    description: "Rounds to the closest number.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "Number to round."
      },
      {
        name: "decimals",
        type: "number",
        required: false,
        description: "Number of decimal places (default is 0)."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Round(1.234)", result: "1" },
      { formula: "Round(1.567)", result: "2" },
      { formula: "Round(1.234, 2)", result: "1.23" },
      { formula: "Round(1.567, 2)", result: "1.57" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "Round requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // RoundDown function
  const RoundDownRule = {
    name: "RoundDown",
    syntax: "RoundDown(number [, decimals])",
    description: "Rounds down to the largest previous number.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "Number to round down."
      },
      {
        name: "decimals",
        type: "number",
        required: false,
        description: "Number of decimal places (default is 0)."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "RoundDown(1.999)", result: "1" },
      { formula: "RoundDown(1.999, 2)", result: "1.99" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "RoundDown requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // RoundUp function
  const RoundUpRule = {
    name: "RoundUp",
    syntax: "RoundUp(number [, decimals])",
    description: "Rounds up to the smallest next number.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "Number to round up."
      },
      {
        name: "decimals",
        type: "number",
        required: false,
        description: "Number of decimal places (default is 0)."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "RoundUp(1.001)", result: "2" },
      { formula: "RoundUp(1.001, 2)", result: "1.01" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "RoundUp requires one or two arguments." };
      }
      return { isValid: true };
    }
  };


  // Search function
  const SearchRule = {
    name: "Search",
    syntax: "Search(table, searchString, column1 [, column2, ...])",
    description: "Finds records in a table that contain a string in one of their columns.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table to search."
      },
      {
        name: "searchString",
        type: "text",
        required: true,
        description: "String to search for."
      },
      {
        name: "column1, column2, ...",
        type: "column",
        required: true,
        description: "Columns to search within."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "Search(Customers, TextSearchBox.Text, 'Name')",
        result: "Customers where Name contains the search text" },
      { formula: "Search(Customers, TextSearchBox.Text, 'Name', 'Email', 'Phone')",
        result: "Customers where any of the specified columns contain the search text" }
    ],
    validate: function(args) {
      if (args.length < 3) {
        return { isValid: false, error: "Search requires at least three arguments." };
      }
      return { isValid: true };
    }
  };

  // Second function
  const SecondRule = {
    name: "Second",
    syntax: "Second(dateTime)",
    description: "Retrieves the second portion of a date/time value.",
    parameters: [
      {
        name: "dateTime",
        type: "datetime",
        required: true,
        description: "Date/time value from which to extract the second."
      }
    ],
    returnType: "number",
    examples: [
      { formula: "Second(Now())", result: "Current second (0-59)" },
      { formula: "Second(DateTimeValue(\"2023-12-31T14:30:45Z\"))", result: "45" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Second requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Select function
  const SelectRule = {
    name: "Select",
    syntax: "Select(control [, behavior])",
    description: "Simulates a select action on a control, causing the OnSelect formula to be evaluated.",
    parameters: [
      {
        name: "control",
        type: "control",
        required: true,
        description: "Control to select."
      },
      {
        name: "behavior",
        type: "text",
        required: false,
        description: "Selection behavior to use."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "Select(Button1)", result: "Simulates selecting Button1" },
      { formula: "If(condition, Select(Button1))", result: "Selects Button1 if condition is true" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "Select requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // Self function
  const SelfRule = {
    name: "Self",
    syntax: "Self",
    description: "Provides access to the properties of the current control.",
    parameters: [],
    returnType: "control",
    examples: [
      { formula: "Self.Fill", result: "The Fill property of the current control" },
      { formula: "Self.Width", result: "The Width property of the current control" }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Self should be used without arguments." };
      }
      return { isValid: true };
    }
  };

  // Sequence function
  const SequenceRule = {
    name: "Sequence",
    syntax: "Sequence(count [, start [, step]])",
    description: "Generate a table of sequential numbers, useful when iterating with ForAll.",
    parameters: [
      {
        name: "count",
        type: "number",
        required: true,
        description: "Number of values to generate."
      },
      {
        name: "start",
        type: "number",
        required: false,
        description: "Starting value (default is 1)."
      },
      {
        name: "step",
        type: "number",
        required: false,
        description: "Increment between values (default is 1)."
      }
    ],
    returnType: "table",
    examples: [
      { formula: "Sequence(5)", result: "Table with [1, 2, 3, 4, 5]" },
      { formula: "Sequence(5, 0)", result: "Table with [0, 1, 2, 3, 4]" },
      { formula: "Sequence(5, 0, 2)", result: "Table with [0, 2, 4, 6, 8]" }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 3) {
        return { isValid: false, error: "Sequence requires one to three arguments." };
      }
      return { isValid: true };
    }
  };

  // SetFocus function
  const SetFocusRule = {
    name: "SetFocus",
    syntax: "SetFocus(control)",
    description: "Moves input focus to a specific control.",
    parameters: [
      {
        name: "control",
        type: "control",
        required: true,
        description: "Control to set focus to."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "SetFocus(TextInput1)", result: "Sets focus to TextInput1" },
      { formula: "If(IsBlank(TextInput1.Text), SetFocus(TextInput1))",
        result: "Sets focus to TextInput1 if it's blank" }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "SetFocus requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // SetProperty function
  const SetPropertyRule = {
    name: "SetProperty",
    syntax: "SetProperty(control, propertyName, value)",
    description: "Simulates interactions with input controls.",
    parameters: [
      {
        name: "control",
        type: "control",
        required: true,
        description: "Control to set the property on."
      },
      {
        name: "propertyName",
        type: "text",
        required: true,
        description: "Name of the property to set."
      },
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to set the property to."
      }
    ],
    returnType: "boolean",
    examples: [
      { formula: "SetProperty(TextInput1, \"Text\", \"Hello World\")",
        result: "Sets TextInput1.Text to \"Hello World\"" },
      { formula: "SetProperty(Toggle1, \"Value\", true)", result: "Sets Toggle1.Value to true" }
    ],
    validate: function(args) {
      if (args.length !== 3) {
        return { isValid: false, error: "SetProperty requires exactly three arguments." };
      }
      return { isValid: true };
    }
  };

  // ShowColumns function
  const ShowColumnsRule = {
    name: "ShowColumns",
    syntax: "ShowColumns(source, column1[, column2, ...])",
    description: "Returns a table with only selected columns.",
    parameters: [
      {
        name: "source",
        type: "table",
        required: true,
        description: "Table from which to show columns."
      },
      {
        name: "column1",
        type: "text",
        required: true,
        description: "First column name to include in the result."
      },
      {
        name: "column2, ...",
        type: "text",
        required: false,
        description: "Additional column names to include in the result."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "ShowColumns(Employees, \"Name\", \"Department\")",
        result: "Returns a table with only Name and Department columns from the Employees table"
      },
      {
        formula: "ShowColumns(Table1, \"ID\")",
        result: "Returns a table with only the ID column from Table1"
      }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "ShowColumns requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // Shuffle function
  const ShuffleRule = {
    name: "Shuffle",
    syntax: "Shuffle(source)",
    description: "Randomly reorders the records of a table.",
    parameters: [
      {
        name: "source",
        type: "table",
        required: true,
        description: "Table to reorder."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "Shuffle(Products)",
        result: "Returns the Products table with records in random order"
      },
      {
        formula: "Shuffle(Filter(Customers, Country = \"UK\"))",
        result: "Returns UK customers in random order"
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Shuffle requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Sin function
  const SinRule = {
    name: "Sin",
    syntax: "Sin(number)",
    description: "Returns the sine of an angle specified in radians.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "Angle in radians for which to find the sine."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "Sin(0)",
        result: "0"
      },
      {
        formula: "Sin(Pi()/2)",
        result: "1"
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Sin requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Sort function
  const SortRule = {
    name: "Sort",
    syntax: "Sort(source, formula[, ascending])",
    description: "Returns a sorted table based on a formula.",
    parameters: [
      {
        name: "source",
        type: "table",
        required: true,
        description: "Table to sort."
      },
      {
        name: "formula",
        type: "formula",
        required: true,
        description: "Formula to apply to each record for sorting."
      },
      {
        name: "ascending",
        type: "boolean",
        required: false,
        description: "If true (default), sort in ascending order. If false, sort in descending order."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "Sort(Employees, Salary)",
        result: "Returns Employees table sorted by Salary in ascending order"
      },
      {
        formula: "Sort(Products, Price, false)",
        result: "Returns Products table sorted by Price in descending order"
      }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "Sort requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // SortByColumns function
  const SortByColumnsRule = {
    name: "SortByColumns",
    syntax: "SortByColumns(source, column1[, ascending1, column2, ascending2, ...])",
    description: "Returns a sorted table based on one or more columns.",
    parameters: [
      {
        name: "source",
        type: "table",
        required: true,
        description: "Table to sort."
      },
      {
        name: "column1",
        type: "text",
        required: true,
        description: "Name of the first column by which to sort."
      },
      {
        name: "ascending1",
        type: "boolean",
        required: false,
        description: "If true (default), sort in ascending order. If false, sort in descending order."
      },
      {
        name: "column2, ascending2, ...",
        type: "varies",
        required: false,
        description: "Additional column names and sort directions."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "SortByColumns(Employees, \"Department\", true, \"LastName\", true)",
        result: "Returns Employees table sorted by Department and then LastName, both ascending"
      },
      {
        formula: "SortByColumns(Products, \"Category\", true, \"Price\", false)",
        result: "Returns Products table sorted by Category ascending, then Price descending"
      }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "SortByColumns requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // Split function
  const SplitRule = {
    name: "Split",
    syntax: "Split(text, separator)",
    description: "Splits a text string into a table of substrings.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "Text string to split."
      },
      {
        name: "separator",
        type: "text",
        required: true,
        description: "Separator to use for splitting."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "Split(\"Red,Green,Blue\", \",\")",
        result: "Table with records [\"Red\", \"Green\", \"Blue\"]"
      },
      {
        formula: "Split(\"Apple|Orange|Banana\", \"|\")",
        result: "Table with records [\"Apple\", \"Orange\", \"Banana\"]"
      }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Split requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Sqrt function
  const SqrtRule = {
    name: "Sqrt",
    syntax: "Sqrt(number)",
    description: "Returns the square root of a number.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "Number for which to find the square root."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "Sqrt(16)",
        result: "4"
      },
      {
        formula: "Sqrt(2)",
        result: "1.4142..."
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Sqrt requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // StartsWith function
  const StartsWithRule = {
    name: "StartsWith",
    syntax: "StartsWith(text, start)",
    description: "Checks if a text string begins with another text string.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "Text to test."
      },
      {
        name: "start",
        type: "text",
        required: true,
        description: "Text to look for at the beginning."
      }
    ],
    returnType: "boolean",
    examples: [
      {
        formula: "StartsWith(\"Hello World\", \"Hello\")",
        result: "true"
      },
      {
        formula: "StartsWith(\"PowerApps\", \"Power\")",
        result: "true"
      },
      {
        formula: "StartsWith(\"PowerApps\", \"Apps\")",
        result: "false"
      }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "StartsWith requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // StdevP function
  const StdevPRule = {
    name: "StdevP",
    syntax: "StdevP(number1[, number2, ...])",
    description: "Returns the standard deviation of its arguments.",
    parameters: [
      {
        name: "number1",
        type: "number",
        required: true,
        description: "First number in the calculation."
      },
      {
        name: "number2, ...",
        type: "number",
        required: false,
        description: "Additional numbers in the calculation."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "StdevP(1, 2, 3, 4, 5)",
        result: "1.4142..."
      },
      {
        formula: "StdevP(Table1.Value)",
        result: "Standard deviation of all values in the Value column of Table1"
      }
    ],
    validate: function(args) {
      if (args.length < 1) {
        return { isValid: false, error: "StdevP requires at least one argument." };
      }
      return { isValid: true };
    }
  };

  // Substitute function
  const SubstituteRule = {
    name: "Substitute",
    syntax: "Substitute(text, oldText, newText[, instanceNum])",
    description: "Replaces part of a string with another string, by matching strings.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "Text string to modify."
      },
      {
        name: "oldText",
        type: "text",
        required: true,
        description: "Text to be replaced."
      },
      {
        name: "newText",
        type: "text",
        required: true,
        description: "Text to replace with."
      },
      {
        name: "instanceNum",
        type: "number",
        required: false,
        description: "Instance number to replace. If omitted, replaces all instances."
      }
    ],
    returnType: "text",
    examples: [
      {
        formula: "Substitute(\"Hello World\", \"World\", \"Universe\")",
        result: "\"Hello Universe\""
      },
      {
        formula: "Substitute(\"one two one three\", \"one\", \"ONE\", 2)",
        result: "\"one two ONE three\""
      }
    ],
    validate: function(args) {
      if (args.length < 3 || args.length > 4) {
        return { isValid: false, error: "Substitute requires three or four arguments." };
      }
      return { isValid: true };
    }
  };

  // Sum function
  const SumRule = {
    name: "Sum",
    syntax: "Sum(table, formula)",
    description: "Calculates the sum of a table expression or a set of arguments.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Table containing the records to sum."
      },
      {
        name: "formula",
        type: "formula",
        required: true,
        description: "Formula to evaluate for each record."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "Sum(Sales, Amount)",
        result: "Sum of all values in the Amount column of the Sales table"
      },
      {
        formula: "Sum(Expenses, Cost * 1.1)",
        result: "Sum of all Cost values multiplied by 1.1 from the Expenses table"
      }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "Sum requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Switch function
  const SwitchRule = {
    name: "Switch",
    syntax: "Switch(expression, value1, result1[, value2, result2, ..., defaultResult])",
    description: "Matches with a set of values and then evaluates a corresponding formula.",
    parameters: [
      {
        name: "expression",
        type: "any",
        required: true,
        description: "Expression to evaluate and compare with values."
      },
      {
        name: "value1, result1, value2, result2, ...",
        type: "any",
        required: true,
        description: "Value to match and result to return if matching."
      },
      {
        name: "defaultResult",
        type: "any",
        required: false,
        description: "Result if no values match. If omitted and no match, returns blank."
      }
    ],
    returnType: "any",
    examples: [
      {
        formula: "Switch(Status, \"Active\", \"Green\", \"Pending\", \"Yellow\", \"Red\")",
        result: "Returns \"Green\" if Status is \"Active\", \"Yellow\" if \"Pending\", or \"Red\" otherwise"
      },
      {
        formula: "Switch(Department, \"Sales\", 1, \"Marketing\", 2, \"Engineering\", 3, 0)",
        result: "Returns department code or 0 if not matched"
      }
    ],
    validate: function(args) {
      if (args.length < 3) {
        return { isValid: false, error: "Switch requires at least three arguments." };
      }
      if ((args.length % 2) === 0) {
        return { isValid: true }; // Even number means default value is provided
      } else {
        return { isValid: true }; // Odd number means no default value
      }
    }
  };

  // Table function
  const TableRule = {
    name: "Table",
    syntax: "Table({record1}, {record2}, ...)",
    description: "Creates a temporary table.",
    parameters: [
      {
        name: "record1, record2, ...",
        type: "record",
        required: false,
        description: "Records to include in the table."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "Table({Name: \"John\", Age: 30}, {Name: \"Jane\", Age: 28})",
        result: "Table with two records containing Name and Age fields"
      },
      {
        formula: "Table({ID: 1, Product: \"Chair\"}, {ID: 2, Product: \"Table\"})",
        result: "Table with two product records"
      }
    ],
    validate: function(args) {
      return { isValid: true }; // Table can accept any number of records
    }
  };

  // Tan function
  const TanRule = {
    name: "Tan",
    syntax: "Tan(number)",
    description: "Returns the tangent of an angle specified in radians.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "Angle in radians for which to find the tangent."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "Tan(0)",
        result: "0"
      },
      {
        formula: "Tan(Pi()/4)",
        result: "1"
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Tan requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Text function
  const TextRule = {
    name: "Text",
    syntax: "Text(value[, format])",
    description: "Converts any value and formats a number or date/time value to a string of text.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to convert to text."
      },
      {
        name: "format",
        type: "text",
        required: false,
        description: "Format pattern to apply."
      }
    ],
    returnType: "text",
    examples: [
      {
        formula: "Text(Today(), \"dd-mm-yyyy\")",
        result: "Formatted date string like \"15-03-2025\""
      },
      {
        formula: "Text(1234.56, \"£#,###.00\")",
        result: "\"£1,234.56\""
      }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "Text requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // ThisItem function
  const ThisItemRule = {
    name: "ThisItem",
    syntax: "ThisItem",
    description: "Returns the record for the current item in a gallery or form control.",
    parameters: [],
    returnType: "record",
    examples: [
      {
        formula: "ThisItem.ProductName",
        result: "The ProductName value for the current record in a gallery or form"
      },
      {
        formula: "If(ThisItem.Quantity > 10, \"High\", \"Low\")",
        result: "\"High\" if the current item's Quantity is greater than 10, otherwise \"Low\""
      }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "ThisItem doesn't accept any arguments." };
      }
      return { isValid: true };
    }
  };

  // ThisRecord function
  const ThisRecordRule = {
    name: "ThisRecord",
    syntax: "ThisRecord",
    description: "Returns the record for the current item in a record scope function, such as ForAll, With, and Sum.",
    parameters: [],
    returnType: "record",
    examples: [
      {
        formula: "ForAll(Products, If(ThisRecord.Stock < 5, Patch(...)))",
        result: "Performs an operation on each product record with stock less than 5"
      },
      {
        formula: "Sum(Sales, ThisRecord.Amount * ThisRecord.TaxRate)",
        result: "Calculates the sum of amount multiplied by tax rate for each sales record"
      }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "ThisRecord doesn't accept any arguments." };
      }
      return { isValid: true };
    }
  };

  // Time function
  const TimeRule = {
    name: "Time",
    syntax: "Time(hour, minute, second)",
    description: "Returns a date/time value, based on Hour, Minute, and Second values.",
    parameters: [
      {
        name: "hour",
        type: "number",
        required: true,
        description: "Hour value (0-23)."
      },
      {
        name: "minute",
        type: "number",
        required: true,
        description: "Minute value (0-59)."
      },
      {
        name: "second",
        type: "number",
        required: true,
        description: "Second value (0-59)."
      }
    ],
    returnType: "datetime",
    examples: [
      {
        formula: "Time(14, 30, 0)",
        result: "2:30 PM on the current date"
      },
      {
        formula: "Time(9, 15, 30)",
        result: "9:15:30 AM on the current date"
      }
    ],
    validate: function(args) {
      if (args.length !== 3) {
        return { isValid: false, error: "Time requires exactly three arguments." };
      }
      return { isValid: true };
    }
  };

  // TimeValue function
  const TimeValueRule = {
    name: "TimeValue",
    syntax: "TimeValue(timeText)",
    description: "Converts a time-only string to a date/time value.",
    parameters: [
      {
        name: "timeText",
        type: "text",
        required: true,
        description: "Text representing a time."
      }
    ],
    returnType: "datetime",
    examples: [
      {
        formula: "TimeValue(\"2:30 PM\")",
        result: "2:30 PM on the current date"
      },
      {
        formula: "TimeValue(\"15:45:30\")",
        result: "3:45:30 PM on the current date"
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "TimeValue requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // TimeZoneOffset function
  const TimeZoneOffsetRule = {
    name: "TimeZoneOffset",
    syntax: "TimeZoneOffset([dateTime])",
    description: "Returns the difference between UTC and the user's local time in minutes.",
    parameters: [
      {
        name: "dateTime",
        type: "datetime",
        required: false,
        description: "Optional date/time value. If omitted, uses current date/time."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "TimeZoneOffset()",
        result: "Offset in minutes for the current date/time (e.g., 60 for UTC+1)"
      },
      {
        formula: "TimeZoneOffset(DateValue(\"2024-12-25\"))",
        result: "Offset in minutes on Christmas Day 2024"
      }
    ],
    validate: function(args) {
      if (args.length > 1) {
        return { isValid: false, error: "TimeZoneOffset accepts zero or one argument." };
      }
      return { isValid: true };
    }
  };

  // Today function
  const TodayRule = {
    name: "Today",
    syntax: "Today()",
    description: "Returns the current date-only value.",
    parameters: [],
    returnType: "date",
    examples: [
      {
        formula: "Today()",
        result: "Current date without time component"
      },
      {
        formula: "Today() + 7",
        result: "Date one week from today"
      }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "Today doesn't accept any arguments." };
      }
      return { isValid: true };
    }
  };

  // Trace function
  const TraceRule = {
    name: "Trace",
    syntax: "Trace(value, label[, traceOptions])",
    description: "Provide additional information in your test results.",
    parameters: [
      {
        name: "value",
        type: "any",
        required: true,
        description: "Value to trace and return."
      },
      {
        name: "label",
        type: "text",
        required: true,
        description: "Label to identify the trace in test results."
      },
      {
        name: "traceOptions",
        type: "record",
        required: false,
        description: "Additional options for tracing."
      }
    ],
    returnType: "any",
    examples: [
      {
        formula: "Trace(Filter(Products, Price > 100), \"Expensive Products\")",
        result: "Returns filtered products and logs them with label \"Expensive Products\""
      },
      {
        formula: "Trace(\"Process complete\", \"Status\")",
        result: "Returns \"Process complete\" and logs it with label \"Status\""
      }
    ],
    validate: function(args) {
      if (args.length < 2 || args.length > 3) {
        return { isValid: false, error: "Trace requires two or three arguments." };
      }
      return { isValid: true };
    }
  };

  // Trim function
  const TrimRule = {
    name: "Trim",
    syntax: "Trim(text)",
    description: "Removes extra spaces from the ends and interior of a string of text.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "Text to trim."
      }
    ],
    returnType: "text",
    examples: [
      {
        formula: "Trim(\"  Hello  World  \")",
        result: "\"Hello World\""
      },
      {
        formula: "Trim(\"Multiple   spaces   between   words\")",
        result: "\"Multiple spaces between words\""
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Trim requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // TrimEnds function
  const TrimEndsRule = {
    name: "TrimEnds",
    syntax: "TrimEnds(text)",
    description: "Removes extra spaces from the ends of a string of text only.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "Text to trim ends from."
      }
    ],
    returnType: "text",
    examples: [
      {
        formula: "TrimEnds(\"  Hello  World  \")",
        result: "\"Hello  World\""
      },
      {
        formula: "TrimEnds(\"  Multiple   spaces   \")",
        result: "\"Multiple   spaces\""
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "TrimEnds requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Trunc function
  const TruncRule = {
    name: "Trunc",
    syntax: "Trunc(number)",
    description: "Truncates the number to only the integer portion by removing any decimal portion.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "Number to truncate."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "Trunc(3.75)",
        result: "3"
      },
      {
        formula: "Trunc(-3.75)",
        result: "-3"
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Trunc requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Ungroup function
  const UngroupRule = {
    name: "Ungroup",
    syntax: "Ungroup(table)",
    description: "Removes a grouping.",
    parameters: [
      {
        name: "table",
        type: "table",
        required: true,
        description: "Grouped table to ungroup."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "Ungroup(GroupBy(Products, \"Category\"))",
        result: "Returns the original Products table without grouping"
      },
      {
        formula: "Ungroup(groupedTable)",
        result: "Returns ungrouped version of groupedTable"
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Ungroup requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // UniChar function
  const UniCharRule = {
    name: "UniChar",
    syntax: "UniChar(number)",
    description: "Translates a Unicode code into a string.",
    parameters: [
      {
        name: "number",
        type: "number",
        required: true,
        description: "Unicode character code."
      }
    ],
    returnType: "text",
    examples: [
      {
        formula: "UniChar(65)",
        result: "\"A\""
      },
      {
        formula: "UniChar(9786)",
        result: "\"☺\""
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "UniChar requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // Unrelate function
  const UnrelateRule = {
    name: "Unrelate",
    syntax: "Unrelate(table1, relationship, table2)",
    description: "Unrelates records of two tables from a one-to-many or many-to-many relationship.",
    parameters: [
      {
        name: "table1",
        type: "table",
        required: true,
        description: "First table in relationship."
      },
      {
        name: "relationship",
        type: "text",
        required: true,
        description: "Name of the relationship."
      },
      {
        name: "table2",
        type: "table",
        required: true,
        description: "Second table in relationship."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "Unrelate(FirstRecord(Customers), \"CustomerOrders\", FirstRecord(Orders))",
        result: "Removes the relationship between the customer and order records"
      },
      {
        formula: "Unrelate(Filter(Products, ID=123), \"ProductCategories\", Filter(Categories, ID=456))",
        result: "Removes the relationship between product 123 and category 456"
      }
    ],
    validate: function(args) {
      if (args.length !== 3) {
        return { isValid: false, error: "Unrelate requires exactly three arguments." };
      }
      return { isValid: true };
    }
  };

  // Update function
  const UpdateRule = {
    name: "Update",
    syntax: "Update(source, record, updateRecord)",
    description: "Replaces a record in a data source.",
    parameters: [
      {
        name: "source",
        type: "table",
        required: true,
        description: "Data source to update."
      },
      {
        name: "record",
        type: "record",
        required: true,
        description: "Record to update."
      },
      {
        name: "updateRecord",
        type: "record",
        required: true,
        description: "New property values for the record."
      }
    ],
    returnType: "record",
    examples: [
      {
        formula: "Update(Products, First(Filter(Products, ID=123)), {Price: 99.99})",
        result: "Updates the Price to 99.99 for the product with ID 123"
      },
      {
        formula: "Update(Employees, SelectedItem(), {Status: \"Active\", Department: \"Sales\"})",
        result: "Updates Status and Department for the selected employee"
      }
    ],
    validate: function(args) {
      if (args.length !== 3) {
        return { isValid: false, error: "Update requires exactly three arguments." };
      }
      return { isValid: true };
    }
  };

  // UpdateIf function
  const UpdateIfRule = {
    name: "UpdateIf",
    syntax: "UpdateIf(source, condition, updateRecord)",
    description: "Modifies a set of records in a data source based on a condition.",
    parameters: [
      {
        name: "source",
        type: "table",
        required: true,
        description: "Data source to update."
      },
      {
        name: "condition",
        type: "boolean",
        required: true,
        description: "Condition that identifies which records to update."
      },
      {
        name: "updateRecord",
        type: "record",
        required: true,
        description: "New property values for the matching records."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "UpdateIf(Products, Price < 10, {Category: \"Budget\"})",
        result: "Sets the Category to \"Budget\" for all products with Price less than 10"
      },
      {
        formula: "UpdateIf(Tasks, Status = \"Pending\" && DueDate < Today(), {Status: \"Overdue\"})",
        result: "Sets Status to \"Overdue\" for pending tasks with due dates in the past"
      }
    ],
    validate: function(args) {
      if (args.length !== 3) {
        return { isValid: false, error: "UpdateIf requires exactly three arguments." };
      }
      return { isValid: true };
    }
  };

  // Upper function
  const UpperRule = {
    name: "Upper",
    syntax: "Upper(text)",
    description: "Converts letters in a string of text to all uppercase.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "Text to convert to uppercase."
      }
    ],
    returnType: "text",
    examples: [
      {
        formula: "Upper(\"Hello World\")",
        result: "\"HELLO WORLD\""
      },
      {
        formula: "Upper(First(Users).Name)",
        result: "The first user's name in uppercase"
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Upper requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // UTCNow function
  const UTCNowRule = {
    name: "UTCNow",
    syntax: "UTCNow()",
    description: "Returns the current date/time value in Coordinated Universal Time (UTC).",
    parameters: [],
    returnType: "datetime",
    examples: [
      {
        formula: "UTCNow()",
        result: "Current date and time in UTC time zone"
      },
      {
        formula: "Text(UTCNow(), \"yyyy-mm-dd hh:mm:ss\")",
        result: "Formatted string of current UTC date and time"
      }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "UTCNow doesn't accept any arguments." };
      }
      return { isValid: true };
    }
  };

  // UTCToday function
  const UTCTodayRule = {
    name: "UTCToday",
    syntax: "UTCToday()",
    description: "Returns the current date-only value in Coordinated Universal Time (UTC).",
    parameters: [],
    returnType: "date",
    examples: [
      {
        formula: "UTCToday()",
        result: "Current date in UTC without time component"
      },
      {
        formula: "UTCToday() - 7",
        result: "Date one week before current UTC date"
      }
    ],
    validate: function(args) {
      if (args.length !== 0) {
        return { isValid: false, error: "UTCToday doesn't accept any arguments." };
      }
      return { isValid: true };
    }
  };

  // Validate function
  const ValidateRule = {
    name: "Validate",
    syntax: "Validate(dataSource, record[, columnName1, columnName2, ...])",
    description: "Checks whether the value of a single column or a complete record is valid for a data source.",
    parameters: [
      {
        name: "dataSource",
        type: "table",
        required: true,
        description: "Data source to validate against."
      },
      {
        name: "record",
        type: "record",
        required: true,
        description: "Record to validate."
      },
      {
        name: "columnName1, columnName2, ...",
        type: "text",
        required: false,
        description: "Names of specific columns to validate."
      }
    ],
    returnType: "table",
    examples: [
      {
        formula: "Validate(Products, editRecord)",
        result: "Returns validation errors for all fields in editRecord against Products data source"
      },
      {
        formula: "Validate(Customers, newCustomer, \"Email\", \"Phone\")",
        result: "Returns validation errors for only Email and Phone fields in newCustomer"
      }
    ],
    validate: function(args) {
      if (args.length < 2) {
        return { isValid: false, error: "Validate requires at least two arguments." };
      }
      return { isValid: true };
    }
  };

  // Value function
  const ValueRule = {
    name: "Value",
    syntax: "Value(text)",
    description: "Converts a string to a number.",
    parameters: [
      {
        name: "text",
        type: "text",
        required: true,
        description: "Text to convert to a number."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "Value(\"42\")",
        result: "42"
      },
      {
        formula: "Value(\"3.14\")",
        result: "3.14"
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Value requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

  // VarP function
  const VarPRule = {
    name: "VarP",
    syntax: "VarP(number1[, number2, ...])",
    description: "Returns the variance of its arguments.",
    parameters: [
      {
        name: "number1",
        type: "number",
        required: true,
        description: "First number in the calculation."
      },
      {
        name: "number2, ...",
        type: "number",
        required: false,
        description: "Additional numbers in the calculation."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "VarP(1, 2, 3, 4, 5)",
        result: "2"
      },
      {
        formula: "VarP(Table1.Value)",
        result: "Population variance of all values in the Value column of Table1"
      }
    ],
    validate: function(args) {
      if (args.length < 1) {
        return { isValid: false, error: "VarP requires at least one argument." };
      }
      return { isValid: true };
    }
  };

  // Weekday function
  const WeekdayRule = {
    name: "Weekday",
    syntax: "Weekday(date[, startOfWeek])",
    description: "Retrieves the weekday portion of a date/time value.",
    parameters: [
      {
        name: "date",
        type: "datetime",
        required: true,
        description: "Date/time value from which to extract the weekday."
      },
      {
        name: "startOfWeek",
        type: "number",
        required: false,
        description: "Number that determines the first day of the week (1=Sunday, 2=Monday, etc.). Default is 1."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "Weekday(DateValue(\"2025-01-15\"))",
        result: "1 (Sunday)"
      },
      {
        formula: "Weekday(DateValue(\"2025-01-15\"), 2)",
        result: "7 (where Monday is 1 and Sunday is 7)"
      }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "Weekday requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // WeekNum function
  const WeekNumRule = {
    name: "WeekNum",
    syntax: "WeekNum(date[, returnType])",
    description: "Returns the week number of a date/time value.",
    parameters: [
      {
        name: "date",
        type: "datetime",
        required: true,
        description: "Date/time value from which to extract the week number."
      },
      {
        name: "returnType",
        type: "number",
        required: false,
        description: "Number that determines the system used for numbering weeks (1=Week begins on Sunday, 2=Week begins on Monday and must contain Jan 4, etc.)."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "WeekNum(DateValue(\"2025-01-15\"))",
        result: "3 (where week 1 is the week containing January 1)"
      },
      {
        formula: "WeekNum(DateValue(\"2025-01-15\"), 2)",
        result: "2 (using ISO week numbering system)"
      }
    ],
    validate: function(args) {
      if (args.length < 1 || args.length > 2) {
        return { isValid: false, error: "WeekNum requires one or two arguments." };
      }
      return { isValid: true };
    }
  };

  // With function
  const WithRule = {
    name: "With",
    syntax: "With({name1: value1[, name2: value2, ...]}, formula)",
    description: "Calculates values and performs actions for a single record, including inline records of named values.",
    parameters: [
      {
        name: "record",
        type: "record",
        required: true,
        description: "Record containing name-value pairs to use in the formula."
      },
      {
        name: "formula",
        type: "formula",
        required: true,
        description: "Formula that uses the name-value pairs."
      }
    ],
    returnType: "any",
    examples: [
      {
        formula: "With({x: 1, y: 2}, x + y)",
        result: "3"
      },
      {
        formula: "With({discount: 0.1, tax: 0.08}, Price * (1 - discount) * (1 + tax))",
        result: "Calculated price with discount and tax applied"
      }
    ],
    validate: function(args) {
      if (args.length !== 2) {
        return { isValid: false, error: "With requires exactly two arguments." };
      }
      return { isValid: true };
    }
  };

  // Year function
  const YearRule = {
    name: "Year",
    syntax: "Year(date)",
    description: "Retrieves the year portion of a date/time value.",
    parameters: [
      {
        name: "date",
        type: "datetime",
        required: true,
        description: "Date/time value from which to extract the year."
      }
    ],
    returnType: "number",
    examples: [
      {
        formula: "Year(Today())",
        result: "Current year (e.g., 2025)"
      },
      {
        formula: "Year(DateValue(\"2025-05-15\"))",
        result: "2025"
      }
    ],
    validate: function(args) {
      if (args.length !== 1) {
        return { isValid: false, error: "Year requires exactly one argument." };
      }
      return { isValid: true };
    }
  };

    // updateContext function
    const UpdateContextRule = {
      name: "UpdateContext",
      syntax: "UpdateContext(contextUpdates)",
      description: "Updates the context variables of the current screen.",
      parameters: [
        {
          name: "contextUpdates",
          type: "record",
          required: true,
          description: "A record that contains the context variables to update and their new values."
        }
      ],
      returnType: "void",
      examples: [
        { formula: "UpdateContext({ ShowPopup: true })", result: "Sets the context variable ShowPopup to true" },
        { formula: "UpdateContext({ UserName: \"John Doe\" })", result: "Sets the context variable UserName to 'John Doe'" }
      ],
      validate: function(args) {
        if (args.length !== 1) {
          return { isValid: false, error: "UpdateContext requires exactly one argument." };
        }
        return { isValid: true };
      }
    };

    // Distinct function
    const DistinctRule = {
      name: "Distinct",
      syntax: "Distinct(source, expression)",
      description: "Returns a one-column table that contains the distinct values from the specified column.",
      parameters: [
        {
          name: "source",
          type: "table",
          required: true,
          description: "The table to search for distinct values."
        },
        {
          name: "expression",
          type: "any",
          required: true,
          description: "The column or expression to evaluate for distinct values."
        }
      ],
      returnType: "table",
      examples: [
        { formula: "Distinct(Orders, ProductName)", result: "Table of distinct product names from the Orders table" },
        { formula: "Distinct(Employees, Department)", result: "Table of distinct departments from the Employees table" }
      ],
      validate: function(args) {
        if (args.length !== 2) {
          return { isValid: false, error: "Distinct requires exactly two arguments." };
        }
        return { isValid: true };
      }
    };

    // User function
    const UserRule = {
      name: "User",
      syntax: "User()",
      description: "Returns information about the current user.",
      parameters: [],
      returnType: "record",
      examples: [
        { formula: "User().Email", result: "Returns the email address of the current user" },
        { formula: "User().FullName", result: "Returns the full name of the current user" },
        { formula: "User().Image", result: "Returns the image URL of the current user" }
      ],
      validate: function(args) {
        if (args.length !== 0) {
          return { isValid: false, error: "User does not require any arguments." };
        }
        return { isValid: true };
      }
    };

    // Export all the rules
    window.AddColumnsRule = AddColumnsRule;
    window.NotIsBlankRule = NotIsBlankRule;
    window.UserRule = UserRule;
    window.DistinctRule = DistinctRule;
    window.UpdateContextRule = UpdateContextRule;
    window.AbsRule = AbsRule;
    window.AccelerationRule = AccelerationRule;
    window.AcosRule = AcosRule;
    window.AcotRule = AcotRule;
    window.AndRule = AndRule;
    window.AsinRule = AsinRule;
    window.AssertRule = AssertRule;
    window.AsRule = AsRule;
    window.AsTypeRule = AsTypeRule;
    window.AtanRule = AtanRule;
    window.Atan2Rule = Atan2Rule;
    window.AverageRule = AverageRule;
    window.BlankRule = BlankRule;
    window.BooleanRule = BooleanRule;
    window.CalendarRule = CalendarRule;
    window.CharRule = CharRule;
    window.ChoicesRule = ChoicesRule;
    window.ClockRule = ClockRule;
    window.CoalesceRule = CoalesceRule;
    window.CollectRule = CollectRule;
    window.ColorRule = ColorRule;
    window.ColorFadeRule = ColorFadeRule;
    window.ColorValueRule = ColorValueRule;
    window.ColumnRule = ColumnRule;
    window.ColumnNamesRule = ColumnNamesRule;
    window.ConcatRule = ConcatRule;
    window.ConcatenateRule = ConcatenateRule;
    window.ConcurrentRule = ConcurrentRule;
    window.ConnectionRule = ConnectionRule;
    window.CopyRule = CopyRule;
    window.CountRule = CountRule;
    window.CosRule = CosRule;
    window.CotRule = CotRule;
    window.CountARule = CountARule;
    window.CountIfRule = CountIfRule;
    window.CountRowsRule = CountRowsRule;
    window.DataSourceInfoRule = DataSourceInfoRule;
    window.DateRule = DateRule;
    window.DateAddRule = DateAddRule;
    window.DateDiffRule = DateDiffRule;
    window.DateTimeRule = DateTimeRule;
    window.DateTimeValueRule = DateTimeValueRule;
    window.DateValueRule = DateValueRule;
    window.DayRule = DayRule;
    window.Dec2HexRule = Dec2HexRule;
    window.DefaultsRule = DefaultsRule;
    window.DegreesRule = DegreesRule;
    window.DisableRule = DisableRule;
    window.DownloadRule = DownloadRule;
    window.DropColumnsRule = DropColumnsRule;
    window.EDateRule = EDateRule;
    window.EncodeHtmlRule = EncodeHtmlRule;
    window.EncodeUrlRule = EncodeUrlRule;
    window.EndsWithRule = EndsWithRule;
    window.EOMonthRule = EOMonthRule;
    window.ErrorRule = ErrorRule;
    window.ErrorsRule = ErrorsRule;
    window.ExactInRule = ExactInRule;
    window.ExpRule = ExpRule;
    window.FilterRule = FilterRule;
    window.FindRule = FindRule;
    window.FirstRule = FirstRule;
    window.FirstNRule = FirstNRule;
    window.ForAllRule = ForAllRule;
    window.GroupByRule = GroupByRule;
    window.GUIDRule = GUIDRule;
    window.HashTagsRule = HashTagsRule;
    window.Hex2DecRule = Hex2DecRule;
    window.HostRule = HostRule;
    window.IfRule = IfRule;
    window.IfErrorRule = IfErrorRule;
    window.InRule = InRule;
    window.IndexRule = IndexRule;
    window.IntRule = IntRule;
    window.IsBlankRule = IsBlankRule;
    window.IsBlankOrErrorRule = IsBlankOrErrorRule;
    window.IsEmptyRule = IsEmptyRule;
    window.IsErrorRule = IsErrorRule;
    window.IsMatchRule = IsMatchRule;
    window.IsNumericRule = IsNumericRule;
    window.ISOWeekNumRule = ISOWeekNumRule;
    window.IsTodayRule = IsTodayRule;
    window.IsTypeRule = IsTypeRule;
    window.IsUTCTodayRule = IsUTCTodayRule;
    window.JSONRule = JSONRule;
    window.LastRule = LastRule;
    window.LastNRule = LastNRule;
    window.LeftRule = LeftRule;
    window.LenRule = LenRule;
    window.LnRule = LnRule;
    window.LocationRule = LocationRule;
    window.LogRule = LogRule;
    window.LookUpRule = LookUpRule;
    window.LowerRule = LowerRule;
    window.MatchRule = MatchRule;
    window.MatchAllRule = MatchAllRule;
    window.MaxRule = MaxRule;
    window.MidRule = MidRule;
    window.MinuteRule = MinuteRule;
    window.ModRule = ModRule;
    window.MonthRule = MonthRule;
    window.NavigateRule = NavigateRule;
    window.NotRule = NotRule;
    window.NotifyRule = NotifyRule;
    window.ParentRule = ParentRule;
    window.ParseJSONRule = ParseJSONRule;
    window.PatchRule = PatchRule;
    window.PDFRule = PDFRule;
    window.PiRule = PiRule;
    window.PlainTextRule = PlainTextRule;
    window.PowerRule = PowerRule;
    window.ProperRule = ProperRule;
    window.RadiansRule = RadiansRule;
    window.RandRule = RandRule;
    window.RandBetweenRule = RandBetweenRule;
    window.ThisRecordRule = RecordInfoRule;
    window.RefreshRule = RefreshRule;
    window.RelateRule = RelateRule;
    window.RemoveRule = RemoveRule;
    window.RemoveIfRule = RemoveIfRule;
    window.RenameColumnsRule = RenameColumnsRule;
    window.ReplaceRule = ReplaceRule;
    window.ResetRule = ResetRule;
    window.SetRule = SetRule;
    window.RGBARule = RGBARule;
    window.RightRule = RightRule;
    window.RoundRule = RoundRule;
    window.RoundDownRule = RoundDownRule;
    window.RoundUpRule = RoundUpRule;
    window.SearchRule = SearchRule;
    window.SecondRule = SecondRule;
    window.SelectRule = SelectRule;
    window.SelfRule = SelfRule;
    window.SequenceRule = SequenceRule;
    window.SetFocusRule = SetFocusRule;
    window.SetPropertyRule = SetPropertyRule;
    window.ShowColumnsRule = ShowColumnsRule;
    window.ShuffleRule = ShuffleRule;
    window.SinRule = SinRule;
    window.SortRule = SortRule;
    window.SortByColumnsRule = SortByColumnsRule;
    window.SplitRule = SplitRule;
    window.SqrtRule = SqrtRule;
    window.StartsWithRule = StartsWithRule;
    window.StdevPRule = StdevPRule;
    window.SubstituteRule = SubstituteRule;
    window.SumRule = SumRule;
    window.SwitchRule = SwitchRule;
    window.TableRule = TableRule;
    window.TanRule = TanRule;
    window.TextRule = TextRule;
    window.ThisItemRule = ThisItemRule;
    window.ThisRecordRule = ThisRecordRule;
    window.TimeRule = TimeRule;
    window.TimeValueRule = TimeValueRule;
    window.TimeZoneOffsetRule = TimeZoneOffsetRule;
    window.TodayRule = TodayRule;
    window.TraceRule = TraceRule;
    window.TrimRule = TrimRule;
    window.TrimEndsRule = TrimEndsRule;
    window.TruncRule = TruncRule;
    window.UngroupRule = UngroupRule;
    window.UniCharRule = UniCharRule;
    window.UnrelateRule = UnrelateRule;
    window.UpdateRule = UpdateRule;
    window.UpdateIfRule = UpdateIfRule;
    window.UpperRule = UpperRule;
    window.UTCNowRule = UTCNowRule;
    window.UTCTodayRule = UTCTodayRule;
    window.ValidateRule = ValidateRule;
    window.ValueRule = ValueRule;
    window.VarPRule = VarPRule;
    window.WeekdayRule = WeekdayRule;
    window.WeekNumRule = WeekNumRule;
    window.WithRule = WithRule;
    window.YearRule = YearRule;

    // Operator Exports
    window.ConcatenationOperatorRule = ConcatenationOperatorRule;
    window.AsOperatorRule = AsOperatorRule;
    window.ColonOperatorRule = ColonOperatorRule;
    window.CommaOperatorRule = CommaOperatorRule;
    window.SemicolonOperatorRule = SemicolonOperatorRule;
    window.SquareBracketsOperatorRule = SquareBracketsOperatorRule;
    window.CurlyBracesOperatorRule - CurlyBracesOperatorRule;
    window.DotOperatorRule = DotOperatorRule;
    window.ParenthesesOperatorRule = ParenthesesOperatorRule;
    window.IndexOperatorRule = IndexOperatorRule;
    window.UnaryMinusOperatorRule = UnaryMinusOperatorRule;
    window.PercentOperatorRule = PercentOperatorRule;
    window.SelfOperatorRule = SelfOperatorRule;
    window.ThisItemOperatorRule = ThisItemOperatorRule;
    window.DefaultDateOperatorRule = DefaultDateOperatorRule;
    window.ChainOperatorRule = ChainOperatorRule;
    window.MethodCallOperatorRule = MethodCallOperatorRule;
    window.ConditionalOperatorRule = ConditionalOperatorRule;
    window.AdditionOperatorRule = AdditionOperatorRule;
    window.SubtractionOperatorRule = SubtractionOperatorRule;
    window.MultiplicationOperatorRule = MultiplicationOperatorRule;
    window.DivisionOperatorRule = DivisionOperatorRule;
    window.PowerOperatorRule = PowerOperatorRule;
    window.EqualOperatorRule = EqualOperatorRule;
    window.GreaterThanOperatorRule = GreaterThanOperatorRule;
    window.GreaterThanOrEqualOperatorRule = GreaterThanOrEqualOperatorRule;
    window.LessThanOperatorRule = LessThanOperatorRule;
    window.LessThanOrEqualOperatorRule = LessThanOrEqualOperatorRule;
    window.AndOperatorRule = AndOperatorRule;
    window.OrOperatorRule = OrOperatorRule;
    window.NotEqualOperatorRule = NotEqualOperatorRule;
    window.ParentAccessOperatorRule = ParentAccessOperatorRule;
    window.SelfOperatorRule = SelfOperatorRule;
    window.SelfReferenceOperatorRule = SelfReferenceOperatorRule;
    window.InOperatorRule = InOperatorRule;
    window.ExactInOperatorRule = ExactInOperatorRule;
    window.AtOperatorRule = AtOperatorRule;
    window.NotOperatorRule = NotOperatorRule;


    // Helper function to validate function calls
    function validateFunctionCall(functionName, args) {
        const ruleName = functionName + 'Rule';
        const rule = window[ruleName];

        if (!rule) {
            return {
                isValid: false,
                error: `Unknown function: ${functionName}`
            };
        }

        return rule.validate(args);
    }

    // Export the helper function
    window.validateFunctionCall = validateFunctionCall;



