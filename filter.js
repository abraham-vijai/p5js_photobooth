class Filter {
    constructor() {
        
    }

    static invert() {
        appliedFilter = "invert";
    }

    static posterize() {
        appliedFilter = "posterize";
    }

    static gray() {
        appliedFilter = "gray";
    }

    static blur() {
        appliedFilter = "blur";
    }

    static applyFilter(){
        filter(appliedFilter);

        if (UI.HasFilter.checked()) {
            appliedFilter = "opaque";
        }
    }
    
}
