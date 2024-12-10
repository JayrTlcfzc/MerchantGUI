// General handler function to update form data
export const handleChange = (setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};

// Text only restriction
export const handleChangeTextOnly = (setFormData) => (e) => {
const { name, value } = e.target;
if (/^[A-Za-z\s]*$/.test(value)) {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
}
};

// Numbers only restriction
export const handleChangeDigitsOnly = (setFormData) => (e) => {
const { name, value } = e.target;
if (/^\d*$/.test(value) && value.length <= 15) { // Max of 15 numbers as of now
    setFormData((prevData) => ({ ...prevData, [name]: value }));
}
};

// Dynamic reset function
export const resetFormData = (setFormData, initialData) => () => {
const resetData = Object.keys(initialData).reduce((acc, key) => {
    acc[key] = ''; // Set each key to empty string
    return acc;
}, {});
setFormData(resetData);
};
  