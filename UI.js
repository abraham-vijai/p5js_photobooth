/*
Filename    : UI.js
Author      : Abraham Vijai
Date        : 2024-11-24
Description : This is the UI.js function
*/

/*
Class name   : UI
Description  : This class provides methods for creating and managing UI elements such as buttons, sliders, color pickers, and more.
               It also supports attaching UI elements to a specific DOM element and managing the layout.
*/
class UI {
    constructor(parentElementId = null) {
        // Optionally attach the UI elements to a parent container
        this.parent = parentElementId ? select(`#${parentElementId}`) : null;
    }

    static HasFilter = false;
    static borderColor;
    static fillColor;
    static borderThickness;

    /*
    Method name  : createLabel
    Description  : Creates and positions a label element in the UI.
    Parameters   : text (string): The text to display in the label.
                   x (number): The x position of the ui element.
                   y (number): The y position of the ui element.
    Return value : The created label element.
    */
    createLabel(text, x = 0, y = 0) {
        let label = createElement('label', text);
        label.position(x, y);
        if (this.parent) label.parent(this.parent);

        return label;
    }

    /*
    Method name  : createButton
    Description  : Creates and positions a button in the UI, with an optional callback function for the button's action.
    Parameters   : label (string): The label for the button.
                   x (number): The x position of the ui element.
                   y (number): The y position of the ui element.
                   callback (function or null): A function to be called when the button is pressed.
    Return value : The created button element. 
    */
    createButton(label, x = 0, y = 0, callback = null) {
        let button = createButton(label);
        button.position(x, y);
        if (callback) button.mousePressed(callback);
        if (this.parent) button.parent(this.parent);

        return button;
    }

    /*
    Method name  : createImage
    Description  : Creates and positions an image element in the UI.
    Parameters   : src (string): The path or URL to the image file.
                   x (number): The x position of the UI element.
                   y (number): The y position of the UI element.
                   width (number): The width of the image element (optional).
                   height (number): The height of the image element (optional).
    Return value : The created image element.
    */
    createImage(src, x = 0, y = 0, width = null, height = null, onClick = null) {
        let img = createImg(src);
        img.position(x, y);
        if (width && height) img.size(width, height);
        if (onClick) img.mouseClicked(onClick);
        if (this.parent) img.parent(this.parent);
        return img;

    }

    /*
    Method name  : createSlider
    Description  : Creates and positions a slider in the UI, with a label that updates as the slider's value changes.
    Parameters   : min (number): The minimum value of the slider.
                   max (number): The maximum value of the slider.
                   value (number): The initial value of the slider.
                   step (number): The step size for the slider.
                   x (number): The x position of the ui element.
                   y (number): The y position of the ui element.
    Return value : The created slider element.
    */
    createSlider(min, max, value, step, x = 0, y = 0) {
        let slider = createSlider(min, max, value, step);
        slider.position(x, y);
        if (this.parent) slider.parent(this.parent);

        // Create a label for the slider's value
        let valueLabel = this.createLabel(value, x + slider.width + 50, y);

        // Update label as the slider value changes
        slider.input(() => {
            valueLabel.html(slider.value());
        });

        return slider;
    }

    /*
    Method name  : createColorPicker
    Description  : Creates and positions a color picker in the UI.
    Parameters   : defaultColor (string): The default color for the picker (default is '#000000').
                   x (number): The x position of the ui element.
                   y (number): The y position of the ui element.
    Return value : The created color picker element.
    */
    createColorPicker(defaultColor = '#000000', x = 0, y = 0) {
        let colorPicker = createColorPicker(defaultColor);
        colorPicker.position(x, y);
        if (this.parent) colorPicker.parent(this.parent);

        return colorPicker;
    }

    /*
    Method name  : createTextBox
    Description  : Creates and positions a text input box in the UI, with an optional placeholder text.
    Parameters   : placeholder (string): The placeholder text for the input box (default is an empty string).
                   x (number): The x position of the ui element.
                   y (number): The y position of the ui element.
    Return value : The created input element (text box).
    */
    createTextBox(placeholder = '', x = 0, y = 0) {
        let input = createInput('');
        input.position(x, y);
        input.attribute('placeholder', placeholder);
        if (this.parent) input.parent(this.parent);
        return input;
    }

    /*
    Method name  : createCheckbox
    Description  : Creates and positions a checkbox in the UI, with a label and an optional initial checked state.
    Parameters   : labelText (string): The label text for the checkbox.
                   isChecked (boolean): The initial checked state of the checkbox (default is false).
                   x (number): The x position of the ui element.
                   y (number): The y position of the ui element.
    Return value : The created checkbox element.
    */
    createCheckbox(labelText, isChecked = false, x = 0, y = 0) {
        let checkbox = createCheckbox(labelText, isChecked);
        checkbox.position(x, y);
        if (this.parent) checkbox.parent(this.parent);

        return checkbox;
    }

    /*
    Method name  : createComboBox
    Description  : Creates and positions a combo box (select element) in the UI, with options.
    Parameters   : options (array): Array of strings representing the options for the combo box.
                   x (number): The x position of the combo box.
                   y (number): The y position of the combo box.
    Return value : The created combo box element.
    */
    createComboBox(options, x = 0, y = 0) {
        let combo = createSelect();
        combo.position(x, y);
        if (this.parent) combo.parent(this.parent);

        // Add options to the combo box
        for (let option of options) {
            combo.option(option);
        }

        return combo;
    }

    /*
    Method name  : setupUI
    Description  : Initializes and sets up all the UI elements and their corresponding labels, sliders, buttons, etc.
    Parameters   : None
    Return value : None
    */
    static setupUI() {
        let ui = new UI();

        let xOffset = windowWidth + 10; // Starting x position
        let yOffset = 10;  // Starting y position
        let ySpacing = 45;
        let gap = 80;  // Vertical space between rows

        ui.createButton('Invert', 10, yOffset, Filter.invert);

        yOffset += ySpacing;

        ui.createButton('Blur', 10, yOffset, Filter.blur);

        yOffset += ySpacing;

        ui.createButton('Posterize', 10, yOffset, Filter.posterize);

        yOffset += ySpacing;

        ui.createButton('Gray', 10, yOffset, Filter.gray);

        yOffset += ySpacing;

        this.HasFilter = ui.createCheckbox("No Filter", false, 10, yOffset)

        yOffset += ySpacing;

        ui.createLabel("Glasses", 10, yOffset);
        ui.createImage("assets/glasses.png", 10, yOffset + 10, 70, 50, () => stampImage("glasses"));

        yOffset += gap;

        ui.createLabel("Moustache", 10, yOffset);
        ui.createImage("assets/moustache.png", 10, yOffset + 10, 70, 50, () => stampImage("moustache"));

        yOffset += gap;

        ui.createLabel("Santa Claus", 10, yOffset);
        ui.createImage("assets/santa-claus.png", 10, yOffset + 25, 70, 50, () => stampImage("santa"));

        yOffset += gap;

        ui.createLabel("Hat", 10, yOffset);
        ui.createImage("assets/hat.png", 10, yOffset + 15, 70, 50, () => stampImage("hat"));

        yOffset += gap;

        ui.createButton("Rectangle", 10, yOffset, () => createShape("rectangle"))
        ui.createButton("Ellipse", 10, yOffset + 30, () => createShape("ellipse"))

        yOffset += gap

        ui.createLabel("Fill Color", 10, yOffset)
        this.fillColor = ui.createColorPicker("black", 10, yOffset + 20)

        yOffset += ySpacing

        ui.createLabel("Border Color", 10, yOffset)
        this.borderColor = ui.createColorPicker("red", 10, yOffset + 20)

        yOffset += ySpacing

        ui.createLabel("Border Thickness", 10, yOffset)
        let comboBoxOptions = ['None', '1', '2', '3'];
        this.borderThickness = ui.createComboBox(comboBoxOptions, 10, yOffset + 20);
    }
}
