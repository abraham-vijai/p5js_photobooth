/*
Class name   : Filter
Description  : Defines static methods to apply various image filters and manage the applied filter state.
*/
class Filter {

    constructor() {}

    /*
    Method name  : invert
    Description  : Sets the applied filter to "invert".
    Parameters   : None
    Return value : None
    */
    static invert() {
        appliedFilter = "invert";
    }

    /*
    Method name  : posterize
    Description  : Sets the applied filter to "posterize".
    Parameters   : None
    Return value : None
    */
    static posterize() {
        appliedFilter = "posterize";
    }

    /*
    Method name  : gray
    Description  : Sets the applied filter to "gray".
    Parameters   : None
    Return value : None
    */
    static gray() {
        appliedFilter = "gray";
    }

    /*
    Method name  : blur
    Description  : Sets the applied filter to "blur".
    Parameters   : None
    Return value : None
    */
    static blur() {
        appliedFilter = "blur";
    }

    /*
    Method name  : applyFilter
    Description  : Applies the current filter using p5.js filter() function and resets to "opaque" if no filter is selected.
    Parameters   : None
    Return value : None
    */
    static applyFilter() {
        filter(appliedFilter);

        if (UI.HasFilter.checked()) {
            appliedFilter = "opaque";
        }
    }
}
