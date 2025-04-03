const ButtonControl = {
    name: "Button",
    description: "A control that users can select to trigger an action.",
    examples: [
        {
          formula: "Button1.OnSelect = Navigate(Screen1)",
          description: "Navigate to Screen1 when Button1 is clicked"
        },
        {
          formula: "Button1.OnSelect = Collect(MyCollection, {Name: TextInput1.Text, Date: Today()})",
          description: "Add new record to a collection when Button1 is clicked"
        },
        {
          formula: "Button1.Fill = If(IsBlank(TextInput1.Text), RGBA(233, 233, 233, 1), RGBA(0, 201, 117, 1))",
          description: "Change button colour based on text input value"
        },
    ],

    properties: {
      Text: { type: "string", description: "The text that appears on the button." },
      OnSelect: { type: "function", description: "How the app responds when the user selects the control." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const TextInputControl = {
    name: "Text input",
    description: "A control into which users can enter and edit text.",
    examples: [
        {
          formula: "TextInput1.Default = \"Enter your name\"",
          description: "Set default text in a text input"
        },
        {
          formula: "TextInput1.OnChange = UpdateContext({userName: TextInput1.Text})",
          description: "Store input value in a variable when text changes"
        },
        {
          formula: "TextInput1.BorderColor = If(IsBlank(TextInput1.Text), Red, Green)",
          description: "Change border colour based on whether input is empty"

        },
    ],
    properties: {
      Default: { type: "string", description: "The initial value for the control before the user changes it." },
      Text: { type: "string", description: "The text that appears in the control." },
      HintText: { type: "string", description: "Placeholder text shown when the input is empty." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      OnChange: { type: "function", description: "How the app responds when the user changes the value." },
      FontSize: { type: "number", description: "The font size of the text that appears in the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." },
      Mode: { type: "enum", options: ["SingleLine", "MultiLine", "Password"], description: "Whether the control accepts single line, multiple lines, or password text." }
    }
  };

  const LabelControl = {
    name: "Label",
    description: "A control that shows data but doesn't accept user input.",
    examples: [
    {
        formula: "Label1.Text = \"Hello, \" & UserName",
        description: "Display personalized greeting"
    },
    {
        formula: "Label1.Color = If(varStatus = \"Error\", Red, Black)",
        description: "Change text colour based on status variable"
    },
    {
        formula: "Label1.Text = Text(Now(), \"[$-en-US]dddd, mmmm d, yyyy h:mm AM/PM\")",
        description: "Display current date and time in a formatted manner"
    },
],

    properties: {
      Text: { type: "string", description: "Text that appears on a control or that the user types into a control." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Align: { type: "enum", options: ["Left", "Center", "Right", "Justify"], description: "The horizontal alignment of text." },
      VerticalAlign: { type: "enum", options: ["Top", "Middle", "Bottom"], description: "The vertical alignment of text." },
      FontSize: { type: "number", description: "The font size of the text that appears in the control." },
      FontWeight: { type: "enum", options: ["Normal", "Semibold", "Bold"], description: "The weight of the text." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." },
      Overflow: { type: "enum", options: ["Hidden", "Scroll"], description: "Whether text that extends beyond the control's boundaries appears truncated or scrollable." }
    }
  };

  const GalleryControl = {
    name: "Gallery",
    description: "A control that contains other controls and shows a set of data.",
    examples: [
    {

          formula: "Gallery1.Items = Filter(Customers, StartsWith(Name, TextInput1.Text))",
          description: "Filter gallery items based on text input"
    },
    {
          formula: "Gallery1.OnSelect = Navigate(DetailScreen, None, {CustomerID: Gallery1.Selected.ID})",
         description: "Navigate to detail screen with selected item ID"
    },
    {
          formula: "Gallery1.TemplateFill = If(ThisItem.IsActive, RGBA(240, 240, 240, 1), RGBA(220, 220, 220, 1))",
          description: "Change template background colour based on item status"
    },
],
    properties: {
      Items: { type: "table", description: "The source of data that appears in a control." },
      TemplateFill: { type: "colour", description: "The background colour of a control instance." },
      TemplateSize: { type: "number", description: "The size in pixels of each template." },
      OnSelect: { type: "function", description: "How the app responds when the user taps or clicks a control." },
      Layout: { type: "enum", options: ["Horizontal", "Vertical"], description: "Whether the gallery scrolls horizontally or vertically." },
      SelectedItems: { type: "record", description: "The selected item or items in a gallery or listbox." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." },
      Transition: { type: "enum", options: ["None", "Push", "Pop", "UnCoverRight"], description: "The visual effect when the user navigates to another screen." }
    }
  };

  const DataTableControl = {
    name: "Data Table",
    description: "A control to display and select records from tabular data.",
    examples: [
        {
          formula: "DataTable1.Items = SortByColumns(Filter(Employees, JobTitle = \"Manager\"), \"HireDate\", Descending)",
          description: "Filter and sort data in a data table"
        },
        {
          formula: "DataTable1.OnSelect = Select(Form1, DataTable1.SelectedItems.First())",
          description: "Select a form record based on data table selection"
        },
        {
          formula: "DataTable1.Visible = !IsBlank(Gallery1.Selected)",
          description: "Show data table only when an item is selected in a gallery"
        },
    ],
    properties: {
      Items: { type: "table", description: "The source of data that appears in the control." },
      Columns: { type: "table", description: "The columns to display in the table." },
      SelectedItems: { type: "record", description: "The selected rows in the table." },
      OnSelect: { type: "function", description: "How the app responds when the user selects a row." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      HeaderColor: { type: "colour", description: "The background colour of the header row." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const DropdownControl = {
    name: "Dropdown",
    description: "A control that provides a list of options for users to select from.",
    examples: [
        {
          formula: "Dropdown1.Items = Distinct(Customers, Country)",
          description: "Populate dropdown with unique country values"
        },
        {
          formula: "Dropdown1.OnChange = UpdateContext({selectedCountry: Dropdown1.Selected.Value})",
          description: "Store selected value in a variable when selection changes"
        },
        {
          formula: "Dropdown1.Default = First(Filter(Dropdown1.Items, Value = varDefaultCountry))",
          description: "Set default value based on a variable",
        },
    ],
    properties: {
      Items: { type: "table", description: "The source of data that appears in a control." },
      Selected: { type: "record", description: "The selected item or items in a gallery or listbox." },
      Default: { type: "string", description: "The initial value for the control before the user changes it." },
      DisplayFields: { type: "array", description: "The fields to display for each item." },
      OnChange: { type: "function", description: "How the app responds when the user changes the value." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const ToggleControl = {
    name: "Toggle",
    description: "A control that users can turn on or off.",
    examples: [
        {
          formula: "Toggle1.OnCheck = UpdateContext({darkMode: true})",
          description: "Update a variable when toggle is checked"
        },
        {
          formula: "Toggle1.OnUncheck = Set(varNotifications, false)",
          description: "Set a variable when toggle is unchecked"
        },
        {
          formula: "Toggle1.Default = User().IsAdmin",
          description: "Set default state based on user role"
        },
    ],
    properties: {
      Default: { type: "boolean", description: "The initial value for the control before the user changes it." },
      Value: { type: "boolean", description: "A value that represents whether the toggle is on or off." },
      OnText: { type: "string", description: "Text that appears when the toggle is on." },
      OffText: { type: "string", description: "Text that appears when the toggle is off." },
      OnChange: { type: "function", description: "How the app responds when the user changes the value." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const ImageControl = {
    name: "Image",
    description: "A control that shows an image from a local source or a data source.",
    properties: {
      Image: { type: "image", description: "The image that appears in an image, media, or camera control." },
      ImagePosition: { type: "enum", options: ["Fill", "Fit", "Stretch", "Tile", "Center"], description: "How an image fits in its control." },
      OnSelect: { type: "function", description: "How the app responds when the user taps or clicks a control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      BorderStyle: { type: "enum", options: ["None", "Solid", "Dashed", "Dotted"], description: "The style of the control's border." },
      BorderThickness: { type: "number", description: "The thickness of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };
  const FormControl = {
    name: "Form",
    description: "A control that shows and manages data from a data source.",
    examples: [
        {
          formula: "Form1.Item = LookUp(Customers, ID = varSelectedCustomerID)",
          description: "Load a specific record into a form"
        },
        {
          formula: "Form1.OnSuccess = Navigate(BrowseScreen, ScreenTransition.Cover)",
          description: "Navigate to a different screen on successful submission"
        },
        {
          formula: "Form1.Visible = !IsBlank(Gallery1.Selected)",
          description: "Show form only when an item is selected in a gallery"
        },
    ],
    properties: {
      DataSource: { type: "table", description: "The source of data for the form." },
      Item: { type: "record", description: "The record that appears in a form." },
      Mode: { type: "enum", options: ["New", "Edit", "View"], description: "Whether the user can edit the data in the form." },
      OnSuccess: { type: "function", description: "How the app responds when data is successfully submitted." },
      OnFailure: { type: "function", description: "How the app responds when data fails to be submitted." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const CanvasControl = {
    name: "Canvas",
    description: "The main container in which screens and controls appear.",
    examples: [
        {
          formula: "App.OnStart = ClearCollect(GlobalVariables, {Theme: \"Light\", UserRole: \"Admin\"})",
          description: "Initialize variables when app starts"
        },
        {
          formula: "Screen1.Fill = If(varDarkMode, RGBA(32, 32, 32, 1), RGBA(250, 250, 250, 1))",
          description: "Set screen background based on theme mode"
        },
        {
          formula: "Screen1.OnVisible = Reset(Form1); Set(varSelectedCustomerID, Blank())",
          description: "Reset form and variable when screen becomes visible"
        },
    ],
    properties: {
      OnStart: { type: "function", description: "How the app responds when the user opens the app." },
      Fill: { type: "colour", description: "The background colour of the canvas." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      LoadingSpinnerColor: { type: "colour", description: "The colour of the loading spinner that appears while the app loads." },
      ImagePosition: { type: "enum", options: ["Fill", "Fit", "Stretch", "Tile", "Center"], description: "How an background image fits in the canvas." },
      OnVisible: { type: "function", description: "How the app responds when the screen is displayed." }
    }
  };

  const DatePickerControl = {
    name: "Date Picker",
    description: "A control that lets users select a date.",
    examples: [
        {
          formula: "DatePicker1.DefaultDate = Today() + 7",
          description: "Set default date to one week from today"
        },
        {
          formula: "DatePicker1.OnSelect = UpdateContext({selectedDate: DatePicker1.SelectedDate})",
          description: "Store selected date in a variable"
        },
        {
          formula: "DatePicker1.DisplayMode = If(IsBlank(TextInput1.Text), DisplayMode.Disabled, DisplayMode.Edit)",
          description: "Enable date picker only when text input has value"
        },
    ],
    properties: {
      DefaultDate: { type: "date", description: "The initial value for the control before the user changes it." },
      SelectedDate: { type: "date", description: "The selected date in a date picker control." },
      Format: { type: "string", description: "The format in which to display or input the date." },
      OnSelect: { type: "function", description: "How the app responds when the user selects a date." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const TimerControl = {
    name: "Timer",
    description: "A control that counts up or down.",
    examples: [
        {
          formula: "Timer1.Start = true",
          description: "Start the timer"
        },
        {
          formula: "Timer1.OnTimerEnd = Notify(\"Time's up!\")",
          description: "Show notification when timer ends"
        },
        {
          formula: "Timer1.Duration = Value(TextInput1.Text) * 1000",
          description: "Set timer duration based on text input (in seconds)"
        },
    ],
    properties: {
      Duration: { type: "number", description: "The amount of time to count up or down." },
      Start: { type: "boolean", description: "Whether a timer control starts counting." },
      OnSelect: { type: "function", description: "How the app responds when the user selects a control." },
      OnTimerEnd: { type: "function", description: "How the app responds when a timer finishes counting." },
      Repeat: { type: "boolean", description: "Whether a timer automatically restarts when it finishes counting." },
      Autostart: { type: "boolean", description: "Whether a timer automatically starts when the screen is displayed." },
      Text: { type: "string", description: "The text that appears in the control." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const PDFViewerControl = {
    name: "PDF Viewer",
    description: "A control that displays PDF documents.",
    examples: [
        {
          formula: "PDFViewer1.Document = PDF_Dataverse.Document",
          description: "Display a PDF document from Dataverse"
        },
        {
          formula: "PDFViewer1.StartPage = Value(TextInput1.Text)",
          description: "Go to a specific page based on text input"
        },
        {
          formula: "PDFViewer1.Visible = !IsBlank(Gallery1.Selected.DocumentID)",
          description: "Show PDF viewer only when a document is selected"
        },
    ],
    properties: {
      Document: { type: "file", description: "The PDF document to display." },
      StartPage: { type: "number", description: "The page to start showing the document." },
      Zoom: { type: "number", description: "The zoom level of the document." },
      PageNumber: { type: "number", description: "The current page number being viewed." },
      ShowControls: { type: "boolean", description: "Whether to show page controls." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const RichTextEditorControl = {
    name: "Rich Text Editor",
    description: "A control that lets users format text with styles, links, and images.",
    examples: [
        {
          formula: "RichTextEditor1.DefaultText = \"<h1>Welcome</h1><p>Enter your notes here.</p>\"",
          description: "Set default HTML content"
        },
        {
          formula: "RichTextEditor1.OnChange = Patch(Notes, LookUp(Notes, ID = varNoteID), {Content: RichTextEditor1.HtmlText})",
          description: "Save content to a data source when it changes"
        },
        {
          formula: "RichTextEditor1.DisplayMode = If(User().IsAdmin, DisplayMode.Edit, DisplayMode.View)",
          description: "Allow editing only for admin users"
        },
    ],
    properties: {
      HtmlText: { type: "string", description: "The HTML content in the rich text editor." },
      OnChange: { type: "function", description: "How the app responds when the user changes the content." },
      DefaultText: { type: "string", description: "The initial text in the editor before the user makes changes." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Fill: { type: "colour", description: "The background colour of the control." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const ComboBoxControl = {
    name: "Combo Box",
    description: "A control that combines a dropdown list with text input capabilities.",
    examples: [
        {
          formula: "ComboBox1.Items = Search(Products, ComboBox1.SearchText, \"Name\")",
          description: "Filter items based on search text"
        },
        {
          formula: "ComboBox1.OnSelect = Collect(SelectedProducts, ComboBox1.SelectedItems)",
          description: "Add selected items to a collection"
        },
        {
          formula: "ComboBox1.DefaultSelectedItems = Filter(Products, Featured = true)",
          description: "Pre-select featured products"
        },
    ],
    properties: {
      Items: { type: "table", description: "The source of data that appears in a control." },
      DefaultSelectedItems: { type: "table", description: "The default selection before user interaction." },
      SelectMultiple: { type: "boolean", description: "Whether a user can select more than one item." },
      SelectedItems: { type: "table", description: "The selected item or items in the combo box." },
      SearchItems: { type: "table", description: "The items that match the search text." },
      OnChange: { type: "function", description: "How the app responds when the user changes the value." },
      OnSelect: { type: "function", description: "How the app responds when the user selects an item." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const ChartControl = {
    name: "Chart",
    description: "A control that graphically displays data series.",
    examples: [
        {
          formula: "Chart1.Items = AddColumns(GroupBy(Sales, \"Category\", \"Category\"), \"Total\", Sum(ThisRecord.Value))",
          description: "Group and aggregate data for chart display"
        },
        {

          formula: "Chart1.OnSelect = Navigate(DetailScreen, None, {Category: Chart1.SelectedItems.First().Category})",
          description: "Navigate to details screen when a chart element is selected"
        },
        {

          formula: "Chart1.Series = Table({Series: \"2023 Sales\", Value: varSales2023}, {Series: \"2024 Sales\", Value: varSales2024})",
          description: "Display multiple data series in a chart"
        },
    ],
    properties: {
      Items: { type: "table", description: "The source of data that appears in the chart." },
      ChartType: { type: "enum", options: ["Column", "Line", "Pie", "Bar", "Area"], description: "The type of chart to display." },
      XAxisTitle: { type: "string", description: "The title text for the X-axis." },
      YAxisTitle: { type: "string", description: "The title text for the Y-axis." },
      XAxis: { type: "string", description: "The data field to use for the X-axis values." },
      YAxis: { type: "string", description: "The data field to use for the Y-axis values." },
      Series: { type: "table", description: "The data series to display on the chart." },
      Legend: { type: "enum", options: ["Auto", "Top", "Bottom", "Left", "Right", "None"], description: "Whether and where to show the legend." },
      LegendPosition: { type: "enum", options: ["Left", "Top", "Right", "Bottom"], description: "Where to position the legend." },
      OnSelect: { type: "function", description: "How the app responds when the user selects a data point." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const CameraControl = {
    name: "Camera",
    description: "A control that captures photos using the device's camera.",
    examples: [
        {
          formula: "Camera1.OnSelect = Collect(Photos, {Photo: Camera1.Photo, Timestamp: Now()})",
          description: "Save captured photo to a collection"
        },
        {
          formula: "Camera1.Camera = If(varUseFrontCamera, Camera.Front, Camera.Back)",
          description: "Switch between front and back cameras based on variable"
        },
        {
          formula: "Camera1.Stream = !IsBlank(Gallery1.Selected)",
          description: "Start camera stream when an item is selected"
        },
    ],
    properties: {
      Stream: { type: "boolean", description: "Whether the camera shows a preview." },
      Photo: { type: "image", description: "The captured photo." },
      OnSelect: { type: "function", description: "How the app responds when the user takes a photo." },
      Rate: { type: "number", description: "The rate in milliseconds at which the control captures images." },
      Camera: { type: "enum", options: ["Front", "Back"], description: "Which camera to use on a device with multiple cameras." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const BarcodeScannerControl = {
    name: "Barcode Scanner",
    description: "A control that scans barcodes using the device's camera.",
    examples: [
        {
          formula: "BarcodeScanner1.OnScan = Patch(Inventory, Defaults(Inventory), {ItemID: BarcodeScanner1.Value})",
          description: "Save scanned barcode to inventory"
        },
        {
          formula: "BarcodeScanner1.BarcodeType = BarcodeType.Any",
          description: "Accept any type of barcode"
        },
        {
          formula: "BarcodeScanner1.DisplayMode = If(Connection.Connected, DisplayMode.Edit, DisplayMode.Disabled)",
          description: "Disable scanner when offline"
        },
    ],
    properties: {
      BarcodeType: { type: "enum", options: ["Any", "QR", "Code39", "Code128", "EAN"], description: "The type of barcode to scan." },
      ScanRate: { type: "number", description: "The rate at which to scan for barcodes." },
      Value: { type: "string", description: "The value of the last scanned barcode." },
      OnScan: { type: "function", description: "How the app responds when a barcode is scanned." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const SliderControl = {
    name: "Slider",
    description: "A control that allows users to select a value from a range by dragging a handle.",
    examples: [
        {
          formula: "Slider1.OnChange = UpdateContext({brightness: Slider1.Value / 100})",
          description: "Update brightness variable as slider value changes"
        },
        {
          formula: "Slider1.Max = 10 ^ Dropdown1.Selected.Value",
          description: "Set maximum value based on dropdown selection"
        },
        {
          formula: "Slider1.Value = LookUp(Settings, User = User().Email).DefaultVolume",
          description: "Initialize slider with user's saved setting"
        },
    ],
    properties: {
      Min: { type: "number", description: "The minimum value that a slider or rating can generate." },
      Max: { type: "number", description: "The maximum value that a slider or rating can generate." },
      Value: { type: "number", description: "The value of a slider or rating." },
      Default: { type: "number", description: "The initial value of the control before the user interacts with it." },
      Step: { type: "number", description: "The increment between values on a slider." },
      ValueHidden: { type: "boolean", description: "Whether the value is displayed." },
      OnChange: { type: "function", description: "How the app responds when the user changes the value." },
      Fill: { type: "colour", description: "The background colour of the control." },
      HandleFill: { type: "colour", description: "The colour of the slider's handle." },
      RailFill: { type: "colour", description: "The colour of the slider's rail." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const CheckBoxControl = {
    name: "Check Box",
    description: "A control that the user can select or clear.",
    examples: [
        {
          formula: "CheckBox1.OnCheck = UpdateContext({acceptTerms: true})",
          description: "Update context variable when checkbox is checked"
        },
        {
          formula: "CheckBox1.OnUncheck = Set(varSelectedItems, RemoveIf(varSelectedItems, ID = ThisItem.ID))",
          description: "Remove item from collection when unchecked"
        },
        {
          formula: "CheckBox1.Default = LookUp(UserPreferences, UserEmail = User().Email).ReceiveNotifications",
          description: "Set default state based on user preferences"
        },
    ],
    properties: {
      Default: { type: "boolean", description: "The initial value before the user changes it." },
      Value: { type: "boolean", description: "Whether a checkbox or toggle is selected." },
      Text: { type: "string", description: "Text that appears on the control." },
      OnCheck: { type: "function", description: "How the app responds when a value changes to true." },
      OnUncheck: { type: "function", description: "How the app responds when a value changes to false." },
      CheckboxSize: { type: "number", description: "The size of the checkbox." },
      CheckmarkFill: { type: "colour", description: "The colour of the checkmark." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const IconControl = {
    name: "Icon",
    description: "A control that shows a graphical symbol.",
    examples: [
        {
          formula: "Icon1.OnSelect = Navigate(HomeScreen)",
          description: "Navigate to home screen when icon is clicked"
        },
        {
          formula: "Icon1.Color = If(IsError(DataSource), Red, Green)",
          description: "Change icon colour based on data source status"
        },
        {
          formula: "Icon1.Icon = If(varIsFavorite, Icon.Favorite, Icon.FavoriteBorder)",
          description: "Change icon based on favourite status"
        },
    ],
    properties: {
      Icon: { type: "enum", description: "The icon to display in the control." },
      Color: { type: "colour", description: "The colour of the icon." },
      Fill: { type: "colour", description: "The background colour of the control." },
      OnSelect: { type: "function", description: "How the app responds when the user selects the control." },
      PaddingBottom: { type: "number", description: "The distance between the bottom edge of a control and the content within it." },
      PaddingLeft: { type: "number", description: "The distance between the left edge of a control and the content within it." },
      PaddingRight: { type: "number", description: "The distance between the right edge of a control and the content within it." },
      PaddingTop: { type: "number", description: "The distance between the top edge of a control and the content within it." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const PenInputControl = {
    name: "Pen Input",
    description: "A control in which users can draw or write with a pen or finger.",
    examples: [
        {
          formula: "PenInput1.OnSelect = Patch(Signatures, Defaults(Signatures), {SignatureImage: PenInput1.Image})",
          description: "Save signature to a data source"
        },
        {
          formula: "PenInput1.Reset = true",
          description: "Clear the pen input"
        },
        {
          formula: "PenInput1.Color = ColorValue(Dropdown1.Selected.Value)",
          description: "Change pen colour based on dropdown selection"
        },
    ],
    properties: {
      Image: { type: "image", description: "The image captured from the pen input." },
      OnSelect: { type: "function", description: "How the app responds when the user selects the control." },
      Reset: { type: "boolean", description: "Whether to clear the pen input." },
      ShowControls: { type: "boolean", description: "Whether to show the clear and save buttons." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of the pen." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Thickness: { type: "number", description: "The thickness of the pen stroke." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const HTMLTextControl = {
    name: "HTML Text",
    description: "A control that displays HTML content.",
    examples: [
        {
          formula: "HTMLText1.HtmlText = \"<h2>\" & ThisItem.Title & \"</h2><p>\" & ThisItem.Description & \"</p>\"",
          description: "Format content with HTML tags"
        },
        {
          formula: "HTMLText1.HtmlText = EncodeHtml(RichTextEditor1.HtmlText)",
          description: "Display HTML-encoded content from a rich text editor"
        },
        {
          formula: "HTMLText1.PaddingTop = 10",
          description: "Add padding to the top of HTML text control"
        },
    ],
    properties: {
      HtmlText: { type: "string", description: "The HTML content to display." },
      PaddingBottom: { type: "number", description: "The distance between the bottom edge of a control and the content within it." },
      PaddingLeft: { type: "number", description: "The distance between the left edge of a control and the content within it." },
      PaddingRight: { type: "number", description: "The distance between the right edge of a control and the content within it." },
      PaddingTop: { type: "number", description: "The distance between the top edge of a control and the content within it." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };
  const RatingControl = {
    name: "Rating",
    description: "A control that shows a star rating.",
    examples: [
        {
          formula: "Rating1.OnSelect = Patch(Products, LookUp(Products, ID = Gallery1.Selected.ID), {UserRating: Rating1.Value})",
          description: "Save rating to a product record"
        },
        {
          formula: "Rating1.Value = Average(Filter(Ratings, ProductID = Gallery1.Selected.ID).Value)",
          description: "Show average rating for selected product"
        },
        {
          formula: "Rating1.RatingFill = If(Rating1.Value >= 4, Green, If(Rating1.Value >= 2, Orange, Red))",
          description: "Change rating colour based on value"
        },
    ],
    properties: {
      Default: { type: "number", description: "The initial value before the user changes it." },
      Value: { type: "number", description: "The current rating value." },
      Max: { type: "number", description: "The maximum possible rating." },
      OnSelect: { type: "function", description: "How the app responds when the user selects a rating." },
      RatingFill: { type: "colour", description: "The colour of selected rating symbols." },
      Color: { type: "colour", description: "The colour of unselected rating symbols." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const VideoControl = {
    name: "Video",
    description: "A control that plays video.",
    examples: [
        {
          formula: "Video1.OnEnd = Set(varVideoComplete, true)",
          description: "Set variable when video finishes playing"
        },
        {
          formula: "Video1.Media = LookUp(Videos, ID = Gallery1.Selected.VideoID).VideoFile",
          description: "Play video based on gallery selection"
        },
        {
          formula: "Video1.Start = Button1.IsPressed",
          description: "Start video when button is pressed"
        },
    ],
    properties: {
      Media: { type: "video", description: "The video to play." },
      Start: { type: "boolean", description: "Whether the video starts playing." },
      Loop: { type: "boolean", description: "Whether the video automatically restarts after it finishes playing." },
      OnEnd: { type: "function", description: "How the app responds when the video finishes playing." },
      AutoPause: { type: "boolean", description: "Whether the video automatically pauses when the user navigates to a different screen." },
      AutoStart: { type: "boolean", description: "Whether the video automatically starts playing when the screen is displayed." },
      Position: { type: "number", description: "The current position of the video in milliseconds." },
      ShowControls: { type: "boolean", description: "Whether playback controls appear for the video." },
      Image: { type: "image", description: "The still image to show until the video starts playing." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };
  const AddressInputControl = {
    name: "Address Input",
    description: "A control that allows users to search for and select addresses.",
    examples: [
        {
          formula: "AddressInput1.OnSelect = Patch(Customers, LookUp(Customers, ID = varCustomerID), {Address: AddressInput1.AddressValue})",
          description: "Save selected address to customer record"
        },
        {
          formula: "AddressInput1.DefaultAddressLookup = LookUp(Customers, ID = varCustomerID).Address",
          description: "Load customer's address as default"
        },
        {
          formula: "AddressInput1.Reset = Button1.IsPressed",
          description: "Reset address input when button is pressed"
        },
    ],
    properties: {
      AddressValue: { type: "record", description: "The full address record selected by the user." },
      DefaultAddressLookup: { type: "record", description: "The initial address before the user makes a selection." },
      AddressField: { type: "string", description: "The formatted address string." },
      PlaceholderText: { type: "string", description: "Text that appears when no address is entered." },
      Reset: { type: "boolean", description: "Whether to clear the current value." },
      OnReset: { type: "function", description: "How the app responds when the input is cleared." },
      OnSelect: { type: "function", description: "How the app responds when an address is selected." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const AudioControl = {
    name: "Audio",
    description: "A control that plays audio files.",
    examples: [
        {
          formula: "Audio1.OnEnd = Notify(\"Audio playback completed\")",
          description: "Show notification when audio finishes playing"
        },
        {
          formula: "Audio1.Media = LookUp(Recordings, ID = Gallery1.Selected.ID).AudioFile",
          description: "Play audio based on gallery selection"
        },
        {
          formula: "Audio1.Loop = Toggle1.Value",
          description: "Loop audio playback based on toggle state"
        },
    ],
    properties: {
      Media: { type: "audio", description: "The audio file to play." },
      Start: { type: "boolean", description: "Whether the audio starts playing." },
      Loop: { type: "boolean", description: "Whether the audio automatically restarts after it finishes playing." },
      OnEnd: { type: "function", description: "How the app responds when the audio finishes playing." },
      AutoPause: { type: "boolean", description: "Whether the audio automatically pauses when the user navigates to a different screen." },
      AutoStart: { type: "boolean", description: "Whether the audio automatically starts playing when the screen is displayed." },
      Position: { type: "number", description: "The current position of the audio in milliseconds." },
      ShowControls: { type: "boolean", description: "Whether playback controls appear for the audio." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const ProgressBarControl = {
    name: "Progress Bar",
    description: "A control that shows progress toward completion.",
    examples: [
        {
          formula: "ProgressBar1.Value = CountRows(Filter(Tasks, Status = \"Complete\")) / CountRows(Tasks) * 100",
          description: "Show percentage of completed tasks"
        },
        {
          formula: "ProgressBar1.BarColor = If(ProgressBar1.Value < 30, Red, If(ProgressBar1.Value < 70, Orange, Green))",
          description: "Change colour based on progress value"
        },
        {
          formula: "ProgressBar1.ValueFormat = Text(Round(ProgressBar1.Value), \"0\") & \"%\"",
          description: "Format progress value as percentage"
        },
    ],
    properties: {
      Value: { type: "number", description: "The current progress value." },
      Max: { type: "number", description: "The value that represents completion." },
      ShowValue: { type: "boolean", description: "Whether to show the current value." },
      ValueFormat: { type: "string", description: "The format for displaying the value." },
      BarColor: { type: "colour", description: "The colour of the progress indicator." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const PieChartControl = {
    name: "Pie Chart",
    description: "A control that displays data as slices of a pie.",
    examples: [
        {
          formula: "PieChart1.Items = GroupBy(Sales, \"Category\", \"Category\", \"Value\", Sum(Value))",
          description: "Group and aggregate data for pie chart"
        },
        {
          formula: "PieChart1.OnSelect = Navigate(DetailScreen, None, {Category: PieChart1.Selected.Category})",
          description: "Navigate to details screen when a slice is selected"
        },
        {
          formula: "PieChart1.ColorPalette = \"Berry\"",
          description: "Set colour palette for pie chart slices"
        },
    ],
    properties: {
      Items: { type: "table", description: "The source of data for the chart." },
      Labels: { type: "string", description: "The data field to use for slice labels." },
      Values: { type: "string", description: "The data field to use for slice values." },
      Title: { type: "string", description: "The title of the chart." },
      ColorPalette: { type: "string", description: "The colour scheme for the slices." },
      LegendPosition: { type: "enum", options: ["Auto", "Bottom", "Right", "Top", "Left", "None"], description: "Where to position the legend." },
      OnSelect: { type: "function", description: "How the app responds when a slice is selected." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const ColumnChartControl = {
    name: "Column Chart",
    description: "A control that displays data as vertical columns.",
    examples: [
        {
          formula: "ColumnChart1.Items = AddColumns(GroupBy(Sales, \"Month\"), \"Revenue\", Sum(ThisRecord.Value))",
          description: "Group and aggregate data for column chart"
        },
        {
          formula: "ColumnChart1.Series = Table({Series: \"2023\", Value: varSales2023}, {Series: \"2024\", Value: varSales2024})",
          description: "Display multiple data series in a column chart"
        },
        {
          formula: "ColumnChart1.YStart = 0",
          description: "Set Y-axis to start at zero"
        },
    ],
    properties: {
      Items: { type: "table", description: "The source of data for the chart." },
      XAxisTitle: { type: "string", description: "The title for the X-axis." },
      YAxisTitle: { type: "string", description: "The title for the Y-axis." },
      XLabelAngle: { type: "number", description: "The angle for X-axis labels." },
      Title: { type: "string", description: "The title of the chart." },
      Series: { type: "table", description: "The data series to display as columns." },
      GridLines: { type: "boolean", description: "Whether to show grid lines." },
      YStart: { type: "number", description: "The starting value for the Y-axis." },
      YEnd: { type: "number", description: "The ending value for the Y-axis." },
      LegendPosition: { type: "enum", options: ["Auto", "Bottom", "Right", "Top", "Left", "None"], description: "Where to position the legend." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const LineChartControl = {
    name: "Line Chart",
    description: "A control that displays data as lines connecting points.",
    examples: [
        {
          formula: "LineChart1.Items = Filter(SalesData, Year = Value(Dropdown1.Selected.Value))",
          description: "Filter line chart data based on dropdown selection"
        },
        {
          formula: "LineChart1.Series = ForAll(Distinct(SalesData, Product).Product, {Series: Value, Value: Filter(SalesData, Product = Value)})",
          description: "Create multiple series from unique products"
        },
        {
          formula: "LineChart1.Markers = true",
          description: "Show markers on data points"
        },
    ],
    properties: {
      Items: { type: "table", description: "The source of data for the chart." },
      XAxisTitle: { type: "string", description: "The title for the X-axis." },
      YAxisTitle: { type: "string", description: "The title for the Y-axis." },
      XLabelAngle: { type: "number", description: "The angle for X-axis labels." },
      Title: { type: "string", description: "The title of the chart." },
      Series: { type: "table", description: "The data series to display as lines." },
      GridLines: { type: "boolean", description: "Whether to show grid lines." },
      YStart: { type: "number", description: "The starting value for the Y-axis." },
      YEnd: { type: "number", description: "The ending value for the Y-axis." },
      LegendPosition: { type: "enum", options: ["Auto", "Bottom", "Right", "Top", "Left", "None"], description: "Where to position the legend." },
      Markers: { type: "boolean", description: "Whether to show data point markers." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const ContainerControl = {
    name: "Container",
    description: "A control that contains and groups other controls.",
    examples: [
        {
          formula: "Container1.Fill = If(varDarkMode, RGBA(40, 40, 40, 1), RGBA(245, 245, 245, 1))",
          description: "Change container background based on theme"
        },
        {
          formula: "Container1.DropShadow = true",
          description: "Add drop shadow effect to container"
        },
        {
          formula: "Container1.ContentHeight = Sum(Gallery1.Height, TextInput1.Height, Button1.Height)",
          description: "Set container height to fit contained controls"
        },
    ],
    properties: {
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      BorderStyle: { type: "enum", options: ["None", "Solid", "Dashed", "Dotted"], description: "The style of the control's border." },
      BorderThickness: { type: "number", description: "The thickness of the control's border." },
      ContentHeight: { type: "number", description: "The height of the content inside the container." },
      ContentWidth: { type: "number", description: "The width of the content inside the container." },
      DropShadow: { type: "boolean", description: "Whether the control has a shadow." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." },
      LayoutMode: { type: "enum", options: ["Auto", "Manual"], description: "How controls inside the container are positioned." },
      LayoutDirection: { type: "enum", options: ["Vertical", "Horizontal"], description: "Whether controls in the container flow vertically or horizontally." }
    }
  };

  const GroupControl = {
    name: "Group",
    description: "A container that allows user to show or hide a set of controls.",
    examples: [
        {
          formula: "Group1.Expanded = varShowAdvancedOptions",
          description: "Expand group based on variable"
        },
        {
          formula: "Group1.Title = \"Settings for \" & User().FullName",
          description: "Set dynamic title for group control"
        },
        {
          formula: "Group1.BorderStyle = BorderStyle.Dashed",
          description: "Set dashed border style for group"
        },
    ],
    properties: {
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      BorderStyle: { type: "enum", options: ["None", "Solid", "Dashed", "Dotted"], description: "The style of the control's border." },
      BorderThickness: { type: "number", description: "The thickness of the control's border." },
      Expanded: { type: "boolean", description: "Whether the group is expanded to show its contents." },
      Title: { type: "string", description: "The title text for the group." },
      ExpandIcon: { type: "enum", options: ["ChevronDown", "ChevronRight", "PlusCircle", "Plus"], description: "The icon to show when the group is collapsed." },
      CollapseIcon: { type: "enum", options: ["ChevronUp", "ChevronDown", "MinusCircle", "Minus"], description: "The icon to show when the group is expanded." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const PowerBITileControl = {
    name: "Power BI Tile",
    description: "A control that embeds a Power BI tile.",
    examples: [
        {
          formula: "PowerBITile1.Workspace = LookUp(PowerBISettings, User = User().Email).WorkspaceId",
          description: "Load workspace based on user settings"
        },
        {
          formula: "PowerBITile1.Dashboard = varSelectedDashboard",
          description: "Display dashboard based on selected variable"
        },
        {
          formula: "PowerBITile1.Tile = Gallery1.Selected.TileID",
          description: "Show tile based on gallery selection"
        },
    ],
    properties: {
      Workspace: { type: "string", description: "The Power BI workspace that contains the tile." },
      Dashboard: { type: "string", description: "The Power BI dashboard that contains the tile." },
      Tile: { type: "string", description: "The Power BI tile to embed." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const CardControl = {
    name: "Card",
    description: "A card control to display fields in a form.",
    examples: [
        {
          formula: "Card1.DataField = \"CustomerName\"",
          description: "Bind card to a specific data field"
        },
        {
          formula: "Card1.DisplayMode = If(User().IsAdmin, DisplayMode.Edit, DisplayMode.View)",
          description: "Set display mode based on user role"
        },
        {
          formula: "Card1.Default = LookUp(Defaults, Field = \"CustomerName\").Value",
          description: "Set default value from defaults table"
        },
    ],
    properties: {
      DataField: { type: "string", description: "The data field to display in the card." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Default: { type: "any", description: "The initial value for the control before the user changes it." },
      UpdateFieldName: { type: "string", description: "The name of the field to update in the data source." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const BarcodeGeneratorControl = {
    name: "Barcode Generator",
    description: "A control that generates barcodes from text input.",
    examples: [
        {
          formula: "BarcodeGenerator1.Value = Text(GUID())",
          description: "Generate barcode from a GUID"
        },
        {
          formula: "BarcodeGenerator1.BarcodeType = BarcodeType.QRCode",
          description: "Set barcode type to QR Code"
        },
        {
          formula: "BarcodeGenerator1.ErrorCorrection = ErrorCorrection.High",
          description: "Set high error correction for QR code"
        },
    ],
    properties: {
      Value: { type: "string", description: "The value to encode in the barcode." },
      BarcodeType: { type: "enum", options: ["QRCode", "Code128", "Code39", "PDF417"], description: "The type of barcode to generate." },
      Image: { type: "image", description: "The generated barcode image." },
      ErrorCorrection: { type: "enum", options: ["Low", "Medium", "Quartile", "High"], description: "The level of error correction for QR codes." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const PCFControl = {
    name: "PCF Control",
    description: "A Power Apps component framework control.",
    examples: [
        {
          formula: "PCFControl1.InputVariables = {Record: Gallery1.Selected, Theme: varTheme}",
          description: "Pass selected item and theme as input variables"
        },
        {
          formula: "PCFControl1.OutputVariables.Result",
          description: "Access output variable from PCF control"
        },
        {
          formula: "PCFControl1.Visible = Connection.Connected",
          description: "Show PCF control only when connected"
        },
    ],
    properties: {
      InputVariables: { type: "record", description: "The input variables for the PCF control." },
      OutputVariables: { type: "record", description: "The output variables from the PCF control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const CalendarControl = {
    name: "Calendar",
    description: "A control that displays a calendar for date selection.",
    examples: [
        {
          formula: "Calendar1.DefaultDate = Today()",
          description: "Set default date to today"
        },
        {
          formula: "Calendar1.SelectedDate = DatePicker1.SelectedDate",
          description: "Sync calendar with date picker selection"
        },
        {
          formula: "Calendar1.OnSelect = Collect(Events, {Date: Calendar1.SelectedDate, Title: TextInput1.Text})",
          description: "Add event for selected date"
        },
    ],
    properties: {
      SelectedDate: { type: "date", description: "The date selected in the calendar." },
      DefaultDate: { type: "date", description: "The initial date shown before user selection." },
      StartDate: { type: "date", description: "The first date that can be shown or selected." },
      EndDate: { type: "date", description: "The last date that can be shown or selected." },
      OnSelect: { type: "function", description: "How the app responds when the user selects a date." },
      HeaderText: { type: "string", description: "The text to display in the calendar header." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Color: { type: "colour", description: "The colour of text in the control." },
      Fill: { type: "colour", description: "The background colour of the control." },
      DisplayMode: { type: "enum", options: ["Edit", "View", "Disabled"], description: "Whether the control allows user input." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const MapControl = {
    name: "Map",
    description: "A control that displays a map with markers.",
    properties: {
      Address: { type: "string", description: "The address to show on the map." },
      LocationMode: { type: "enum", options: ["Address", "Coordinate"], description: "Whether to show a location based on an address or coordinates." },
      Latitude: { type: "number", description: "The map's latitude when LocationMode is Coordinate." },
      Longitude: { type: "number", description: "The map's longitude when LocationMode is Coordinate." },
      Markers: { type: "table", description: "The points to show on the map." },
      ZoomLevel: { type: "number", description: "The zoom level for the map." },
      OnSelect: { type: "function", description: "How the app responds when the user selects the map or a marker." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const SharePointFormControl = {
    name: "SharePoint Form",
    description: "A control that displays a SharePoint form.",
    examples: [
        {
          formula: "SharePointForm1.DataSource = SharePointList",
          description: "Bind form to SharePoint list"
        },
        {
          formula: "SharePointForm1.Item = LookUp(SharePointList, ID = Param(\"ID\"))",
          description: "Load item based on URL parameter"
        },
        {
          formula: "SharePointForm1.OnSuccess = Navigate(ListView, ScreenTransition.Fade)",
          description: "Navigate to list view after successful submission"
        },
    ],
    properties: {
      DataSource: { type: "table", description: "The SharePoint list that contains the form." },
      Item: { type: "record", description: "The item to display in the form." },
      FormType: { type: "enum", options: ["New", "Edit", "Display"], description: "The type of SharePoint form to show." },
      OnSuccess: { type: "function", description: "How the app responds when the form is submitted successfully." },
      OnFailure: { type: "function", description: "How the app responds when the form submission fails." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Fill: { type: "colour", description: "The background colour of the control." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const DocumentViewerControl = {
    name: "Document Viewer",
    description: "A control that displays office documents.",
    examples: [
        {
          formula: "DocumentViewer1.Document = Gallery1.Selected.DocumentFile",
          description: "Display document from selected gallery item"
        },
        {
          formula: "DocumentViewer1.ViewMode = If(User().IsEditor, ViewMode.Edit, ViewMode.Read)",
          description: "Allow editing based on user role"
        },
        {
          formula: "DocumentViewer1.OnDocumentChange = Patch(Documents, Gallery1.Selected, {Modified: Now()})",
          description: "Update modified timestamp when document changes"
        },
    ],
    properties: {
      Document: { type: "file", description: "The document to display." },
      ViewMode: { type: "enum", options: ["Read", "Edit"], description: "Whether to allow editing the document." },
      OnDocumentChange: { type: "function", description: "How the app responds when the document changes." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const TreeViewControl = {
    name: "Tree View",
    description: "A control that displays hierarchical data.",
    examples: [
        {
          formula: "TreeView1.Items = CategoriesWithSubcategories",
          description: "Load hierarchical category data"
        },
        {
          formula: "TreeView1.OnSelect = Navigate(DetailScreen, None, {CategoryID: TreeView1.SelectedItem.ID})",
          description: "Navigate to detail screen for selected item"
        },
        {
          formula: "TreeView1.NodeChildren = Filter(AllNodes, ParentID = ThisItem.ID)",
          description: "Set child nodes for each parent node"
        },
    ],
    properties: {
      Items: { type: "table", description: "The source of data for the tree view." },
      SelectedItem: { type: "record", description: "The selected item in the tree." },
      DefaultSelectedItem: { type: "record", description: "The initially selected item in the tree." },
      NodeChildren: { type: "table", description: "The child items for each node." },
      NodeParent: { type: "record", description: "The parent item for each node." },
      OnSelect: { type: "function", description: "How the app responds when the user selects an item." },
      ExpandedItems: { type: "table", description: "The items that are expanded to show their children." },
      Fill: { type: "colour", description: "The background colour of the control." },
      BorderColor: { type: "colour", description: "The colour of the control's border." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

  const WebViewControl = {
    name: "Web View",
    description: "A control that displays web content.",
    examples: [
        {
          formula: "WebView1.Source = \"https://www.microsoft.com/\" & Dropdown1.Selected.Value",
          description: "Load web page based on dropdown selection"
        },
        {
          formula: "WebView1.OnNavigateComplete = Set(varPageLoaded, true)",
          description: "Set variable when page finishes loading"
        },
        {
          formula: "WebView1.Reload = Button1.IsPressed",
          description: "Reload web page when button is pressed"
        },
    ],
    properties: {
      Source: { type: "string", description: "The URL of the web page to display." },
      ContentLanguage: { type: "string", description: "The language of the web page content." },
      OnNavigate: { type: "function", description: "How the app responds when the web page navigates to a Screen." },
      OnNavigateComplete: { type: "function", description: "How the app responds when the navigation is complete." },
      OnNavigateError: { type: "function", description: "How the app responds when a navigation error occurs." },
      Reload: { type: "boolean", description: "Whether to reload the Screen." },
      Height: { type: "number", description: "The distance between the control's top and bottom edges." },
      Width: { type: "number", description: "The distance between the control's left and right edges." },
      X: { type: "number", description: "The distance from the left edge of the control to the left edge of its parent." },
      Y: { type: "number", description: "The distance from the top edge of the control to the top edge of its parent." },
      Visible: { type: "boolean", description: "Whether the control appears or is hidden." }
    }
  };

