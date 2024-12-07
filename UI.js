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
    Method name  : setupUI
    Description  : Initializes and sets up all the UI elements and their corresponding labels, sliders, buttons, etc.
    Parameters   : None
    Return value : None
    */
    static setupUI() {
        let ui = new UI();

        let xOffset = windowWidth + 10; // Starting x position
        let yOffset = 10;  // Starting y position
        let ySpacing = 40;
        let gap = 40;  // Vertical space between rows

        ui.createButton('Invert', 10, yOffset, Filter.invert);

        yOffset += ySpacing;

        ui.createButton('Blur', 10, yOffset, Filter.blur);

        yOffset += ySpacing;

        ui.createButton('Posterize', 10, yOffset, Filter.posterize);

        yOffset += ySpacing;

        ui.createButton('Gray', 10, yOffset, Filter.gray);

        yOffset += ySpacing;

        this.HasFilter = ui.createCheckbox("No Filter", false, 10, yOffset)
    }
}
